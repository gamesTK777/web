import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as cast from './cast.mjs';

class Node {
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.classList={toggle(){}};this.hidden=false;this.disabled=false;this.value='';}
  append(...children){this.children.push(...children);}
  replaceChildren(...children){this.children=children;}
  setAttribute(name,value){this[name]=String(value);}
  removeAttribute(name){delete this[name];}
}
async function harness(){
  const html=await readFile(new URL('./admin.html',import.meta.url),'utf8');
  const source=await readFile(new URL('./admin.mjs',import.meta.url),'utf8');
  const ids=new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(([,id])=>[id,new Node()]));
  const tabs=Array.from({length:7},(_,i)=>Object.assign(new Node('button'),{dataset:{stage:String(i+1)}}));
  const files=[...html.matchAll(/<input[^>]+id="([^"]+)"[^>]+type="file"/g)].map(([,id])=>ids.get(id));
  const document={getElementById(id){assert.ok(ids.has(id),'Missing HTML node '+id);return ids.get(id);},createElement:tag=>new Node(tag),querySelectorAll:selector=>selector==='[data-stage]'?tabs:selector==='input[type=file]'?files:[]};
  const context=vm.createContext({document,window:{addEventListener(){}},Image:Node,__cast:cast,URL,AbortController,console,setTimeout,clearTimeout,confirm:()=>true,fetch:async url=>({ok:true,status:200,json:async()=>url.endsWith('/admin')?{canManage:false,authenticated:false}:{images:[],limit:100}})});
  const hooks=`globalThis.qa={configure(value){config=value;draft=draftConfig(value);allowed=true;stageId=1;render();},select(id){stageId=id;render();},state(){return {draft,dirty};}};`;
  vm.runInContext('const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast;\n'+source.replace(/^import .*;\r?$/gm,'')+'\n'+hooks,context);
  await new Promise(setImmediate);
  return {node:id=>document.getElementById(id),qa:context.qa};
}
const config=()=>({version:0,stages:cast.CAST.map(profile=>({id:profile.id,name:`ステージ${profile.id}の対戦相手`,portrait:null,rewards:[null,null,null],accent:'#e89cae',difficulty:profile.id}))});
const base='https://gamestk777.github.io/web/mahjong/assets/cast/';

test('all seven management stages show the assigned portrait and three distinct default rewards',async()=>{
  const f=await harness(),input=config(),before=JSON.stringify(input);f.qa.configure(input);
  for(const profile of cast.CAST){
    f.qa.select(profile.id);
    assert.equal(f.node('characterName').value,profile.name);
    assert.equal(f.node('portraitPreview').src,cast.defaultPortraitURL(profile.id,base));
    assert.equal(f.node('portraitPreview').hidden,false);
    for(let win=1;win<=3;win++){
      assert.equal(f.node('rewardPreview'+win).src,cast.defaultRewardURL(profile.id,win,base));
      assert.equal(f.node('rewardPreview'+win).hidden,false);
    }
  }
  assert.equal(JSON.stringify(input),before,'Viewing defaults must not mutate the received config');
});

test('registered names and images override defaults, and resetting one slot preserves every other slot',async()=>{
  const f=await harness(),input=config();input.version=12;
  input.stages[4]={...input.stages[4],name:'カスタム対戦相手',portrait:'portrait-id',rewards:['first-id','second-id','third-id']};
  const before=JSON.stringify(input);f.qa.configure(input);f.qa.select(5);
  assert.equal(f.node('characterName').value,'カスタム対戦相手');
  assert.equal(f.node('portraitPreview').src,'/api/mahjong/assets/portrait-id');
  assert.equal(f.node('rewardPreview2').src,'/api/mahjong/assets/second-id');
  f.node('removeReward2').onclick();
  assert.equal(f.node('rewardPreview2').src,cast.defaultRewardURL(5,2,base));
  assert.equal(f.node('rewardPreview1').src,'/api/mahjong/assets/first-id');
  assert.equal(f.node('rewardPreview3').src,'/api/mahjong/assets/third-id');
  assert.equal(f.node('portraitPreview').src,'/api/mahjong/assets/portrait-id');
  assert.equal(f.qa.state().draft.version,12);
  assert.equal(f.qa.state().draft.stages[4].name,'カスタム対戦相手');
  assert.equal(f.qa.state().dirty,true);
  assert.equal(JSON.stringify(input),before);
});

test('the signed-out reference gallery exposes all 28 correctly assigned public images',async()=>{
  const f=await harness(),cards=f.node('initialCastGallery').children;
  assert.equal(cards.length,7);
  const urls=[];
  cards.forEach((card,i)=>{
    assert.ok(card.children[0].textContent.includes(cast.CAST[i].name));
    assert.equal(card.children[1].children.length,4);
    card.children[1].children.forEach(figure=>{urls.push(figure.children[0].src);assert.equal(figure.children[0].loading,'lazy');});
  });
  assert.equal(new Set(urls).size,28);
});
