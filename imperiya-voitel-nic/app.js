(function(){
"use strict";
const $=id=>document.getElementById(id);
const KEY="queen_empire_offline_v2";
const AGES=[
{title:"Дикие луны",era:"Эпоха 1 · Изумрудные земли",sky:["#293a53","#be7d9d","#395a53"],icon:"🌿",units:[["Амазонка","⚔️"],["Охотница","🏹"],["Всадница","🐆"]]},
{title:"Золотые сады",era:"Эпоха 2 · Царство цветов",sky:["#59436a","#edacaa","#649b80"],icon:"🌸",units:[["Хранительница","🗡️"],["Фея-стрелок","🪄"],["Лесная королева","🦌"]]},
{title:"Бронзовая корона",era:"Эпоха 3 · Древние легенды",sky:["#372f4d","#d99571","#706f6b"],icon:"🏛️",units:[["Легионерка","🛡️"],["Лучница","🏹"],["Царица львов","🦁"]]},
{title:"Бархат и порох",era:"Эпоха 4 · Королевские дворцы",sky:["#492c50","#ca86a4","#685070"],icon:"🏰",units:[["Дуэлянтка","🗡️"],["Мушкетёрша","🎯"],["Герцогиня","💣"]]},
{title:"Стальные города",era:"Эпоха 5 · Индустриальный мир",sky:["#293447","#ad7e99","#4c6772"],icon:"⚙️",units:[["Защитница","🔧"],["Снайперша","🎯"],["Меха-пилот","🤖"]]},
{title:"Неоновая ночь",era:"Эпоха 6 · Город будущего",sky:["#141b48","#7347a1","#254360"],icon:"🌃",units:[["Кибер-ниндзя","⚡"],["Техноведьма","🔮"],["Робо-амазонка","🦾"]]},
{title:"Звёздные троны",era:"Эпоха 7 · Галактическая империя",sky:["#171b47","#8f4b91","#394b73"],icon:"🌌",units:[["Астрорыцарь","🪐"],["Лазерная леди","✨"],["Королева комет","🚀"]]}
];
const NAMES=["Астра","Мира","Селена","Ника","Виктория","Лея","Роксана","Эсмеральда","София","Ирис","Кассиопея","Рубина","Аврора","Тамира","Вега","Мелисса","Кира","Аделина"];
const HAIRS=["#332136","#e9c38c","#832942","#28223e","#b36944","#14172e","#ecd2a5","#a44a5c","#6a412c","#222a45","#b88b63","#e8bc68","#793975","#2f1e27","#e9c5b1","#975041","#2e2039","#db9dbf"];
const SKINS=["#f1ba99","#b88469","#f0c7a7","#bd7b5d","#d69a7f","#edb69b","#c78c71","#e6ab8b","#ac7058","#f0c9ae","#d9a282","#c98c72"];
const COLORS=["#d44c86","#7050bf","#48a6a6","#bf7a38","#b34270","#4e7cc2","#ca8db5","#497c69","#c55254","#ae9b59","#7c6ac5","#3893a5","#c85e96","#c07844","#547ab7","#9981d0","#a63d77","#d58490"];
const MAGICS=[["Лёд","❄️","На 5 секунд замораживает врагов"],["Метеоры","☄️","Поражает всех врагов"],["Лечение","💗","Восстанавливает здоровье"],["Ярость","🔥","Увеличивает урон на 12 секунд"],["Тайфун","🌪️","Отбрасывает врагов назад"],["Двойники","👥","Призывает две копии героини"]];
const SHOP=[
["food","🍎","Сады изобилия","+0,55 еды в секунду","coins",90],
["base","🏰","Крепостные стены","+110 здоровья базы","coins",105],
["attack","⚔️","Алый клинок","+17% к урону всех воительниц","coins",150],
["vital","❤️","Шёлковая броня","+18% здоровья армии","coins",155],
["income","💰","Королевская казна","Больше наград за бои","coins",230],
["auto","🌟","Королевский призыв","Автоматически вызывает воительниц","gems",110],
["magic3","🔥","Чары ярости","Открывает новую магию","gems",45],
["magic4","🌪️","Чары тайфуна","Открывает новую магию","gems",55],
["magic5","👥","Чары двойников","Открывает новую магию","gems",70],
["skin","👗","Глянцевая коллекция","Новый оттенок лаковых доспехов","gems",65],
["relic","🔮","Реликвия королев","Постоянное усиление армии","gems",90],
["chest","🎁","Сундук фортуны","Случайные монеты или кристаллы","coins",165]
];
function defaults(){return {coins:180,gems:85,era:0,stage:1,timeline:1,food:0,base:0,attack:0,vital:0,income:0,auto:false,skin:0,relic:0,magic:[0,1,2],loadout:[0,1,2],units:[1,0,0],hero:0,heroes:[0],wins:0,losses:0,kills:0,deployed:0,claimed:"",first:true};}
let S=defaults();try{const data=JSON.parse(localStorage.getItem(KEY)||"null");if(data&&typeof data==="object")S=Object.assign(defaults(),data);}catch(e){}
S.era=Math.max(0,Math.min(6,Number(S.era)||0));S.stage=Math.max(1,Math.min(6,Number(S.stage)||1));
if(!Array.isArray(S.units))S.units=[1,0,0];if(!Array.isArray(S.heroes))S.heroes=[0];if(!Array.isArray(S.magic))S.magic=[0,1,2];if(!Array.isArray(S.loadout))S.loadout=[0,1,2];
const G={tab:"battle",mode:"story",playing:false,done:false,paused:false,speed:1,time:0,food:12,base:450,baseMax:450,enemy:450,enemyMax:450,troops:[],particles:[],queue:[],next:0,used:{},heroUsed:false,frozen:0,raging:0,dead:0,damage:0,autoWait:0};
const canvas=$("canvas"),c=canvas.getContext("2d");
let last=0,uiTimer=0,saveTimer=0,toastTimer=0;const W=390,H=300;
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+"м":n>=1000?(n/1000).toFixed(1)+"к":String(Math.floor(n));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2350);}
const a=()=>AGES[S.era],foodRate=()=>2.25+S.food*.55+S.era*.11;
const cost=k=>[8,18,40][k]+S.era*2+(S.timeline-1)*3;
const baseHP=()=>450+S.base*110+S.era*55+S.relic*55;
const attackPower=side=>side==="p"?(1+S.attack*.17+S.relic*.11):(1+(S.stage-1)*.13+S.era*.13+(S.timeline-1)*.15);
const healthPower=side=>side==="p"?(1+S.vital*.18+S.relic*.07):(1+(S.stage-1)*.13+S.era*.12+(S.timeline-1)*.15);
const enemyHP=()=>Math.round((460+(S.stage-1)*130)*Math.pow(1.25,S.era)*Math.pow(1.55,S.timeline-1)*(G.mode==="arena"?1.55:1));
const color=id=>COLORS[(id+S.skin*3)%COLORS.length];
function heroSvg(id){
const hair=HAIRS[id%HAIRS.length],skin=SKINS[id%SKINS.length],armor=color(id),pid="g"+id;
const fringe=id%3===0?"M28 47Q30 16 66 19L88 47 75 37 42 39Z":id%3===1?"M29 45Q27 19 57 17Q87 13 89 48L77 29 58 35 40 28Z":"M30 48Q20 16 61 16Q89 19 90 46L76 36 48 43Z";
return '<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+NAMES[id]+'"><defs><linearGradient id="'+pid+'" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff" stop-opacity=".5"/><stop offset=".35" stop-color="'+armor+'"/><stop offset="1" stop-color="#20112c"/></linearGradient></defs><circle cx="62" cy="54" r="52" fill="#ffffff12"/><path d="M14 142Q12 92 44 95L77 95Q107 100 112 142Z" fill="url(#'+pid+')" stroke="#ffdaac83" stroke-width="2"/><path d="M27 115L45 100 60 120 75 100 96 115" stroke="#ffe6b8" stroke-width="3" fill="none"/><path d="M48 92L51 78 69 78 72 92Q58 105 48 92Z" fill="'+skin+'"/><path d="M24 83Q9 28 35 16Q61-3 85 17Q107 42 91 91L79 70 37 70Z" fill="'+hair+'"/><ellipse cx="60" cy="54" rx="30" ry="37" fill="'+skin+'"/><path d="'+fringe+'" fill="'+hair+'"/><path d="M40 56Q48 52 54 56M66 56Q73 52 80 56" stroke="#4c2d3a" stroke-width="2" stroke-linecap="round" fill="none"/><ellipse cx="48" cy="57" rx="2" ry="2.5" fill="#201722"/><ellipse cx="72" cy="57" rx="2" ry="2.5" fill="#201722"/><path d="M60 61L56 70 63 72" stroke="#ad796d" stroke-width="1.5" fill="none"/><path d="M52 80Q61 85 69 79" stroke="#9e3c5d" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="32" cy="69" r="3.5" fill="#ffe1a7"/><circle cx="88" cy="69" r="3.5" fill="#ffe1a7"/><path d="M38 23Q60 1 84 23" fill="none" stroke="#fbdab2" stroke-width="2"/><path d="M60 6L67 17 60 28 53 17Z" fill="#fff0ae"/><path d="M42 125L60 137 79 125" stroke="#fff2d37f" fill="none" stroke-width="2"/></svg>';
}
function champ(){return '<div class="portrait">'+heroSvg(S.hero)+'</div><div class="champtext"><label>ВЕРХОВНАЯ КОМАНДИРША</label><strong>'+NAMES[S.hero]+'</strong><small>'+a().title+' · реликвии '+S.relic+'</small></div><button class="chip" data-a="tab" data-tab="heroes">Героини ›</button>';}
function rect(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
function backdrop(){const colors=a().sky,grad=c.createLinearGradient(0,0,0,H);grad.addColorStop(0,colors[0]);grad.addColorStop(.55,colors[1]);grad.addColorStop(1,colors[2]);c.fillStyle=grad;c.fillRect(0,0,W,H);
for(let i=0;i<33;i++){let x=(i*91+21)%W,y=(i*61+15)%160;c.fillStyle="#ffffff"+(i%2?"35":"60");c.beginPath();c.arc(x,y,1+i%3*.4,0,7);c.fill();}
c.fillStyle="#ffdfb149";c.beginPath();c.arc(300,65,35,0,7);c.fill();c.fillStyle="#fff0c781";c.beginPath();c.arc(300,65,20,0,7);c.fill();
for(let l=0;l<3;l++){let yy=140+l*29;c.beginPath();c.moveTo(0,yy);for(let x=0;x<=W;x+=12)c.lineTo(x,yy-12*Math.sin((x+l*22)/35));c.lineTo(W,H);c.lineTo(0,H);c.fillStyle=["#32244982","#32243d5c","#283545a1"][l];c.fill();}
if(S.era>=4){for(let i=0;i<10;i++){let x=i*51,h=44+(i*31)%54;c.fillStyle="#1e264788";c.fillRect(x,221-h,36,h);c.fillStyle="#ffaadd60";for(let row=0;row<3;row++)for(let col=0;col<3;col++)c.fillRect(x+6+col*10,230-h+row*11,4,5);}}
if(S.era===6){c.strokeStyle="#d8e7ffa1";c.lineWidth=2;c.beginPath();c.ellipse(185,102,78,18,.15,0,7);c.stroke();}
c.fillStyle="#947173";c.fillRect(0,225,W,75);c.fillStyle="#775467";c.fillRect(0,245,W,55);c.strokeStyle="#f7c29d5c";c.lineWidth=2;c.beginPath();c.moveTo(0,225);c.lineTo(W,225);c.stroke();
for(let i=0;i<12;i++){c.strokeStyle="#ffe7bb27";c.beginPath();c.moveTo((i*57)%390,260+(i%4)*9);c.lineTo((i*57)%390+13,263+(i%4)*9);c.stroke();}
}
function castle(x,enemy){c.save();c.translate(x,0);if(enemy)c.scale(-1,1);c.fillStyle="#100f2888";c.beginPath();c.ellipse(0,232,38,8,0,0,7);c.fill();
c.fillStyle=enemy?"#526993":"#914d70";c.beginPath();c.moveTo(-28,225);c.lineTo(-27,167);c.lineTo(-34,167);c.lineTo(-32,148);c.lineTo(-12,148);c.lineTo(-9,165);c.lineTo(9,165);c.lineTo(11,144);c.lineTo(30,144);c.lineTo(33,165);c.lineTo(27,167);c.lineTo(28,225);c.closePath();c.fill();c.strokeStyle="#ffdab88f";c.lineWidth=2;c.stroke();c.fillStyle="#201327";c.fillRect(-9,195,18,30);c.fillStyle="#ffe6ae";c.beginPath();c.arc(0,176,5,0,7);c.fill();c.fillRect(-25,182,8,4);c.fillRect(19,182,7,4);c.strokeStyle="#fff3d4";c.lineWidth=3;c.beginPath();c.moveTo(0,144);c.lineTo(0,123);c.stroke();c.fillStyle=enemy?"#b3daff":"#ffc1cf";c.beginPath();c.moveTo(1,123);c.lineTo(27,130);c.lineTo(1,139);c.fill();c.restore();}
function soldier(t){let y=t.y+Math.sin(G.time*7+t.seed)*1.4;c.save();c.translate(t.x,y);if(t.side==="e")c.scale(-1,1);let z=t.k===2?1.25:1;if(t.elite)z*=1.17;c.scale(z,z);
let armor=t.side==="e"?"#7181ad":color(t.hid),skin=t.side==="e"?"#d2b4aa":SKINS[t.hid%SKINS.length],hair=t.side==="e"?"#303953":HAIRS[t.hid%HAIRS.length];
c.fillStyle="#0a071ba9";c.beginPath();c.ellipse(0,0,15,4,0,0,7);c.fill();
c.strokeStyle="#21142d";c.lineWidth=5;c.lineCap="round";c.beginPath();c.moveTo(-7,-14);c.lineTo(-8,-1);c.moveTo(7,-14);c.lineTo(10,-1);c.stroke();c.strokeStyle=armor;c.lineWidth=4;c.stroke();
c.fillStyle=armor;c.beginPath();c.moveTo(-12,-34);c.lineTo(11,-34);c.lineTo(13,-12);c.lineTo(-12,-12);c.closePath();c.fill();
c.fillStyle="#ffffff53";c.beginPath();c.moveTo(-10,-31);c.lineTo(-4,-28);c.lineTo(1,-13);c.lineTo(-4,-13);c.closePath();c.fill();
c.fillStyle=hair;c.beginPath();c.ellipse(-2,-41,12,16,-.3,0,7);c.fill();c.fillStyle=skin;c.beginPath();c.ellipse(0,-41,10,12,0,0,7);c.fill();c.fillStyle=hair;c.beginPath();c.ellipse(-1,-48,11,7,0,Math.PI,2*Math.PI);c.fill();if(t.hid%3===0){c.beginPath();c.ellipse(-10,-40,4,12,-.25,0,7);c.fill();}
c.fillStyle="#2b1f35";c.beginPath();c.arc(4,-41,1.2,0,7);c.fill();
c.strokeStyle=skin;c.lineWidth=4;c.beginPath();c.moveTo(10,-29);c.lineTo(17,-25);c.stroke();c.strokeStyle=t.k===1?"#ffe2a1":t.k===2?"#ffaabb":"#dad9ed";c.lineWidth=t.k===2?5:3;c.beginPath();c.moveTo(17,-25);c.lineTo(t.k===1?25:27,t.k===1?-29:-48);c.stroke();
c.fillStyle=t.elite?"#ffe39c":"#ffc4da";c.beginPath();c.arc(0,-32,3,0,7);c.fill();if(t.elite){c.fillStyle="#fff0a5";c.font="12px sans-serif";c.fillText("✦",-5,-61);}c.restore();
rect(t.x-14,y-(t.elite?84:68),28,4,2,"#201323");rect(t.x-14,y-(t.elite?84:68),28*Math.max(0,t.hp/t.max),4,2,t.side==="p"?"#ffb4d2":"#9fdaff");}
function draw(){if(!c)return;c.clearRect(0,0,W,H);backdrop();castle(28,false);castle(361,true);
if(!G.playing&&!G.done){rect(60,77,270,65,15,"#1a112dcc","#ffe4b069");c.textAlign="center";c.fillStyle="#ffebd6";c.font="bold 19px Georgia";c.fillText("Время королев",195,103);c.fillStyle="#e8bbd7";c.font="12px sans-serif";c.fillText("Начни поход и завоюй эпохи",195,125);c.textAlign="left";}
G.troops.slice().sort((x,y)=>x.y-y.y).forEach(soldier);
G.particles.forEach(p=>{c.globalAlpha=Math.max(0,Math.min(1,p.life*2));c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,p.radius,0,7);c.fill();});c.globalAlpha=1;if(G.frozen>0){c.fillStyle="#cdeaff18";c.fillRect(0,0,W,H);}
}
function sparkle(x,y,color,n){for(let i=0;i<n;i++)G.particles.push({x,y,vx:(Math.random()-.5)*100,vy:(Math.random()-.8)*85,life:.3+Math.random()*.5,color,radius:1+Math.random()*2.5});if(G.particles.length>250)G.particles.splice(0,80);}
function waves(){let arr=[],at=3.5;for(let wave=0;wave<3;wave++){let count=3+wave*2+Math.min(2,S.stage-1);for(let i=0;i<count;i++){arr.push({at,k:i===count-1&&wave>0?2:(i+wave)%4===0?1:0});at+=2.6+Math.random()*.5;}at+=6;}return arr;}
function createTroop(side,k,hero){const stat=[{hp:82,damage:14,speed:29,range:23,rate:.88},{hp:49,damage:14,speed:23,range:96,rate:1.29},{hp:220,damage:35,speed:14,range:28,rate:1.55}][k];
const hid=hero==null?side==="p"?(S.deployed+Math.floor(Math.random()*5))%18:(Math.floor(Math.random()*17)+3)%18:hero;
const t={side,k,hid,x:side==="p"?49:342,y:231+Math.random()*19,hp:stat.hp*healthPower(side)*(hero==null?1:2.5),max:stat.hp*healthPower(side)*(hero==null?1:2.5),damage:stat.damage*attackPower(side)*(hero==null?1:2),speed:stat.speed,range:stat.range,rate:stat.rate,cd:Math.random()*.5,elite:hero!=null,seed:Math.random()*10};
G.troops.push(t);if(side==="p"){S.deployed++;saveTimer=1;}return t;}
function begin(){G.playing=true;G.done=false;G.paused=false;G.time=0;G.food=12;G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;G.troops=[];G.particles=[];G.queue=waves();G.next=0;G.used={};G.heroUsed=false;G.frozen=0;G.raging=0;G.dead=0;G.damage=0;G.autoWait=0;closeModal();render();}
function complete(won){if(G.done)return;G.playing=false;G.done=true;let reward=Math.round((won?185:65)*(1+(S.stage-1)*.2+S.era*.36)*(1+S.income*.18)*(G.mode==="arena"?1.3:1));let gems=won?(G.mode==="arena"?18:8):0;S.coins+=reward;S.gems+=gems;if(won){S.wins++;if(G.mode==="story"&&S.stage<6)S.stage++;}else S.losses++;save();
$("modal").hidden=false;$("modal").innerHTML='<div class="modalbox"><div class="big">'+(won?"🏆":"🛡️")+'</div><h2>'+(won?"Победа воительниц!":"Армия отступила")+'</h2><p>'+(won&&S.stage===6?"Эпоха покорена! Теперь можно перейти в следующую эпоху.":"Улучши войска и отправляйся в новый поход.")+'</p><p style="font-size:20px;color:#ffe0a0;font-weight:950">🪙 +'+fmt(reward)+'　💎 +'+gems+'</p><button class="go" data-a="newbattle">Продолжить</button><button class="chip" style="margin-top:10px" data-a="tab" data-tab="army">Развитие армии</button></div>';render();}
function tick(dt){
G.particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=150*dt;p.life-=dt;});G.particles=G.particles.filter(p=>p.life>0);
if(!G.playing||G.done||G.paused)return;G.time+=dt;G.food=Math.min(130,G.food+foodRate()*dt);G.frozen=Math.max(0,G.frozen-dt);G.raging=Math.max(0,G.raging-dt);
if(G.next<G.queue.length&&G.time>=G.queue[G.next].at){createTroop("e",G.queue[G.next].k,null);G.next++;}
if(S.auto){G.autoWait+=dt;if(G.autoWait>=8&&G.food>=cost(0)){G.autoWait=0;G.food-=cost(0);createTroop("p",0,null);}}
for(const t of G.troops){if(t.hp<=0)continue;t.cd-=dt;let nearest=null,dist=1e6;for(const e of G.troops){if(e.hp>0&&e.side!==t.side){let d=Math.abs(e.x-t.x);if(d<dist){nearest=e;dist=d;}}}
let direction=t.side==="p"?1:-1,baseDistance=t.side==="p"?361-t.x:t.x-28,target=nearest&&dist<baseDistance+4?nearest:null;
if(!(target?dist<t.range:baseDistance<t.range)){if(t.side==="e"&&G.frozen>0)continue;t.x+=t.speed*dt*direction;t.x=Math.max(28,Math.min(361,t.x));continue;}
if(t.cd<=0&&(t.side==="p"||G.frozen<=0)){t.cd=t.rate;let dmg=t.damage*(t.side==="p"&&G.raging>0?1.6:1)*(Math.random()<.08?1.6:1);if(target){target.hp-=dmg;sparkle(target.x,target.y-30,t.side==="p"?"#ffc0d0":"#a6d0ff",t.k===1?6:3);}
else if(t.side==="p"){G.enemy-=dmg*.8;G.damage+=dmg*.8;sparkle(359,190,"#ffe6ba",3);}
else{G.base-=dmg*.8;sparkle(29,190,"#bcd8ff",3);}}}
for(let i=G.troops.length-1;i>=0;i--){let dead=G.troops[i];if(dead.hp<=0){sparkle(dead.x,dead.y-28,dead.side==="e"?"#ffc3b1":"#eb9bd9",10);if(dead.side==="e"){S.coins+=Math.round((9+dead.k*12)*(1+S.income*.16));S.kills++;G.dead++;G.food=Math.min(130,G.food+3);}G.troops.splice(i,1);}}
if(G.enemy<=0)return complete(true);if(G.base<=0)return complete(false);if(G.time>=230)return complete(G.enemy<G.enemyMax*.3);
saveTimer+=dt;if(saveTimer>=10){saveTimer=0;save();}}
function unit(k){if(!G.playing)return toast("Сначала начни битву");if(!S.units[k])return toast("Открой отряд в развитии");if(G.food<cost(k))return toast("Недостаточно еды");G.food-=cost(k);createTroop("p",k,null);renderBattle();}
function summonHero(){if(!G.playing)return toast("Сначала начни битву");if(G.heroUsed)return toast("Героиня уже призвана");G.heroUsed=true;createTroop("p",S.units[2]?2:S.units[1]?1:0,S.hero);toast(NAMES[S.hero]+" вступила в бой!");renderBattle();}
function cast(k){if(!G.playing)return toast("Сначала начни битву");if(G.used[k])return toast("Эти чары уже использованы");G.used[k]=true;
if(k===0){G.frozen=5;toast("Враги заморожены!");}
if(k===1){for(const t of G.troops)if(t.side==="e"){t.hp-=76*attackPower("p");sparkle(t.x,t.y-30,"#fce9e8",10);}G.enemy-=40*attackPower("p");toast("Метеорный дождь!");}
if(k===2){G.base=Math.min(G.baseMax,G.base+140);for(const t of G.troops)if(t.side==="p")t.hp=Math.min(t.max,t.hp+t.max*.5);toast("Армия исцелена!");}
if(k===3){G.raging=12;toast("Боевая ярость!");}
if(k===4){for(const t of G.troops)if(t.side==="e"){t.x=Math.min(359,t.x+48);t.hp-=20;}toast("Врагов отбросило!");}
if(k===5){let u=G.troops.find(t=>t.side==="p");createTroop("p",u?u.k:0,S.hero);createTroop("p",u?u.k:0,S.hero);toast("Двойники призваны!");}renderBattle();}
function renderNav(){const tabs=[["battle","⚔️","Битва"],["army","🏰","Армия"],["heroes","👸","Героини"],["shop","🛍️","Магазин"],["other","🌟","Ещё"]];$("nav").innerHTML=tabs.map(t=>'<button data-a="tab" data-tab="'+t[0]+'" class="'+(G.tab===t[0]?"active":"")+'"><span>'+t[1]+'</span>'+t[2]+'</button>').join("");}
function renderBattle(){
$("eraText").textContent=a().era+" · Линия "+S.timeline;$("eraName").textContent=a().title;$("modeBtn").textContent=G.mode==="story"?"Поход ⟳":"Арена ⟳";
$("topchip").innerHTML='<span>⚔️ Битва '+Math.min(5,S.stage)+' / 5</span><span>⏱ '+Math.floor(G.time)+' с</span><span>👑 '+G.dead+' врагов</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";
$("units").innerHTML=a().units.map((t,k)=>'<button class="unit" data-a="'+(S.units[k]?"unit":"unlock")+'" data-k="'+k+'"><span class="emoji">'+t[1]+'</span><strong>'+t[0]+'</strong><span class="cost">'+(S.units[k]?"🍎 "+cost(k):"🔒 Открыть")+'</span></button>').join("");
$("spells").innerHTML=S.loadout.slice(0,3).map(k=>'<button class="spell" '+(G.used[k]||!G.playing?"disabled":"")+' data-a="magic" data-k="'+k+'"><span>'+MAGICS[k][1]+'</span><small>'+MAGICS[k][0]+'</small></button>').join("")+'<button class="spell" '+(G.heroUsed||!G.playing?"disabled":"")+' data-a="hero"><span>👸</span><small>'+NAMES[S.hero]+'</small></button>';
$("fightaction").innerHTML=(!G.playing)?'<button class="go" data-a="start">⚔️ НАЧАТЬ БИТВУ</button>':G.playing?'<div style="display:flex;gap:8px;margin:10px 12px"><button class="chip" style="flex:1" data-a="speed">⏩ Скорость ×'+G.speed+'</button><button class="chip" style="flex:1" data-a="pause">'+(G.paused?"▶ Продолжить":"Ⅱ Пауза")+'</button></div>':"";
$("hint").textContent=G.playing?"Выпускай воительниц и разрушай вражескую крепость":S.stage===6?"Эпоха пройдена — переходи в «Армию» для эволюции":"Побеждай, улучшай армию и открывай семь эпох";}

function updateHud(){
$("topchip").innerHTML='<span>⚔️ Битва '+Math.min(5,S.stage)+' / 5</span><span>⏱ '+Math.floor(G.time)+' с</span><span>👑 '+G.dead+' врагов</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";
}
function listHead(title,desc){return '<div class="herohead"><h2>'+title+'</h2><p>'+desc+'</p></div>';}
function levelPrice(id){let item=SHOP.find(t=>t[0]===id);if(!item)return 0;let p=item[5];if(["food","base","attack","vital","income"].includes(id))p=Math.round(p*Math.pow(1.48,S[id]));if(id==="skin")p+=S.skin*40;if(id==="relic")p+=S.relic*50;return p;}
function army(){let v=listHead("Развитие империи","Усиления, новые отряды и переходы между эпохами. Монеты зарабатываются даже при поражении.");
v+='<div class="sectionname"><b>УЛУЧШЕНИЯ</b></div>';
for(const id of ["food","base","attack","vital","income"]){let x=SHOP.find(t=>t[0]===id);v+='<div class="row"><span class="icon">'+x[1]+'</span><div class="desc"><strong>'+x[2]+'</strong><p>'+x[3]+' · ур. '+S[id]+'</p></div><button data-a="buy" data-id="'+id+'">🪙 '+fmt(levelPrice(id))+'</button></div>';}
v+='<div class="sectionname"><b>ОТРЯДЫ ЭПОХИ</b></div><div class="grid2">';
a().units.forEach((t,k)=>{v+='<div class="tile"><div class="icon">'+t[1]+'</div><strong>'+t[0]+'</strong><p>'+["Ближний бой и защита","Урон с расстояния","Мощный тяжёлый отряд"][k]+'</p><button data-a="unlock" data-k="'+k+'">'+(S.units[k]?"✓ Открыто":"🪙 "+(k===1?175:420))+'</button></div>';});v+='</div><hr class="divider">';
let next=AGES[(S.era+1)%7],price=evolutionPrice();v+=listHead("✨ Новая эпоха",a().title+" → "+next.title+". Войска и улучшения эпохи сбрасываются, а купленные героини, реликвии и магия остаются.");
v+='<button class="go" style="width:100%;margin:10px 0" data-a="evolve">'+(S.stage<6?"Выиграй пять битв • "+(S.stage-1)+"/5":"ЭВОЛЮЦИЯ • 🪙 "+fmt(price))+'</button>';return v;}
function heroes(){let v=listHead("Зал героинь","18 воительниц с собственными обликами, волосами, доспехами и темпераментами. Командиршу можно вызвать раз за бой.");
v+='<div class="sectionname"><b>КОЛЛЕКЦИЯ</b><small>'+S.heroes.length+' / 18 открыто</small></div><div class="herogrid">';
for(let i=0;i<18;i++){let own=S.heroes.includes(i),selected=S.hero===i;v+='<div class="herocard '+(selected?"on":"")+'">'+heroSvg(i)+'<strong>'+NAMES[i]+'</strong><small>'+["Защитница","Снайперша","Королева"][i%3]+'</small><button data-a="select" data-k="'+i+'">'+(selected?"✓ Выбрана":own?"Выбрать":"💎 "+(28+i*8))+'</button></div>';}
return v+'</div><p class="micro">Новые героини остаются открытыми при переходе в следующую эпоху.</p>';}
function shop(){let v=listHead("Королевская лавка","Здесь нет настоящих платежей, подписок или рекламы. Всё приобретается за игровые монеты и кристаллы.");
v+='<div class="sectionname"><b>АРТЕФАКТЫ И МАГИЯ</b></div><div class="grid2">';
for(const item of SHOP){let [id,icon,name,desc,currency]=item;let owned=id==="auto"?S.auto:id.startsWith("magic")?S.magic.includes(Number(id.slice(5))):false;
v+='<div class="tile"><div class="icon">'+icon+'</div><strong>'+name+'</strong><p>'+desc+'</p><button data-a="buy" data-id="'+id+'">'+(owned?"✓ Куплено":(currency==="gems"?"💎 ":"🪙 ")+fmt(levelPrice(id)))+'</button></div>';}v+='</div>';
v+='<hr class="divider">'+listHead("Глянцевые гардеробы","Наряды меняют окраску армий и героинь. Открыто коллекций: "+S.skin+". Реликвии усиливают воительниц: "+S.relic+".");return v;}
function other(){let date=new Date().toLocaleDateString("sv-SE"),claimed=S.claimed===date;let v=listHead("Хроники королев","Игра работает на iPhone без Интернета после первого открытия. Прогресс сохраняется локально.");
v+='<div class="grid2"><div class="tile"><div class="icon">🏆</div><strong>'+S.wins+' побед</strong><p>Победы в битвах</p></div><div class="tile"><div class="icon">👸</div><strong>'+S.heroes.length+' героинь</strong><p>Открытые персонажи</p></div><div class="tile"><div class="icon">⚔️</div><strong>'+S.kills+' врагов</strong><p>Побеждены в боях</p></div><div class="tile"><div class="icon">🌍</div><strong>'+S.timeline+' линия</strong><p>Цикл семи эпох</p></div></div>';
v+='<div class="sectionname"><b>ПОДАРОК ДНЯ</b></div><div class="row"><span class="icon">🎁</span><div class="desc"><strong>Королевский подарок</strong><p>Ежедневно: 100 монет и 20 кристаллов</p></div></div><button class="go" style="margin:8px 0;width:100%" data-a="claim">'+(claimed?"✓ Сегодня уже получен":"Получить подарок")+'</button>';
v+='<div class="sectionname"><b>СЕМЬ ЭПОХ</b></div>';AGES.forEach((age,i)=>{v+='<div class="row" style="'+(i===S.era?"border-color:#ffe2a4;":"")+'"><span class="icon">'+age.icon+'</span><div class="desc"><strong>'+age.title+'</strong><p>'+age.units.map(t=>t[0]).join(" · ")+'</p></div>'+(i===S.era?'<b style="font-size:9px;color:#ffd697">СЕЙЧАС</b>':"")+'</div>';});
v+='<hr class="divider">'+listHead("Сохранение и настройки","Данные хранятся только на этом iPhone. Сохраняй резервную копию перед очисткой данных Safari.");
v+='<div class="grid2"><button class="smallgo" data-a="export">📁 Экспорт</button><button class="smallgo" data-a="import">📥 Импорт</button><button class="smallgo" data-a="help">❔ Правила</button><button class="smallgo" data-a="mode">🎮 Режим боя</button></div><p class="micro">Самостоятельная игра в жанре наступательной стратегии. Оригинальные персонажи и оформление, без копирования графики We Are Warriors.</p>';return v;}
function render(){ $("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);$("champ").innerHTML=champ();let battle=G.tab==="battle";$("battlePage").hidden=!battle;$("otherPage").hidden=battle;if(battle)renderBattle();else $("otherPage").innerHTML=G.tab==="army"?army():G.tab==="heroes"?heroes():G.tab==="shop"?shop():other();renderNav();}
function setTab(tab){G.tab=tab;closeModal();render();window.scrollTo(0,0);}
function closeModal(){$("modal").hidden=true;$("modal").innerHTML="";}
function showHelp(){$("modal").hidden=false;$("modal").innerHTML='<div class="modalbox"><div class="big">👑</div><h2>Как играть</h2><p style="text-align:left">1. Начни бой — еда накапливается автоматически.<br>2. Нажимай на карточки отрядов, чтобы выпустить воительниц.<br>3. Используй заклинания и призывай командиршу.<br>4. Разрушь вражескую базу. За победу и побеждённых врагов получай монеты и кристаллы.<br>5. Покупай улучшения, открывай новых героинь и отряды.<br>6. Победи в пяти боях для перехода в следующую эпоху.<br><br>Арена сложнее похода, но даёт больше наград.</p><button class="go" style="width:100%" data-a="close">Играть</button></div>';}
function unlock(k){if(S.units[k])return toast("Отряд уже открыт");if(k===0)return;if(k===2&&!S.units[1])return toast("Сначала открой второй отряд");let p=k===1?175:420;if(S.coins<p){setTab("army");return toast("Нужно "+p+" монет");}S.coins-=p;S.units[k]=1;save();render();toast("Открыт новый отряд!");}
function purchase(id){let item=SHOP.find(t=>t[0]===id);if(!item)return;
if(id==="auto"&&S.auto)return toast("Уже куплено");if(id.startsWith("magic")&&S.magic.includes(Number(id.slice(5)))){let spell=Number(id.slice(5));if(S.loadout.includes(spell))return toast("Эта магия уже в колоде");S.loadout[2]=spell;save();render();return toast("Магия выбрана для боя!");}
let currency=item[4],price=levelPrice(id);if(S[currency]<price)return toast("Недостаточно "+(currency==="gems"?"кристаллов":"монет"));
S[currency]-=price;
if(["food","base","attack","vital","income","skin","relic"].includes(id))S[id]++;
else if(id==="auto")S.auto=true;else if(id.startsWith("magic")){let spell=Number(id.slice(5));S.magic.push(spell);S.loadout[2]=spell;}
else if(id==="chest"){if(Math.random()<.3){S.gems+=25;toast("Из сундука: 25 кристаллов!");}else {S.coins+=Math.round(180+Math.random()*220);toast("Сундук полон монет!");}}
save();render();if(id!=="chest")toast("Покупка успешна!");}
function choose(i){if(i<0||i>=18)return;if(!S.heroes.includes(i)){let price=28+i*8;if(S.gems<price)return toast("Недостаточно кристаллов");S.gems-=price;S.heroes.push(i);toast(NAMES[i]+" присоединилась к армии!");}S.hero=i;save();render();}
function evolutionPrice(){return Math.round(400*Math.pow(2.15,S.era)*(1+.25*(S.timeline-1)));}
function evolve(){if(S.stage<6)return toast("Сначала выиграй пять битв");let p=evolutionPrice();if(S.coins<p)return toast("Для эволюции нужно "+fmt(p)+" монет");S.coins-=p;S.era++;if(S.era>=7){S.era=0;S.timeline++;S.gems+=85;}S.stage=1;S.food=0;S.base=0;S.attack=0;S.vital=0;S.income=0;S.units=[1,0,0];G.done=false;G.playing=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;save();setTab("battle");toast("Новая эпоха: "+a().title);}
function daily(){let today=new Date().toLocaleDateString("sv-SE");if(S.claimed===today)return toast("Сегодня уже получено");S.claimed=today;S.coins+=100;S.gems+=20;save();render();toast("Подарок: 100 монет и 20 кристаллов!");}
function backup(){const blob=new Blob([JSON.stringify({app:"queen-empire-offline",version:1,state:S},null,2)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="voitel-nicy-save.json";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),2000);}
function restore(){let input=$("savefile");input.value="";input.onchange=()=>{let file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{let v=JSON.parse(reader.result);if(v.app!=="queen-empire-offline"||!v.state)throw Error("bad");S=Object.assign(defaults(),v.state);if(!Array.isArray(S.heroes)||!Array.isArray(S.units))throw Error("bad");save();G.playing=false;G.done=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;setTab("battle");toast("Сохранение восстановлено");}catch(e){toast("Не удалось прочитать сохранение");}};reader.readAsText(file);};input.click();}
document.addEventListener("click",e=>{let el=e.target.closest("[data-a]");if(!el)return;let action=el.dataset.a,k=Number(el.dataset.k)||0;
switch(action){case"tab":setTab(el.dataset.tab);break;case"unit":unit(k);break;case"unlock":unlock(k);break;case"hero":summonHero();break;case"magic":cast(k);break;case"buy":purchase(el.dataset.id);break;case"select":choose(k);break;case"evolve":evolve();break;case"claim":daily();break;case"start":case"newbattle":begin();break;case"close":closeModal();break;case"mode":if(G.playing){toast("Сначала закончи битву");break;}G.mode=G.mode==="story"?"arena":"story";render();toast(G.mode==="story"?"Режим «Поход»":"Режим «Арена»");break;case"pause":G.paused=!G.paused;renderBattle();break;case"speed":G.speed=G.speed===1?2:1;renderBattle();break;case"help":showHelp();break;case"export":backup();break;case"import":restore();break;}
});
function frame(now){let dt=Math.min(.045,(now-last)/1000||.016);last=now;if(!G.paused){for(let i=0;i<G.speed;i++)tick(dt);}draw();uiTimer+=dt;if(uiTimer>.28){uiTimer=0;if(G.tab==="battle")updateHud();$("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);}requestAnimationFrame(frame);}
function resize(){let d=Math.min(devicePixelRatio||1,2);canvas.width=W*d;canvas.height=H*d;c.setTransform(d,0,0,d,0,0);draw();}
window.addEventListener("pagehide",save);document.addEventListener("visibilitychange",()=>{if(document.hidden)save();});window.addEventListener("resize",resize);
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;render();resize();requestAnimationFrame(frame);
if(S.first){S.first=false;save();setTimeout(showHelp,750);}
})();