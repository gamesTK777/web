import {getCombatFrame} from './combat-model.mjs?v=20261108-combat';
import {renderCombat} from './combat-art.mjs?v=20261108-combat';
import {UNIT_TYPES} from './engine.mjs?v=20261108-frontier';

const sideName=team=>team===0?'コーラル隊':'タイド隊';
const name=unit=>UNIT_TYPES[unit?.type]?.name||'部隊';
const suffix=unit=>unit?.type==='infantry'?'人':UNIT_TYPES[unit?.type]?.domain==='air'?'機':'台';

/** A view-only, cancellable presentation. Combat is resolved once by the engine
 * before this is called. Closing, skipping and tab visibility never apply damage. */
export function createCombatPlayback({document=globalThis.document,window=globalThis.window,render=renderCombat,getFrame=getCombatFrame,onStage=()=>{}}={}) {
  const byId=id=>document?.getElementById(id),dialog=byId('combatDialog'),canvas=byId('combatCanvas');
  if(!document||!window||!dialog||!canvas)return {play:()=>Promise.resolve({cancelled:false,unavailable:true}),cancel(){},destroy(){},isPlaying:()=>false};
  let active=null,rafId=0,destroyed=false;
  const listeners=[];
  function setText(id,value){const node=byId(id);if(node.textContent!==value)node.textContent=value;}
  function listen(node,event,fn){node?.addEventListener(event,fn);listeners.push(()=>node?.removeEventListener(event,fn));}
  function request(){if(!rafId&&active&&!document.hidden)rafId=window.requestAnimationFrame(tick);}
  function counts(report,frame){
    const left=report.attacker.team===0?report.attacker:report.defender,right=report.attacker.team===1?report.attacker:report.defender;
    const leftHp=report.attacker.team===0?frame.attackerCount:frame.defenderCount,rightHp=report.attacker.team===1?frame.attackerCount:frame.defenderCount;
    for(const [side,unit,hp] of [['Left',left,leftHp],['Right',right,rightHp]]){
      setText(`combat${side}Name`,`${sideName(unit.team)} · ${name(unit)}`);
      setText(`combat${side}Count`,`${hp}${suffix(unit)} · HP ${hp}`);
      const meter=byId(`combat${side}Meter`),label=`${sideName(unit.team)} 残りHP ${hp} / 10`;meter.max=10;if(meter.value!==hp)meter.value=hp;if(meter.getAttribute('aria-label')!==label)meter.setAttribute('aria-label',label);
    }
    return {left,right};
  }
  function portraitPanels(report,frame){
    if(!window.matchMedia?.('(max-width:600px) and (orientation:portrait)').matches)return;
    const half=canvas.width/2;
    for(const [id,team,offset] of [['combatLeftCanvas',0,0],['combatRightCanvas',1,half]]){
      const panel=byId(id),context=panel?.getContext?.('2d');if(!panel||!context)continue;
      if(panel.width!==half)panel.width=half;if(panel.height!==canvas.height)panel.height=canvas.height;
      context.clearRect(0,0,half,canvas.height);context.drawImage(canvas,offset,0,half,canvas.height,0,0,half,canvas.height);
      const unit=report.attacker.team===team?report.attacker:report.defender,hp=report.attacker.team===team?frame.attackerCount:frame.defenderCount,label=`${sideName(team)} ${name(unit)} ${hp}${suffix(unit)}`;
      if(panel.getAttribute('aria-label')!==label)panel.setAttribute('aria-label',label);
    }
  }
  function draw(session,frame){
    const {report}=session,{left,right}=counts(report,frame);
    const labels={intro:'交戦開始',attack:`${sideName(report.attacker.team)}の攻撃`,damage:`${name(report.defender)}が被弾`,counter:`${sideName(report.defender.team)}の反撃`,counterDamage:`${name(report.attacker)}が被弾`,result:'戦闘結果'};
    const stageChanged=session.stage!==frame.stage;
    setText('combatTitle',`${name(report.attacker)} VS ${name(report.defender)}`);
    if(stageChanged){byId('combatStage').textContent=labels[frame.stage]||'交戦中';session.stage=frame.stage;}
    setText('combatSummary',frame.stage==='result'?`${sideName(0)} HP ${left.hpBefore} → ${left.hpAfter}　/　${sideName(1)} HP ${right.hpBefore} → ${right.hpAfter}`:frame.stage==='intro'?'HPと同じ数の部隊が戦います。':frame.stage==='attack'?`${report.attacker.hpBefore}${suffix(report.attacker)}が攻撃します。`:frame.stage==='damage'?`${name(report.defender)}に${report.damage}ダメージ。`:frame.stage==='counter'?`生き残った${report.defender.hpAfter}${suffix(report.defender)}が反撃します。`:frame.stage==='counterDamage'?`${name(report.attacker)}に${report.counter}ダメージ。`:'交戦中');
    const resultStage=frame.stage==='result';
    if(byId('skipCombatButton').hidden!==resultStage)byId('skipCombatButton').hidden=resultStage;
    if(byId('combatCloseButton').hidden===resultStage)byId('combatCloseButton').hidden=!resultStage;
    const description=`${labels[frame.stage]||'交戦中'}。${sideName(0)} ${report.attacker.team===0?frame.attackerCount:frame.defenderCount}${suffix(left)}、${sideName(1)} ${report.attacker.team===1?frame.attackerCount:frame.defenderCount}${suffix(right)}。`;
    if(canvas.getAttribute('aria-label')!==description)canvas.setAttribute('aria-label',description);
    render(canvas,report,frame,{time:session.elapsed,reducedMotion:session.reducedMotion});
    portraitPanels(report,frame);
    if(stageChanged&&resultStage&&active===session)byId('combatCloseButton').focus({preventScroll:true});
    if(stageChanged){try{onStage(frame,report);}catch{/* Optional sound must not stop playback. */}}
  }
  function finish(kind='completed'){
    const session=active;if(!session)return;
    active=null;if(rafId)window.cancelAnimationFrame(rafId);rafId=0;
    try{if(kind!=='cancelled')draw(session,getFrame(session.report,Number.MAX_SAFE_INTEGER,{reducedMotion:session.reducedMotion}));}catch{/* The resolved game remains authoritative if drawing fails. */}
    try{if(dialog.open)dialog.close();}catch{}
    session.resolve({cancelled:kind==='cancelled',skipped:kind==='skipped'});
  }
  function tick(time){
    rafId=0;const session=active;if(!session)return;
    if(document.hidden){session.lastTime=null;return;}
    // Time follows the visible page clock, not the number of frames delivered.
    // Slow devices can skip a visual frame without stretching a short battle.
    if(session.lastTime!==null)session.elapsed+=Math.max(0,time-session.lastTime);
    session.lastTime=time;
    if(time-session.lastDraw>=1000/30){
      session.lastDraw=time;
      try{
        const frame=getFrame(session.report,session.elapsed,{reducedMotion:session.reducedMotion});draw(session,frame);
        if(active!==session)return;
        if(frame.finished){finish();return;}
      }catch{finish('cancelled');return;}
    }
    request();
  }
  function play(report){
    finish('cancelled');
    if(destroyed)return Promise.resolve({cancelled:true});
    const reducedMotion=Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
    const first=getFrame(report,0,{reducedMotion});if(first.valid===false)return Promise.resolve({cancelled:false,unavailable:true});
    return new Promise(resolve=>{
      const clock=window.performance?.now?.();
      const session={report,resolve,reducedMotion,elapsed:0,lastTime:Number.isFinite(clock)?clock:null,lastDraw:-Infinity,stage:null};active=session;
      try{if(!dialog.open)dialog.showModal();draw(session,first);byId('skipCombatButton').focus({preventScroll:true});request();}
      catch{finish('cancelled');}
    });
  }
  listen(byId('skipCombatButton'),'click',()=>finish('skipped'));
  listen(byId('combatCloseButton'),'click',()=>finish());
  listen(dialog,'cancel',event=>{event.preventDefault();finish('skipped');});
  // A close event from a cancelled session may arrive after a new session has
  // reopened this same dialog. An open dialog belongs to that newer session.
  listen(dialog,'close',()=>{if(active&&!dialog.open)finish('skipped');});
  listen(document,'visibilitychange',()=>{if(active){active.lastTime=null;if(document.hidden&&rafId){window.cancelAnimationFrame(rafId);rafId=0;}else request();}});
  return {play,cancel:()=>finish('cancelled'),isPlaying:()=>Boolean(active),destroy(){finish('cancelled');destroyed=true;listeners.forEach(fn=>fn());}};
}
