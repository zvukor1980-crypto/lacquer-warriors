/* CROWN QUEST 8 · original adaptive game soundtrack & foley
   Entirely procedural Web Audio. No remote files, subscriptions or copyrighted samples.
   Music starts only following a user gesture, as required by iOS Safari.
*/
(function(){
"use strict";
const AC=()=>window.AudioContext||window.webkitAudioContext;
const BPM=134,STEP=60/BPM/4,TAU=Math.PI*2,MIN=0.0001;
const TOURS=[
{root:50,prog:[0,5,3,7],lead:[0,7,10,12,10,7,5,3,7,5,3,0,-2,0,3,5]},
{root:57,prog:[0,3,7,5],lead:[0,3,5,7,10,7,5,3,12,10,7,5,3,5,7,10]},
{root:48,prog:[0,8,3,7],lead:[0,7,8,12,15,12,8,7,3,7,10,7,8,7,3,0]},
{root:53,prog:[0,5,7,3],lead:[0,5,7,12,10,7,5,0,3,7,10,12,10,7,5,3]}
];
const drumPatterns={
battle:{kick:[0,6,8,12,14],snare:[4,12],hat:[0,2,4,6,8,10,12,14],open:[7,15]},
boss:{kick:[0,3,6,8,10,12,14],snare:[4,12,15],hat:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],open:[7,15]},
menu:{kick:[0,8],snare:[12],hat:[2,6,10,14],open:[15]}
};
const NOTES=[0,2,3,5,7,8,10];
function hz(midi){return 440*Math.pow(2,(midi-69)/12);}
function safe(n,lo,hi){return Math.max(lo,Math.min(hi,Number(n)||lo));}
let ctx=null,master=null,musicGain=null,fxGain=null,compressor=null,send=null,echo=null,echoReturn=null;
let noise=null,periodic=null,interval=null,active=false,enabled=true,musicOn=true,fxOn=true;
let musicVol=.68,fxVol=.7,scene="menu",wantedScene="menu",next=0,step=0,run=0,prevBoss=false;
let unlocked=false,hasBegun=false,waitingGesture=true;
const status={get ready(){return !!ctx&&unlocked},get playing(){return active&&musicOn&&enabled&&!!ctx&&ctx.state==="running"},get scene(){return scene},get music(){return musicOn&&enabled},get effects(){return fxOn&&enabled}};
function equalGain(node,v,at=.055){if(!node||!ctx)return;const p=node.gain||node;p.cancelScheduledValues(ctx.currentTime);p.setTargetAtTime(Math.max(0,v),ctx.currentTime,at);}
function impulse(c,duration=1.35,decay=2.8){
 const n=Math.ceil(c.sampleRate*duration),b=c.createBuffer(2,n,c.sampleRate);
 for(let ch=0;ch<2;ch++){let v=b.getChannelData(ch),seed=ch?424242:777777;
  for(let i=0;i<n;i++){seed=(Math.imul(seed,1664525)+1013904223)|0;v[i]=((seed>>>0)/2147483648-1)*Math.pow(1-i/n,decay)*.75;}
 }
 return b;
}
function makeNoise(c){
 const length=c.sampleRate,b=c.createBuffer(1,length,c.sampleRate),d=b.getChannelData(0);
 let seed=123456789;for(let i=0;i<length;i++){seed=(Math.imul(seed,1103515245)+12345)|0;d[i]=(seed/2147483648)*.76;}
 return b;
}
function init(){
 if(ctx||!AC())return !!ctx;
 try{
  ctx=new (AC())();
  master=ctx.createGain();master.gain.value=.77;
  compressor=ctx.createDynamicsCompressor();
  compressor.threshold.value=-16;compressor.knee.value=17;compressor.ratio.value=3.5;compressor.attack.value=.006;compressor.release.value=.2;
  musicGain=ctx.createGain();musicGain.gain.value=musicOn?musicVol:0;
  fxGain=ctx.createGain();fxGain.gain.value=fxOn?fxVol:0;
  musicGain.connect(compressor);fxGain.connect(compressor);compressor.connect(master);master.connect(ctx.destination);
  noise=makeNoise(ctx);
  const rev=ctx.createConvolver();rev.buffer=impulse(ctx);
  send=ctx.createGain();send.gain.value=.18;send.connect(rev);
  const reverbOut=ctx.createGain();reverbOut.gain.value=.3;rev.connect(reverbOut);reverbOut.connect(compressor);
  echo=ctx.createDelay(.6);echo.delayTime.value=STEP*3;
  echoReturn=ctx.createGain();echoReturn.gain.value=.18;
  echo.connect(echoReturn);echoReturn.connect(echo);echo.connect(musicGain);
  return true;
 }catch(e){ctx=null;return false;}
}
function unlock(){
 if(!enabled||!AC())return;
 if(!init())return;
 try{
  if(ctx.state!=="running"){let p=ctx.resume();if(p&&typeof p.then==="function")p.then(()=>{unlocked=ctx.state==="running";if(unlocked)beginScheduler();}).catch(()=>{});}
  unlocked=ctx.state==="running";
  if(unlocked){waitingGesture=false;beginScheduler();}
 }catch(e){}
}
function beginScheduler(){
 if(!ctx||ctx.state!=="running"||!enabled||!musicOn||document.hidden)return;
 if(active)return;
 next=ctx.currentTime+.035;
 active=true;interval=setInterval(schedule,70);
}
function stopScheduler(){
 active=false;
 if(interval!==null){clearInterval(interval);interval=null;}
 if(ctx&&musicGain)equalGain(musicGain,0,.035);
}
function applyGain(){
 if(!ctx)return;
 equalGain(musicGain,enabled&&musicOn&&!document.hidden?musicVol:0);
 equalGain(fxGain,enabled&&fxOn?fxVol:0);
}
function setScene(s){
 wantedScene=["menu","battle","boss","victory","defeat","pause"].includes(s)?s:"menu";
 if(wantedScene===scene)return;
 if(wantedScene==="victory"||wantedScene==="defeat"){scene=wantedScene;step=0;run=0;if(ctx&&unlocked)stinger(wantedScene==="victory"?"win":"lose");}
 else if(wantedScene==="boss"&&scene!=="boss"){scene="boss";step=0;run=0;if(ctx&&unlocked)stinger("boss");}
 else if(scene==="victory"||scene==="defeat"||wantedScene==="menu"||wantedScene==="pause"){scene=wantedScene;step=0;run=0;}
 else{scene=wantedScene;step=0;run=0;}
 if(active&&ctx)next=Math.max(next,ctx.currentTime+.04);
}
function voice(midi,t,dur,opts={}){
 if(!ctx)return;
 const v=safe(opts.v,.001,.55),f=hz(midi),type=opts.type||"sawtooth";
 const gn=ctx.createGain(),filter=ctx.createBiquadFilter();
 filter.type="lowpass";filter.frequency.setValueAtTime(opts.cutoff||2200,t);
 if(opts.sweep)filter.frequency.exponentialRampToValueAtTime(Math.max(300,opts.sweep),t+Math.max(.05,dur*.8));
 filter.Q.value=opts.q||.7;
 gn.gain.setValueAtTime(MIN,t);
 gn.gain.exponentialRampToValueAtTime(v,t+Math.max(.007,opts.atk||.014));
 gn.gain.exponentialRampToValueAtTime(Math.max(MIN,v*(opts.sustain||.6)),t+Math.max(.03,dur*.45));
 gn.gain.exponentialRampToValueAtTime(MIN,t+dur+.14);
 filter.connect(gn);gn.connect(musicGain);
 if(opts.verb&&send){const wet=ctx.createGain();wet.gain.value=opts.verb;gn.connect(wet);wet.connect(send);}
 if(opts.delay&&echo){const w=ctx.createGain();w.gain.value=.17;gn.connect(w);w.connect(echo);}
 const harmonics=opts.layers||1;
 for(let j=0;j<harmonics;j++){
  const osc=ctx.createOscillator();osc.type=type;osc.frequency.setValueAtTime(f*(opts.octave||1),t);osc.detune.value=harmonics===1?0:j===0?-8:8;
  osc.connect(filter);osc.start(t);osc.stop(t+dur+.17);
 }
 if(opts.sub){
  const o=ctx.createOscillator();o.type="sine";o.frequency.setValueAtTime(f/2,t);o.connect(filter);o.start(t);o.stop(t+dur+.17);
 }
}
function transient(t,shape,level,filterHz=5000){
 if(!ctx||!noise)return;
 const src=ctx.createBufferSource();src.buffer=noise;
 const hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=filterHz;
 const gain=ctx.createGain();gain.gain.setValueAtTime(Math.max(MIN,level),t);
 gain.gain.exponentialRampToValueAtTime(MIN,t+shape);
 src.connect(hp);hp.connect(gain);gain.connect(musicGain);
 src.start(t,Math.random()*.3);src.stop(t+shape+.01);
}
function kick(t,level=1){
 if(!ctx)return;
 const o=ctx.createOscillator(),g=ctx.createGain();
 o.type="sine";o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(47,t+.07);o.frequency.exponentialRampToValueAtTime(38,t+.19);
 g.gain.setValueAtTime(.72*level,t);g.gain.exponentialRampToValueAtTime(.001,t+.26);
 o.connect(g);g.connect(musicGain);o.start(t);o.stop(t+.27);
 transient(t,.025,.13*level,5000);
}
function snare(t,level=1){
 transient(t,.13,.32*level,1100);
 const o=ctx.createOscillator(),g=ctx.createGain();
 o.type="triangle";o.frequency.setValueAtTime(196,t);o.frequency.exponentialRampToValueAtTime(120,t+.07);
 g.gain.setValueAtTime(.11*level,t);g.gain.exponentialRampToValueAtTime(MIN,t+.12);
 o.connect(g);g.connect(musicGain);o.start(t);o.stop(t+.13);
}
function tom(t,n=0,level=.5){
 const o=ctx.createOscillator(),g=ctx.createGain();
 o.type="sine";o.frequency.setValueAtTime(230-n*45,t);o.frequency.exponentialRampToValueAtTime(80-n*18,t+.19);
 g.gain.setValueAtTime(level,t);g.gain.exponentialRampToValueAtTime(MIN,t+.23);
 o.connect(g);g.connect(musicGain);o.start(t);o.stop(t+.24);
}
function cymbal(t,dur=.13,level=.14){transient(t,dur,level,6800);}
function chord(midi,t,dur,vol=.09,bright=1600){
 for(const iv of [0,3,7,12])voice(midi+iv,t,dur,{type:"sawtooth",v:vol,atk:.12,sustain:.65,cutoff:bright,verb:.25,layers:1});
}
function pluck(m,t,dur=.15,v=.095){
 voice(m,t,dur,{type:"triangle",v,atk:.007,cutoff:3400,sweep:700,delay:true,verb:.18});
}
function bass(m,t,len=.3,strong=false){
 voice(m-12,t,len,{type:"sawtooth",v:strong?.23:.17,atk:.007,cutoff:360,sweep:225,sub:true,sustain:.34});
}
function lead(m,t,dur=.27,vol=.12){
 voice(m,t,dur,{type:"sawtooth",v:vol,atk:.013,cutoff:2800,sweep:1250,layers:2,sustain:.47,delay:true,verb:.2});
}
function currentHarmony(){
 const bar=Math.floor(step/16),idx=bar%4,prog=TOURS[run%TOURS.length];
 const root=prog.root+prog.prog[idx];
 return {root,prog,bar,idx};
}
function schedule(){
 if(!ctx||ctx.state!=="running"||!enabled||!musicOn||document.hidden){stopScheduler();return;}
 let n=0;while(next<ctx.currentTime+.21&&n<12){
  const t=next,pos=step%16,bar=Math.floor(step/16),B=scene==="boss"?"boss":scene==="battle"?"battle":"menu";
  let {root,prog,idx}=currentHarmony();
  // Menu and pause are warm cinematic; battle is orchestral-rock;
  // boss pushes a double-time industrial-rock rhythm.
  const isBattle=B!=="menu",boss=B==="boss",pat=drumPatterns[B];
  const silent=(scene==="victory"||scene==="defeat");
  if(!silent){
   if(pat.kick.includes(pos))kick(t,boss?1.17:isBattle?1:.68);
   if(pat.snare.includes(pos))snare(t,boss?1:.83);
   if(pat.hat.includes(pos))cymbal(t,.075,pos%4===0?.155:.095);
   if(pat.open.includes(pos))cymbal(t,.22,isBattle?.18:.12);
   if(pos===0){chord(root-12,t,STEP*(isBattle?15:29),isBattle?.075:.055,boss?2200:1700);
     if(isBattle)voice(root+12,t,STEP*7,{type:"triangle",v:.055,atk:.03,cutoff:3000,verb:.28});
   }
   if(pos===0||pos===3||pos===6||pos===8||pos===11||pos===14)bass(root+(pos===14?7:0),t,STEP*(pos%4===0?2.7:1.5),pos%8===0);
   if(pos%2===0){const oct=pos===14?12:0;
    pluck(root+12+NOTES[(pos/2+bar)%NOTES.length]+oct,t,STEP*.8,isBattle?.084:.065);}
   if(isBattle){
    const melodic=prog.lead[(pos+idx*3)%prog.lead.length];
    if([0,3,6,8,11,14].includes(pos))lead(prog.root+24+melodic,t,STEP*([0,8].includes(pos)?2.7:1.55),boss?.135:.107);
    if(boss&&[2,7,10,15].includes(pos))lead(root+24+(pos%3?7:12),t,STEP*.8,.085);
    if(pos===15&&bar%4===3){tom(t,0,.36);tom(t+STEP*.48,1,.3);cymbal(t+STEP*.85,.4,.2);}
   }else{
    if([0,4,8,12].includes(pos))pluck(prog.root+24+prog.lead[pos%16],t,STEP*3,.085);
    if(pos===15&&bar%4===3)cymbal(t,.6,.18);
   }
  } else if(pos===0&&bar%2===0){chord(root-12,t,STEP*28,.035,850);}
  step++;if(step>=16*16){step=0;run=(run+1)%TOURS.length;}
  next+=STEP; n++;
 }
 if(next<ctx.currentTime-.5)next=ctx.currentTime+.02;
}
function fxVoice(freq,now,dur,opts={}){
 const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
 o.type=opts.type||"triangle";
 o.frequency.setValueAtTime(freq,now);
 if(opts.end)o.frequency.exponentialRampToValueAtTime(Math.max(30,opts.end),now+dur);
 f.type="lowpass";f.frequency.value=opts.cutoff||5800;
 g.gain.setValueAtTime(MIN,now);g.gain.exponentialRampToValueAtTime(opts.volume||.12,now+.012);
 g.gain.exponentialRampToValueAtTime(MIN,now+dur);
 o.connect(f);f.connect(g);g.connect(fxGain);
 if(opts.reverb&&send){const wet=ctx.createGain();wet.gain.value=opts.reverb;g.connect(wet);wet.connect(send);}
 o.start(now);o.stop(now+dur+.012);
}
function fxNoise(t,dur,vol,filter=2000){
 const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();
 s.buffer=noise;f.type="highpass";f.frequency.value=filter;
 g.gain.setValueAtTime(Math.max(MIN,vol),t);g.gain.exponentialRampToValueAtTime(MIN,t+dur);
 s.connect(f);f.connect(g);g.connect(fxGain);s.start(t,Math.random()*.35);s.stop(t+dur+.005);
}
function sfx(name){
 if(!enabled||!fxOn||document.hidden)return;
 if(!ctx||ctx.state!=="running"){unlock();if(!ctx||ctx.state!=="running")return;}
 const t=ctx.currentTime+.012;
 try{switch(name){
 case"click":fxVoice(620,t,.075,{end:770,volume:.055,type:"sine"});break;
 case"start":for(let i=0;i<4;i++)fxVoice(220*Math.pow(2,i/5),t+i*.085,.24,{end:600*Math.pow(2,i/5),volume:.12,type:"sawtooth",reverb:.5});break;
 case"unit":fxVoice(175,t,.17,{end:100,volume:.16,cutoff:1600});fxNoise(t,.08,.08,2400);break;
 case"hit":fxNoise(t,.085,.15,650);fxVoice(120,t,.08,{end:65,volume:.1,cutoff:900});break;
 case"hero":for(let i=0;i<4;i++)fxVoice(392*Math.pow(2,[0,3,7,12][i]/12),t+i*.095,.47,{volume:.13,type:"sawtooth",reverb:.4});break;
 case"magic":fxVoice(300,t,.48,{end:1450,volume:.15,type:"sawtooth",reverb:.6});fxNoise(t+.08,.23,.07,2000);break;
 case"buy":fxVoice(660,t,.13,{end:990,volume:.13,type:"sine"});fxVoice(990,t+.12,.24,{end:1320,volume:.13,type:"sine",reverb:.5});break;
 case"card":for(let i=0;i<3;i++)fxVoice(600*Math.pow(2,i/6),t+.12*i,.38,{end:1050*Math.pow(2,i/6),volume:.1,reverb:.7});break;
 case"boss":fxVoice(104,t,.7,{end:45,volume:.28,type:"sawtooth",cutoff:650});fxNoise(t,.42,.22,200);tom(t+.23,1,.6);break;
 case"win":for(let i=0;i<5;i++)fxVoice(hz([62,65,69,74,77][i]),t+i*.12,.5,{volume:.14,type:"triangle",reverb:.7});break;
 case"lose":for(let i=0;i<3;i++)fxVoice(hz([57,53,48][i]),t+i*.2,.47,{end:hz([53,48,45][i]),volume:.12,type:"sawtooth",cutoff:1400});break;
 case"heal":for(let i=0;i<4;i++)fxVoice(560+i*180,t+i*.06,.28,{volume:.08,type:"sine",reverb:.55});break;
 case"ice":fxNoise(t,.38,.15,5600);fxVoice(1040,t,.48,{end:520,volume:.13,type:"sine",reverb:.6});break;
 case"meteor":fxVoice(600,t,.47,{end:65,volume:.21,type:"sawtooth",cutoff:2000});fxNoise(t+.27,.36,.28,900);break;
 case"rage":fxVoice(140,t,.6,{end:420,volume:.24,type:"sawtooth",cutoff:2000});break;
 case"wind":fxNoise(t,.67,.17,1400);fxVoice(250,t,.45,{end:890,volume:.1,type:"sine"});break;
 }}catch(e){}
}
function stinger(name){sfx(name);}
function settings(obj={}){
 enabled=obj.sound!==false;
 musicOn=obj.music!==false;fxOn=obj.fx!==false;
 musicVol=safe(obj.musicVolume??.68,.05,1);fxVol=safe(obj.fxVolume??.7,.05,1);
 if(!enabled||!musicOn)stopScheduler();
 else if(ctx&&ctx.state==="running"){applyGain();beginScheduler();}
 applyGain();
}
function sceneTick(v){
 if(!v)return;
 const expected=v.playing?(v.paused?"pause":v.boss?"boss":"battle"):(v.done?"menu":"menu");
 if(expected!==scene)setScene(expected);
}
function onVisibility(){
 if(document.hidden){stopScheduler();applyGain();}
 else if(unlocked&&enabled&&musicOn&&ctx&&ctx.state==="running"){applyGain();beginScheduler();}
}
if(typeof document!=="undefined"){
 document.addEventListener("pointerdown",unlock,{passive:true});
 document.addEventListener("touchstart",unlock,{passive:true});
 document.addEventListener("visibilitychange",onVisibility);
}
if(typeof window!=="undefined")window.addEventListener("pagehide",stopScheduler);
window.CrownAudio={unlock,sfx,setScene,sceneTick,settings,status,stop:stopScheduler,
 get engine(){return {ready:!!ctx,unlocked,active,scene,step,next,enabled,musicOn,fxOn,volumes:[musicVol,fxVol]};}
};
})();