import {getVoiceProfile,spokenText} from './voice-lines.mjs?v=20261108-voice';
import {RecordedCharacterVoice,findRecordedVoice} from './recorded-voice.mjs?v=20261108-natural';
import {VOICE_ASSETS} from './assets/voices/manifest.mjs?v=20261108-gallery';

const japanese=voice=>/^ja(?:[-_]|$)/i.test(String(voice.lang||''));
const maleName=/\b(?:otoya|ichiro|keita|takumi)\b|おとや|一郎|太郎/i;
const femaleName=/kyoko|haruka|ayumi|nanami|mayu|mizuki|hina|o-ren|kaori|sakura|sayaka|google 日本語|きょうこ|はるか|あゆみ/i;
const bounded=(value,fallback)=>Number.isFinite(Number(value))?Math.min(1,Math.max(0,Number(value))):fallback;
const quietErrors=new Set(['canceled','interrupted']);

// This controller never owns game timers or progression. Unsupported or blocked
// speech remains an optional presentation layer, with at most one queued line.
class SystemCharacterVoice {
  constructor({synth=globalThis.speechSynthesis,Utterance=globalThis.SpeechSynthesisUtterance,onChange=()=>{},enabled=true,volume=.8,now=Date.now,setTimer=(...args)=>globalThis.setTimeout(...args),clearTimer=(...args)=>globalThis.clearTimeout(...args)}={}) {
    this.synth=synth;this.Utterance=Utterance;this.onChange=onChange;
    // Browser timer bindings must not receive this controller as their receiver.
    this.now=()=>now();this.setTimer=(...args)=>setTimer(...args);this.clearTimer=(...args)=>clearTimer(...args);
    this.supported=!!synth&&typeof synth.speak==='function'&&typeof synth.cancel==='function'&&typeof Utterance==='function';
    this.enabled=!!enabled;this.volume=bounded(volume,.8);this.speaking=false;this.blocked=false;
    this.error='';this.text='';this.voiceName='';this.voices=[];this.availability=this.supported?'loading':'unsupported';
    this._token=0;this._utterance=null;this._warmup=null;this._watchdog=null;this._dispatchTimer=null;this._nativeIssued=false;
    this._lastCancelAt=-Infinity;this._lastKey='';this._lastIssuedAt=-Infinity;this._profileVolume=1;
    this._unlocked=false;this._defaultStarted=false;this._languageUnavailable=false;this._disposed=false;
    this._voicesChanged=()=>this._refreshVoices();
    if(this.supported){this.synth.addEventListener?.('voiceschanged',this._voicesChanged);this._refreshVoices(false);}
    this._emit();
  }

  state(){return {supported:this.supported,enabled:this.enabled,volume:this.volume,speaking:this.speaking,blocked:this.blocked,availability:this.availability,voiceName:this.voiceName,error:this.error,text:this.text};}
  _emit(){try{this.onChange(this.state());}catch{/* Voice UI must not interrupt a round. */}}

  _refreshVoices(emit=true){
    if(!this.supported||this._disposed)return;
    try{this.voices=Array.from(this.synth.getVoices?.()||[]);}catch{this.voices=[];}
    if(this.voices.some(japanese)){this.availability='ready';this._languageUnavailable=false;if(this.error==='language-unavailable'||this.error==='voice-unavailable')this.error='';}
    else this.availability=this.voices.length||this._languageUnavailable?'unavailable':this._defaultStarted?'ready':'loading';
    if(emit)this._emit();
  }

  _voice(profile){
    let candidates=this.voices.filter(japanese);
    const nonMale=candidates.filter(voice=>!maleName.test(String(voice.name||'')));
    if(nonMale.length)candidates=nonMale;
    const hints=Array.isArray(profile.preferredVoices)?profile.preferredVoices:[];
    const score=voice=>{
      const name=String(voice.name||'').toLowerCase();
      const preferred=hints.findIndex(hint=>name.includes(String(hint).toLowerCase()));
      return (preferred<0?0:1000-preferred*10)+(femaleName.test(name)?30:0)+(voice.default?2:0)+(voice.localService?1:0);
    };
    return candidates.map((voice,index)=>({voice,index,score:score(voice)})).sort((a,b)=>b.score-a.score||a.index-b.index)[0]?.voice||null;
  }

  // Call inside the original click/tap handler, before any asynchronous work.
  // The silent warm-up satisfies platforms that require a user speech gesture;
  // a visible replay control remains the recovery path if the platform rejects it.
  unlock(){
    if(!this.supported||!this.enabled||this.volume<=0||this._disposed)return false;
    this._refreshVoices(false);
    if(this.availability==='unavailable')return false;
    this.blocked=false;this.error='';
    if(this._unlocked||this._utterance){this._emit();return true;}
    try{
      const warmup=new this.Utterance(' ');warmup.lang='ja-JP';warmup.volume=0;
      const voice=this._voice(getVoiceProfile(1)||{});if(voice)warmup.voice=voice;
      this._warmup=warmup;this._unlocked=true;
      const done=()=>{if(this._warmup===warmup)this._warmup=null;};
      warmup.onend=done;warmup.onerror=done;this.synth.speak(warmup);this._emit();return true;
    }catch{this._warmup=null;this._unlocked=false;this.blocked=true;this.error='not-allowed';this._emit();return false;}
  }

  _cancel(){
    const nativePending=this._nativeIssued||this._warmup||this.synth?.speaking||this.synth?.pending;
    ++this._token;if(this._watchdog!==null)this.clearTimer(this._watchdog);this._watchdog=null;
    if(this._dispatchTimer!==null)this.clearTimer(this._dispatchTimer);this._dispatchTimer=null;
    this._utterance=null;this._warmup=null;this._nativeIssued=false;this.speaking=false;
    // Idle cancel+speak pairs can race in native speech backends. Only send a
    // cancellation when speech was actually submitted or the native queue is busy.
    if(nativePending)try{this.synth?.cancel();this._lastCancelAt=this.now();}catch{/* Some engines disappear when a tab closes. */}
  }

  speak(stageId,text,{key='',priority='dialogue',force=false}={}){
    if(!this.supported||!this.enabled||this.volume<=0||this._disposed)return false;
    const profile=getVoiceProfile(stageId);if(!profile||typeof text!=='string'||!text.trim())return false;
    this._refreshVoices(false);
    if(this.availability==='unavailable'){this.error='voice-unavailable';this._emit();return false;}
    const prepared=spokenText(stageId,text).trim();if(!prepared)return false;
    const identity=String(stageId)+':'+(key||prepared);
    if(!force&&identity===this._lastKey)return false;
    if(!force&&priority==='ambient'&&(this._utterance||this.synth.speaking||this.synth.pending||this.now()-this._lastIssuedAt<12000))return false;
    this._cancel();
    const token=this._token;
    try{
      const utterance=new this.Utterance(prepared),voice=this._voice(profile);
      utterance.lang='ja-JP';utterance.rate=profile.rate;utterance.pitch=profile.pitch;
      utterance.volume=bounded(this.volume*(profile.volume??1),this.volume);
      if(voice)utterance.voice=voice;
      this._utterance=utterance;this._profileVolume=profile.volume??1;this._lastKey=identity;this._lastIssuedAt=this.now();
      this.text=text;this.voiceName=voice?.name||'';this.error='';this.blocked=false;
      let started=false;
      utterance.onstart=()=>{
        if(this._disposed||token!==this._token)return;
        started=true;this.speaking=true;this.blocked=false;this._defaultStarted=true;this.availability='ready';
        if(this._watchdog!==null)this.clearTimer(this._watchdog);this._watchdog=null;this._emit();
      };
      utterance.onend=event=>{
        if(this._disposed||token!==this._token)return;
        if(this._watchdog!==null)this.clearTimer(this._watchdog);this._watchdog=null;
        this._utterance=null;this._nativeIssued=false;this.speaking=false;
        // Some native engines report an almost immediate completion without
        // starting a nontrivial line. Keep its caption replayable and expose
        // recovery instead of presenting that silent response as success.
        const elapsed=event?.elapsedTime;
        if(!started&&Number.isFinite(elapsed)&&elapsed>=0&&elapsed<=.15&&prepared.length>=8){
          this.blocked=true;this.error='not-started';this._unlocked=false;
        }
        this._emit();
      };
      utterance.onerror=event=>{
        if(this._disposed||token!==this._token)return;
        if(this._watchdog!==null)this.clearTimer(this._watchdog);this._watchdog=null;
        this._utterance=null;this._nativeIssued=false;this.speaking=false;
        const error=String(event?.error||'synthesis-failed');this.error=quietErrors.has(error)?'':error;
        this.blocked=error==='not-allowed';if(this.blocked)this._unlocked=false;
        if(error==='language-unavailable'||error==='voice-unavailable'){this._languageUnavailable=true;this.availability='unavailable';}
        if(error==='synthesis-unavailable')this.availability='unavailable';
        this._emit();
      };
      const dispatch=()=>{
        if(this._disposed||token!==this._token||!this.enabled||this.volume<=0)return false;
        this._dispatchTimer=null;
        try{
          this._watchdog=this.setTimer(()=>{
            if(this._disposed||token!==this._token||started)return;
            this._cancel();this.blocked=true;this.error='not-started';this._unlocked=false;this._emit();
          },4000);
          this._nativeIssued=true;this.synth.speak(utterance);this._emit();return true;
        }catch{this._cancel();this._lastKey='';this.blocked=true;this.error='synthesis-failed';this._emit();return false;}
      };
      const separation=Math.max(0,75-(this.now()-this._lastCancelAt));
      if(separation>0){this._dispatchTimer=this.setTimer(dispatch,separation);this._emit();return true;}
      return dispatch();
    }catch{
      this._cancel();this._lastKey='';this.blocked=true;this.error='synthesis-failed';this._emit();return false;
    }
  }

  stop(){this._cancel();this.text='';this._emit();}
  setEnabled(enabled){this.enabled=!!enabled;if(!this.enabled)this.stop();else this._emit();return this.enabled;}
  setVolume(volume){
    this.volume=bounded(volume,this.volume);
    // Native engines may snapshot gain at speech start. Cancel rather than
    // relying on a property mutation when the user asks for immediate silence.
    if(this.volume===0)this.stop();
    else{if(this._utterance)this._utterance.volume=bounded(this.volume*this._profileVolume,this.volume);this._emit();}
    return this.volume;
  }
  dispose(){if(this._disposed)return;this.stop();this._disposed=true;this.synth?.removeEventListener?.('voiceschanged',this._voicesChanged);}
}

// Bundled character dialogue always uses the same natural recording on every
// device. Only unrecorded administrator-customized text uses device speech.
export class CharacterVoice extends SystemCharacterVoice {
  constructor(options={}){
    const notify=options.onChange||(()=>{});
    super({...options,onChange:()=>{}});
    this._voiceBackend='recorded';this._globalVoiceKey='';this._globalVoiceTime=-Infinity;
    this._recordedAssets=options.assets??VOICE_ASSETS;
    this.recorded=new RecordedCharacterVoice({...options,assets:this._recordedAssets,onChange:()=>this._emit()});
    this.onChange=notify;this._emit();
  }
  state(){
    if(!this.recorded?.supported)return super.state();
    if(this._voiceBackend==='system')return{...super.state(),supported:true,engine:'device'};
    return this.recorded.state();
  }
  unlock(){
    if(!this.recorded?.supported)return super.unlock();
    const recorded=this.recorded.unlock();
    return this._voiceBackend==='system'?super.unlock()||recorded:recorded;
  }
  speak(stageId,text,options={}){
    if(!this.recorded?.supported)return super.speak(stageId,text,options);
    const profile=getVoiceProfile(stageId);if(!profile||typeof text!=='string'||!text.trim()||!this.enabled||this.volume<=0||this._disposed)return false;
    const identity=profile.id+':'+(options.key||text);
    if(!options.force&&identity===this._globalVoiceKey)return false;
    if(!options.force&&options.priority==='ambient'&&(this.recorded.pending||this.recorded.speaking||this._utterance||this.synth?.speaking||this.synth?.pending||this.now()-this._globalVoiceTime<12000))return false;
    let accepted;
    if(findRecordedVoice(this._recordedAssets,stageId,text)){
      this._cancel();this._voiceBackend='recorded';accepted=this.recorded.speak(stageId,text,options);
    }else{
      this.recorded.stop();this._voiceBackend='system';accepted=super.speak(stageId,text,options);
    }
    if(accepted){this._globalVoiceKey=identity;this._globalVoiceTime=this.now();}
    return accepted;
  }
  stop(){this.recorded?.stop();super.stop();}
  setEnabled(enabled){this.enabled=!!enabled;this.recorded?.setEnabled(enabled);return super.setEnabled(enabled);}
  setVolume(volume){this.recorded?.setVolume(volume);return super.setVolume(volume);}
  dispose(){this.recorded?.dispose();super.dispose();}
}
