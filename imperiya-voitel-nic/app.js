(function(){
"use strict";
const $=id=>document.getElementById(id);
const KEY="queen_empire_offline_v2";
const AGES=[
{title:"Дикие луны",era:"Эпоха 1 · Изумрудные земли",sky:["#78bdce","#d9eef0","#63a989"],icon:"🌿",units:[["Амазонка","⚔️"],["Охотница","🏹"],["Всадница","🐆"]]},
{title:"Золотые сады",era:"Эпоха 2 · Царство цветов",sky:["#88b3bd","#efdfc9","#8caf86"],icon:"🌸",units:[["Хранительница","🗡️"],["Фея-стрелок","🪄"],["Лесная королева","🦌"]]},
{title:"Бронзовая корона",era:"Эпоха 3 · Древние легенды",sky:["#c0af99","#f2d8ae","#bd9e74"],icon:"🏛️",units:[["Легионерка","🛡️"],["Лучница","🏹"],["Царица львов","🦁"]]},
{title:"Бархат и порох",era:"Эпоха 4 · Королевские дворцы",sky:["#8c9fa2","#decab4","#647b7c"],icon:"🏰",units:[["Дуэлянтка","🗡️"],["Мушкетёрша","🎯"],["Герцогиня","💣"]]},
{title:"Стальные города",era:"Эпоха 5 · Индустриальный мир",sky:["#647c8d","#bdc6bf","#5f8792"],icon:"⚙️",units:[["Защитница","🔧"],["Снайперша","🎯"],["Меха-пилот","🤖"]]},
{title:"Неоновая ночь",era:"Эпоха 6 · Город будущего",sky:["#28465f","#699db1","#3e7182"],icon:"🌃",units:[["Кибер-ниндзя","⚡"],["Техноведьма","🔮"],["Робо-амазонка","🦾"]]},
{title:"Звёздные троны",era:"Эпоха 7 · Галактическая империя",sky:["#1b3554","#477d95","#294e74"],icon:"🌌",units:[["Астрорыцарь","🪐"],["Лазерная леди","✨"],["Королева комет","🚀"]]}
];
const NAMES=["Астра","Мира","Селена","Ника","Виктория","Лея","Роксана","Эсмеральда","София","Ирис","Кассиопея","Рубина","Аврора","Тамира","Вега","Мелисса","Кира","Аделина"];
const HAIRS=["#332136","#e9c38c","#832942","#28223e","#b36944","#14172e","#ecd2a5","#a44a5c","#6a412c","#222a45","#b88b63","#e8bc68","#793975","#2f1e27","#e9c5b1","#975041","#2e2039","#db9dbf"];
const SKINS=["#f1ba99","#b88469","#f0c7a7","#bd7b5d","#d69a7f","#edb69b","#c78c71","#e6ab8b","#ac7058","#f0c9ae","#d9a282","#c98c72"];
const COLORS=["#0b5967","#c16a44","#417c68","#c18d48","#ac4d61","#2d6288","#56836a","#ad6456","#3e5981","#4e7164","#92624d","#385c70","#c07b4b","#5b7f77","#7f515d","#bf8c56","#316a74","#ad6859"];
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
["chest","🎁","Сундук фортуны","Случайные монеты или кристаллы","coins",165],
["cardChest","🎴","Сундук боевых карт","Открывает случайную карту усиления","coins",140]
];
const CARDS=[
["Корона рассвета","👑","Урон армии +8%","attack",.08,"Королевская"],
["Сердце стали","🛡️","Здоровье армии +10%","health",.10,"Редкая"],
["Сад изобилия","🍎","Еда +0,35 в секунду","food",.35,"Обычная"],
["Жемчужный трон","🏰","Прочность крепости +12%","base",.12,"Редкая"],
["Золотая монета","🪙","Больше монет за победы +12%","coins",.12,"Обычная"],
["Звёздный знак","✨","Командирша сильнее на 15%","hero",.15,"Эпическая"],
["Медаль дуэлянтки","🗡️","Боец первого типа сильнее на 12%","melee",.12,"Редкая"],
["Лунный лук","🏹","Лучницы наносят больше урона +14%","ranged",.14,"Редкая"],
["Печать титанов","🦁","Тяжёлые войска сильнее на 15%","heavy",.15,"Эпическая"],
["Рубин королевы","💎","Магия метеоров +20%","meteors",.20,"Эпическая"],
["Сапфир исцеления","💠","Сила лечения +22%","healing",.22,"Редкая"],
["Кристалл времени","⏳","Все войска идут на 9% быстрее","speed",.09,"Легендарная"]
];
function cardBonus(type){let sum=0;const deck=Array.isArray(S.deck)?S.deck:[];const seen=new Set();deck.forEach(i=>{if(seen.has(i)||!Number.isInteger(i)||i<0||i>=CARDS.length)return;seen.add(i);const level=Math.max(0,Math.min(5,Number(S.cards[i])||0));if(CARDS[i][3]===type)sum+=CARDS[i][4]*(1+.4*Math.max(0,level-1));});return sum;}
function drawCard(){const weights=[0,1,2,3,4,5,6,7,8,9,10,11],roll=Math.random(),pick=weights[Math.floor(Math.pow(roll,1.45)*weights.length)];S.cards[pick]=Math.min(5,(S.cards[pick]||0)+1);return CARDS[pick][1]+" "+CARDS[pick][0]+(S.cards[pick]>1?" · уровень "+S.cards[pick]:"");}
function equipCard(i){if(!S.cards[i])return toast("Сначала открой карту");let slot=Math.max(0,Math.min(2,G.deckSlot||0));const old=S.deck.indexOf(i);if(old===slot)return toast("Карта уже установлена");if(old>=0){const other=S.deck[slot];S.deck[old]=other;}S.deck[slot]=i;G.deckSlot=(slot+1)%3;save();render();toast("Усиление добавлено в колоду");}
function cardPage(){let out=listHead("Колода королев","Собирай карты в сундуках, повышай их уровень и устанавливай до трёх постоянных усилений. Эффекты работают в каждом бою.");
out+='<div class="sectionname"><b>БОЕВАЯ КОЛОДА</b><small>Выбери ячейку для карты</small></div><div class="deckslots">';
for(let j=0;j<3;j++){const id=S.deck[j],card=CARDS[id];out+='<button data-a="deckslot" data-k="'+j+'" class="deckslot '+(j===G.deckSlot?"chosen":"")+'"><small>Ячейка '+(j+1)+'</small><span>'+(card?card[1]:"＋")+'</span><strong>'+(card?card[0]:"Пусто")+'</strong></button>';}
out+='</div><div class="sectionname"><b>КОЛЛЕКЦИЯ КАРТ</b><small>'+S.cards.filter(x=>x>0).length+' / '+CARDS.length+'</small></div><div class="grid2">';
CARDS.forEach((x,i)=>{let level=S.cards[i]||0,chosen=S.deck.includes(i);out+='<div class="tile cardtile '+(chosen?"equipped":"")+'"><span class="rarity">'+x[5]+'</span><div class="cardicon">'+x[1]+'</div><strong>'+x[0]+'</strong><p>'+x[2]+(level?' · уровень '+level:'')+'</p><button data-a="equip" data-k="'+i+'">'+(chosen?"↔ Переставить":level?"В колоду":"🔒 Не открыта")+'</button></div>';});out+='</div><button data-a="buy" data-id="cardChest" class="go">🎴 Купить сундук карт · 🪙 140</button>';return out;}
function dungeonPage(){let out=listHead("Башня королев","Особый режим с более сильными врагами, боссами и коллекционными картами. Проходи этажи, собирай трофеи и улучшай свою колоду.");
out+='<div class="dungeon-intro"><div class="dungeon-visual"><span>🏯</span><div class="halo"></div></div><div><small>ТЕКУЩЕЕ ИСПЫТАНИЕ</small><h3>Этаж '+S.dungeonFloor+'</h3><p>Босс-страж, волны противниц и награда за победу.</p></div></div>';
out+='<div class="grid2"><div class="tile"><div class="icon">🎴</div><strong>Карты усиления</strong><p>Одна случайная карта за каждую победу в башне</p></div><div class="tile"><div class="icon">💎</div><strong>+25 кристаллов</strong><p>Награда за этаж; сложность постепенно растёт</p></div></div><button class="go" data-a="dungeon" style="margin:15px 0;width:100%">⚔️ ВОЙТИ В БАШНЮ</button><button class="chip" data-a="tab" data-tab="cards" style="width:100%">Посмотреть колоду карт</button>';
return out;}

function defaults(){return {coins:180,gems:85,era:0,stage:1,timeline:1,food:0,base:0,attack:0,vital:0,income:0,auto:false,skin:0,relic:0,magic:[0,1,2],loadout:[0,1,2],units:[1,0,0],hero:0,heroes:[0],wins:0,losses:0,kills:0,deployed:0,claimed:"",first:true,cards:[1,1,1,0,0,0,0,0,0,0,0,0],deck:[0,1,2],dungeonFloor:1,dungeonWins:0,bossWins:0};}
let S=defaults();try{const data=JSON.parse(localStorage.getItem(KEY)||"null");if(data&&typeof data==="object")S=Object.assign(defaults(),data);}catch(e){}
S.era=Math.max(0,Math.min(6,Number(S.era)||0));S.stage=Math.max(1,Math.min(6,Number(S.stage)||1));
if(!Array.isArray(S.units))S.units=[1,0,0];if(!Array.isArray(S.heroes))S.heroes=[0];if(!Array.isArray(S.magic))S.magic=[0,1,2];if(!Array.isArray(S.loadout))S.loadout=[0,1,2];if(!Array.isArray(S.cards))S.cards=[1,1,1,0,0,0,0,0,0,0,0,0];if(!Array.isArray(S.deck))S.deck=[0,1,2];S.cards=S.cards.slice(0,CARDS.length).map(x=>Math.max(0,Math.min(5,Number(x)||0)));while(S.cards.length<CARDS.length)S.cards.push(0);S.deck=S.deck.slice(0,3).filter(i=>Number.isInteger(i)&&i>=0&&i<CARDS.length&&S.cards[i]>0);while(S.deck.length<3){let next=S.cards.findIndex((x,i)=>x>0&&!S.deck.includes(i));if(next<0)break;S.deck.push(next);}S.dungeonFloor=Math.max(1,Math.min(1000,Number(S.dungeonFloor)||1));
const G={tab:"battle",mode:"story",playing:false,done:false,paused:false,speed:1,time:0,food:12,base:450,baseMax:450,enemy:450,enemyMax:450,troops:[],particles:[],queue:[],next:0,used:{},heroUsed:false,frozen:0,raging:0,dead:0,damage:0,autoWait:0,deckSlot:0,bossSpawned:false,bossBeaten:false,bossPulse:12,battleMessage:"",battleMessageTime:0,shake:0};
const canvas=$("canvas"),c=canvas.getContext("2d");
let last=0,uiTimer=0,saveTimer=0,toastTimer=0;const W=390,H=300;
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+"м":n>=1000?(n/1000).toFixed(1)+"к":String(Math.floor(n));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2350);}
const a=()=>AGES[S.era],foodRate=()=>2.25+S.food*.55+S.era*.11+cardBonus("food");
const cost=k=>[8,18,40][k]+S.era*2+(S.timeline-1)*3;
const baseHP=()=>Math.round((450+S.base*110+S.era*55+S.relic*55)*(1+cardBonus("base")));
const attackPower=side=>side==="p"?(1+S.attack*.17+S.relic*.11+cardBonus("attack")):(1+(S.stage-1)*.13+S.era*.13+(S.timeline-1)*.15);
const healthPower=side=>side==="p"?(1+S.vital*.18+S.relic*.07+cardBonus("health")):(1+(S.stage-1)*.13+S.era*.12+(S.timeline-1)*.15);
const enemyHP=()=>Math.round((460+(S.stage-1)*130)*Math.pow(1.25,S.era)*Math.pow(1.55,S.timeline-1)*(G.mode==="arena"?1.55:G.mode==="dungeon"?(1.5+Math.min(5,S.dungeonFloor*.13)):1));
const color=id=>COLORS[(id+S.skin*3)%COLORS.length];
function heroSvg(id){return window.QueenArt.portrait(id);}
function champ(){return '<div class="portrait">'+heroSvg(S.hero)+'</div><div class="champtext"><label>ВЕРХОВНАЯ КОМАНДИРША</label><strong>'+NAMES[S.hero]+'</strong><small>'+a().title+' · реликвии '+S.relic+'</small></div><button class="chip" data-a="tab" data-tab="heroes">Героини ›</button>';}
function rect(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
function backdrop(){
const shades=a().sky,sky=c.createLinearGradient(0,0,0,H);
sky.addColorStop(0,shades[0]);sky.addColorStop(.54,shades[1]);sky.addColorStop(1,shades[2]);c.fillStyle=sky;c.fillRect(0,0,W,H);
c.save();
const futuristic=S.era>=4,galaxy=S.era===6;
if(!futuristic){
c.fillStyle="#fff8e7b4";c.beginPath();c.arc(292,69,26,0,7);c.fill();
c.fillStyle="#fffef07d";c.beginPath();c.arc(292,69,42,0,7);c.fill();
for(let i=0;i<4;i++){let x=(i*131+45)%390,y=33+(i%2)*37;c.fillStyle="#f5fcf380";c.beginPath();c.ellipse(x,y,38,8,-.1,0,7);c.ellipse(x+18,y-8,27,12,.2,0,7);c.fill();}
}else{
for(let i=0;i<36;i++){let x=(i*89+23)%390,y=(i*47+7)%179;c.fillStyle=i%4?"#ffffff79":"#fff2b9bd";c.beginPath();c.arc(x,y,1+i%3*.4,0,7);c.fill();}
if(galaxy){c.strokeStyle="#b9e5ff8a";c.lineWidth=3;c.beginPath();c.ellipse(230,83,95,23,-.16,0,7);c.stroke();c.fillStyle="#92bfd0";c.beginPath();c.arc(230,83,27,0,7);c.fill();}
}
function hill(y,color,amplitude,shift){c.beginPath();c.moveTo(0,y);for(let x=0;x<=420;x+=12)c.lineTo(x,y-amplitude*Math.sin((x+shift)/55)-amplitude*.32*Math.cos((x+shift)/24));c.lineTo(390,300);c.lineTo(0,300);c.closePath();c.fillStyle=color;c.fill();}
hill(153,S.era===2?"#c1ae8d8f":"#517f869e",18,50);
hill(185,S.era===2?"#a68b68d0":"#578788b6",13,130);
hill(218,S.era===2?"#8a795bbd":"#356e68cc",9,70);
if(S.era<2){
for(let i=0;i<7;i++){
let x=i*67+12,y=191+(i%2)*18;
c.strokeStyle="#355954";c.lineWidth=6;c.beginPath();c.moveTo(x,y+22);c.lineTo(x+2,y-20);c.stroke();
for(let j=0;j<3;j++){c.fillStyle=["#2d8068","#559877","#8db78b"][j];c.beginPath();c.ellipse(x-12+j*12,y-14+(j%2)*8,15,23,-.18,0,7);c.fill();}
c.fillStyle="#d4bd93";c.beginPath();c.arc(x+1,y-16,3,0,7);c.fill();}
}else if(S.era<4){
for(let i=0;i<5;i++){let x=25+i*86,y=212;c.fillStyle="#e8d0a9";c.fillRect(x-3,y-43,10,46);c.fillStyle="#8b8174";c.fillRect(x-8,y-47,18,7);c.fillRect(x-9,y-4,20,5);c.strokeStyle="#d6b17a";c.beginPath();c.moveTo(x-15,y-50);c.lineTo(x+15,y-50);c.stroke();}
}else{
for(let i=0;i<10;i++){
let x=i*47-9,h=47+(i*27)%70;
c.fillStyle=S.era===4?"#345866":"#153c59";c.fillRect(x,219-h,36,h);
c.fillStyle="#f7e2b884";
for(let row=0;row<4;row++)for(let col=0;col<3;col++)c.fillRect(x+6+col*10,225-h+row*11,4,6);
c.strokeStyle="#84d6d98a";c.beginPath();c.moveTo(x,219-h);c.lineTo(x+36,219-h);c.stroke();
}}
c.fillStyle=S.era===2?"#c9aa81":"#a6b8a4";c.fillRect(0,224,390,76);
const road=c.createLinearGradient(0,229,0,300);
road.addColorStop(0,S.era===2?"#dbbd93":"#c4ae91");road.addColorStop(1,S.era===2?"#ab886a":"#8f856e");
c.fillStyle=road;c.beginPath();c.moveTo(0,236);c.quadraticCurveTo(195,223,390,236);c.lineTo(390,300);c.lineTo(0,300);c.closePath();c.fill();
c.strokeStyle="#f8e6ba9c";c.lineWidth=2;c.beginPath();c.moveTo(0,238);c.quadraticCurveTo(195,226,390,238);c.stroke();
for(let i=0;i<17;i++){let xx=(i*61+17)%390,yy=246+(i*19)%50;c.strokeStyle=i%2?"#6b66558a":"#d7bea18a";c.lineWidth=1.7;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+9,yy+1);c.stroke();}
for(let i=0;i<13;i++){let xx=(i*43+7)%390,yy=217+(i*7)%16;c.fillStyle=i%2?"#f5e4ad":"#e7b1a4";c.beginPath();c.arc(xx,yy,1.8,0,7);c.fill();}
if(S.era===5){c.fillStyle="#8be0e51c";for(let i=0;i<6;i++)c.fillRect(i*75,243,24,1);}
c.restore();
}
function castle(x,enemy){
c.save();c.translate(x,0);if(enemy)c.scale(-1,1);
const stone=enemy?"#315867":"#f0ddbe",dark=enemy?"#153c4d":"#8f846f",accent=enemy?"#d58172":"#0b7477";
c.fillStyle="#15343a6a";c.beginPath();c.ellipse(0,233,37,7,0,0,7);c.fill();
const side=c.createLinearGradient(-33,0,34,0);side.addColorStop(0,dark);side.addColorStop(.25,stone);side.addColorStop(.78,stone);side.addColorStop(1,dark);
c.fillStyle=side;c.beginPath();c.moveTo(-30,229);c.lineTo(-30,172);c.lineTo(-37,172);c.lineTo(-32,151);c.lineTo(-14,151);c.lineTo(-9,166);c.lineTo(11,166);c.lineTo(16,146);c.lineTo(32,146);c.lineTo(37,169);c.lineTo(28,169);c.lineTo(29,229);c.closePath();c.fill();c.lineWidth=1.7;c.strokeStyle=enemy?"#a6c5bd":"#ffe4b1";c.stroke();
c.fillStyle=dark;c.fillRect(-10,194,20,35);c.fillStyle="#081d25";c.beginPath();c.arc(0,196,10,Math.PI,0);c.fill();
for(let j=0;j<2;j++){let xx=j?17:-25;c.fillStyle=accent;c.fillRect(xx,182,8,13);c.strokeStyle="#f2d2a4";c.lineWidth=1.5;c.strokeRect(xx,182,8,13);}
c.fillStyle=enemy?"#eab5a3":"#f8d7a1";c.beginPath();c.moveTo(-34,154);c.lineTo(-25,140);c.lineTo(-12,154);c.moveTo(11,150);c.lineTo(23,135);c.lineTo(35,150);c.fill();
c.strokeStyle="#e9c891";c.lineWidth=2.5;c.beginPath();c.moveTo(4,162);c.lineTo(4,127);c.stroke();
c.fillStyle=accent;c.beginPath();c.moveTo(5,128);c.quadraticCurveTo(26,121,31,131);c.lineTo(5,143);c.closePath();c.fill();
c.fillStyle="#fff5d5";c.beginPath();c.arc(4,172,5,0,7);c.fill();c.restore();
}
function soldier(t){window.QueenArt.draw(c,t,S.era,G.time,S.skin);}
function draw(){if(!c)return;c.clearRect(0,0,W,H);c.save();if(G.shake>0)c.translate((Math.random()-.5)*G.shake*8,(Math.random()-.5)*G.shake*4);backdrop();castle(28,false);castle(361,true);
if(!G.playing&&!G.done){rect(60,77,270,65,15,"#0b303cdd","#f9dfae");c.textAlign="center";c.fillStyle="#ffebd6";c.font="bold 19px Georgia";c.fillText("Время королев",195,103);c.fillStyle="#dbe9df";c.font="12px sans-serif";c.fillText("Начни поход и завоюй эпохи",195,125);c.textAlign="left";}
G.troops.slice().sort((x,y)=>x.y-y.y).forEach(soldier);
G.particles.forEach(p=>{c.globalAlpha=Math.max(0,Math.min(1,p.life*2));c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,p.radius,0,7);c.fill();});c.globalAlpha=1;if(G.frozen>0){c.fillStyle="#cdeaff18";c.fillRect(0,0,W,H);}c.restore();
}
function sparkle(x,y,color,n){for(let i=0;i<n;i++)G.particles.push({x,y,vx:(Math.random()-.5)*100,vy:(Math.random()-.8)*85,life:.3+Math.random()*.5,color,radius:1+Math.random()*2.5});if(G.particles.length>250)G.particles.splice(0,80);}
function waves(){
let arr=[],at=3.2;
const dungeon=G.mode==="dungeon",boss=dungeon||S.stage>=5;
if(boss)arr.push({at:dungeon?5:12,k:2,boss:true});
let amount=dungeon?2:3;
for(let wave=0;wave<amount;wave++){
let count=3+wave*2+Math.min(3,S.stage-1)+(dungeon?Math.min(4,Math.ceil(S.dungeonFloor/2)):0);
for(let i=0;i<count;i++){arr.push({at,k:i===count-1&&wave>0?2:(i+wave)%4===0?1:0});at+=2.7+Math.random()*.55;}
at+=7;
}
return arr.sort((x,y)=>x.at-y.at);
}
function createTroop(side,k,hero,boss=false){
const stat=[{hp:84,damage:14,speed:30,range:23,rate:.88},{hp:49,damage:14,speed:23,range:96,rate:1.29},{hp:220,damage:35,speed:15,range:28,rate:1.55}][k];
const hid=hero==null?side==="p"?(S.deployed+Math.floor(Math.random()*5))%18:(Math.floor(Math.random()*17)+3)%18:hero;
const extra=side==="p"?(1+(k===0?cardBonus("melee"):k===1?cardBonus("ranged"):cardBonus("heavy"))):1;
const bossScale=boss?(G.mode==="dungeon"?4.5+Math.min(5,S.dungeonFloor*.22):3.8):1;
const hp=stat.hp*healthPower(side)*(hero==null?1:2.5)*bossScale;
const t={side,k,hid,x:side==="p"?49:342,y:235+Math.random()*14,hp,max:hp,damage:stat.damage*attackPower(side)*(hero==null?1+cardBonus("hero"):2*(1+cardBonus("hero")))*extra*(boss?2.8:1),speed:stat.speed*(side==="p"?1+cardBonus("speed"):1)*(boss?.79:1),range:stat.range,rate:stat.rate*(boss?1.1:1),cd:Math.random()*.5,elite:hero!=null||boss,boss,seed:Math.random()*10};
G.troops.push(t);if(side==="p"){S.deployed++;saveTimer=1;}if(boss){G.bossSpawned=true;G.bossPulse=13;G.battleMessage="На поле вышла предводительница врага!";G.battleMessageTime=3;}
return t;
}
function begin(){G.playing=true;G.done=false;G.paused=false;G.time=0;G.food=12;G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;G.troops=[];G.particles=[];G.queue=waves();G.next=0;G.used={};G.heroUsed=false;G.frozen=0;G.raging=0;G.dead=0;G.damage=0;G.autoWait=0;G.bossSpawned=false;G.bossBeaten=false;G.bossPulse=14;G.battleMessage="";G.battleMessageTime=0;G.shake=0;closeModal();render();}
function complete(won){
if(G.done)return;
G.playing=false;G.done=true;
let reward=Math.round((won?195:65)*(1+(S.stage-1)*.2+S.era*.36)*(1+S.income*.18+cardBonus("coins"))*(G.mode==="arena"?1.3:G.mode==="dungeon"?1.45:1));
let gems=won?(G.mode==="arena"?18:G.mode==="dungeon"?25:8):0;
S.coins+=reward;S.gems+=gems;
let bonusText="";
if(won){
S.wins++;
if(G.mode==="story"&&S.stage<6)S.stage++;
if(G.bossBeaten)S.bossWins++;
if(G.mode==="dungeon"){S.dungeonWins++;S.dungeonFloor++;bonusText=drawCard();}else if(G.bossBeaten||G.mode==="arena"&&Math.random()<.3){bonusText=drawCard();}
}else S.losses++;
save();
$("modal").hidden=false;
let msg=won?"Победа воительниц!":"Армия отступила";
$("modal").innerHTML='<div class="modalbox"><div class="big">'+(won?"🏆":"🛡️")+'</div><h2>'+msg+'</h2><p>'+(won&&G.mode==="dungeon"?"Этаж башни пройден. В награду ты получила новую карту!":won&&S.stage===6?"Эпоха покорена. Теперь можно перейти в новую эпоху.":"Улучши войска и отправляйся в новый поход.")+'</p><p style="font-size:20px;color:#ffe0a0;font-weight:950">🪙 +'+fmt(reward)+'　💎 +'+gems+'</p>'+(bonusText?'<div class="reward-card">🎴 '+bonusText+'</div>':'')+'<button class="go" data-a="newbattle">Продолжить</button><button class="chip" style="margin-top:10px" data-a="tab" data-tab="cards">Моя колода</button></div>';
render();
}
function tick(dt){
G.particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=150*dt;p.life-=dt;});G.particles=G.particles.filter(p=>p.life>0);
if(!G.playing||G.done||G.paused)return;G.time+=dt;G.food=Math.min(130,G.food+foodRate()*dt);G.frozen=Math.max(0,G.frozen-dt);G.raging=Math.max(0,G.raging-dt);G.shake=Math.max(0,G.shake-dt);G.battleMessageTime=Math.max(0,G.battleMessageTime-dt);
if(G.next<G.queue.length&&G.time>=G.queue[G.next].at){const w=G.queue[G.next];createTroop("e",w.k,null,!!w.boss);G.next++;}
if(S.auto){G.autoWait+=dt;if(G.autoWait>=8&&G.food>=cost(0)){G.autoWait=0;G.food-=cost(0);createTroop("p",0,null);}}
const boss=G.troops.find(t=>t.boss&&t.hp>0);
if(boss&&G.frozen<=0){G.bossPulse-=dt;if(G.bossPulse<=0){G.bossPulse=13;G.shake=.5;for(const ally of G.troops){if(ally.side==="p"){ally.hp-=boss.damage*.42;sparkle(ally.x,ally.y-55,"#edb777",9);}}G.base-=boss.damage*.35;G.battleMessage="Особая атака босса!";G.battleMessageTime=2.4;}}
for(const t of G.troops){if(t.hp<=0)continue;t.cd-=dt;let nearest=null,dist=1e6;for(const e of G.troops){if(e.hp>0&&e.side!==t.side){let d=Math.abs(e.x-t.x);if(d<dist){nearest=e;dist=d;}}}
let direction=t.side==="p"?1:-1,baseDistance=t.side==="p"?361-t.x:t.x-28,target=nearest&&dist<baseDistance+4?nearest:null;
if(!(target?dist<t.range:baseDistance<t.range)){if(t.side==="e"&&G.frozen>0)continue;t.x+=t.speed*dt*direction;t.x=Math.max(28,Math.min(361,t.x));continue;}
if(t.cd<=0&&(t.side==="p"||G.frozen<=0)){t.cd=t.rate;let dmg=t.damage*(t.side==="p"&&G.raging>0?1.6:1)*(Math.random()<.08?1.6:1);if(target){target.hp-=dmg;sparkle(target.x,target.y-30,t.side==="p"?"#ffc0d0":"#a6d0ff",t.k===1?6:3);}
else if(t.side==="p"){G.enemy-=dmg*.8;G.damage+=dmg*.8;sparkle(359,190,"#ffe6ba",3);}
else{G.base-=dmg*.8;sparkle(29,190,"#bcd8ff",3);}}}
for(let i=G.troops.length-1;i>=0;i--){let dead=G.troops[i];if(dead.hp<=0){sparkle(dead.x,dead.y-28,dead.side==="e"?"#ffc3b1":"#eb9bd9",dead.boss?28:10);if(dead.boss){G.bossBeaten=true;G.battleMessage="Вражеская предводительница повержена!";G.battleMessageTime=3;}if(dead.side==="e"){S.coins+=Math.round((9+dead.k*12)*(1+S.income*.16)*(dead.boss?8:1));S.kills++;G.dead++;G.food=Math.min(130,G.food+(dead.boss?20:3));}G.troops.splice(i,1);}}
if(G.enemy<=0&&(!G.bossSpawned||G.bossBeaten))return complete(true);if(G.enemy<=0)G.enemy=1;if(G.base<=0)return complete(false);if(G.time>=275)return complete(G.enemy<G.enemyMax*.3);
saveTimer+=dt;if(saveTimer>=10){saveTimer=0;save();}}
function unit(k){if(!G.playing)return toast("Сначала начни битву");if(!S.units[k])return toast("Открой отряд в развитии");if(G.food<cost(k))return toast("Недостаточно еды");G.food-=cost(k);createTroop("p",k,null);renderBattle();}
function summonHero(){if(!G.playing)return toast("Сначала начни битву");if(G.heroUsed)return toast("Героиня уже призвана");G.heroUsed=true;createTroop("p",S.units[2]?2:S.units[1]?1:0,S.hero);toast(NAMES[S.hero]+" вступила в бой!");renderBattle();}
function cast(k){if(!G.playing)return toast("Сначала начни битву");if(G.used[k])return toast("Эти чары уже использованы");if(!S.loadout.includes(k))return toast("Выбери заклинание в магазине");G.used[k]=true;
if(k===0){G.frozen=5;toast("Враги заморожены!");}
if(k===1){for(const t of G.troops)if(t.side==="e"){t.hp-=76*attackPower("p")*(1+cardBonus("meteors"));sparkle(t.x,t.y-30,"#fce9e8",10);}G.enemy-=40*attackPower("p");toast("Метеорный дождь!");}
if(k===2){G.base=Math.min(G.baseMax,G.base+140*(1+cardBonus("healing")));for(const t of G.troops)if(t.side==="p")t.hp=Math.min(t.max,t.hp+t.max*(.5+cardBonus("healing")));toast("Армия исцелена!");}
if(k===3){G.raging=12;toast("Боевая ярость!");}
if(k===4){for(const t of G.troops)if(t.side==="e"){t.x=Math.min(359,t.x+48);t.hp-=20;}toast("Врагов отбросило!");}
if(k===5){let u=G.troops.find(t=>t.side==="p");createTroop("p",u?u.k:0,S.hero);createTroop("p",u?u.k:0,S.hero);toast("Двойники призваны!");}renderBattle();}
function renderNav(){const tabs=[["battle","⚔️","Битва"],["army","🏰","Армия"],["heroes","👸","Героини"],["shop","🛍️","Магазин"],["other","🌟","Ещё"]];$("nav").innerHTML=tabs.map(t=>'<button data-a="tab" data-tab="'+t[0]+'" class="'+(G.tab===t[0]||(t[0]==="other"&&(G.tab==="cards"||G.tab==="dungeon"))?"active":"")+'"><span>'+t[1]+'</span>'+t[2]+'</button>').join("");}
function renderBattle(){
$("eraText").textContent=a().era+" · Линия "+S.timeline;$("eraName").textContent=a().title;$("modeBtn").textContent=G.mode==="story"?"Поход ⟳":G.mode==="arena"?"Арена ⟳":"Башня ⟳";
$("topchip").innerHTML='<span>'+(G.mode==="dungeon"?"🏯 Этаж "+S.dungeonFloor:"⚔️ Битва "+Math.min(5,S.stage)+" / 5")+'</span><span>⏱ '+Math.floor(G.time)+' с</span><span>⚔️ '+G.dead+'</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";
$("units").innerHTML=a().units.map((t,k)=>'<button class="unit" data-a="'+(S.units[k]?"unit":"unlock")+'" data-k="'+k+'"><span class="art">'+window.QueenArt.figureSvg((S.era*3+k*5+4)%18,k,S.era,false,S.skin)+'</span><strong>'+t[0]+'</strong><span class="cost">'+(S.units[k]?"🍎 "+cost(k):"🔒 Открыть")+'</span></button>').join("");
$("spells").innerHTML=S.loadout.slice(0,3).map(k=>'<button class="spell" '+(G.used[k]||!G.playing?"disabled":"")+' data-a="magic" data-k="'+k+'"><span>'+MAGICS[k][1]+'</span><small>'+MAGICS[k][0]+'</small></button>').join("")+'<button class="spell" '+(G.heroUsed||!G.playing?"disabled":"")+' data-a="hero"><span>👸</span><small>'+NAMES[S.hero]+'</small></button>';
$("fightaction").innerHTML=(!G.playing)?'<button class="go" data-a="start">⚔️ НАЧАТЬ БИТВУ</button>':G.playing?'<div style="display:flex;gap:8px;margin:10px 12px"><button class="chip" style="flex:1" data-a="speed">⏩ Скорость ×'+G.speed+'</button><button class="chip" style="flex:1" data-a="pause">'+(G.paused?"▶ Продолжить":"Ⅱ Пауза")+'</button></div>':"";
$("hint").textContent=G.playing?"Призывай воительниц, используй чары и побеждай":G.mode==="dungeon"?"Башня королев: победа приносит новую карту":S.stage===6?"Эпоха пройдена — переходи в «Армию»":"Побеждай, улучшай армию и открывай эпохи";}

function updateBossBar(){
const boss=G.troops.find(t=>t.boss&&t.hp>0),bar=$("bossbar"),notice=$("battleAlert");
bar.hidden=!boss;
if(boss)bar.innerHTML='<strong>👑 БОСС</strong><div class="boss-track"><i style="width:'+Math.max(0,Math.round(boss.hp/boss.max*100))+'%"></i></div><span>'+Math.max(0,Math.floor(boss.hp/boss.max*100))+'%</span>';
notice.hidden=!(G.battleMessageTime>0);if(!notice.hidden)notice.textContent=G.battleMessage;
}
function updateHud(){
$("topchip").innerHTML='<span>'+(G.mode==="dungeon"?"🏯 Этаж "+S.dungeonFloor:"⚔️ Битва "+Math.min(5,S.stage)+" / 5")+'</span><span>⏱ '+Math.floor(G.time)+' с</span><span>⚔️ '+G.dead+'</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";updateBossBar();
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
v+='<div class="tile"><div class="icon">'+icon+'</div><strong>'+name+'</strong><p>'+desc+'</p><button data-a="buy" data-id="'+id+'">'+(owned?(id.startsWith("magic")?"Выбрать чары":"✓ Куплено"):(currency==="gems"?"💎 ":"🪙 ")+fmt(levelPrice(id)))+'</button></div>';}v+='</div>';
v+='<hr class="divider">'+listHead("Глянцевые гардеробы","Наряды меняют окраску армий и героинь. Открыто коллекций: "+S.skin+". Реликвии усиливают воительниц: "+S.relic+".");return v;}
function other(){let date=new Date().toLocaleDateString("sv-SE"),claimed=S.claimed===date;let v=listHead("Хроники королев","Игра работает на iPhone без Интернета после первого открытия. Прогресс сохраняется локально.");
v+='<div class="grid2"><div class="tile"><div class="icon">🏆</div><strong>'+S.wins+' побед</strong><p>Победы в битвах</p></div><div class="tile"><div class="icon">👸</div><strong>'+S.heroes.length+' героинь</strong><p>Открытые персонажи</p></div><div class="tile"><div class="icon">⚔️</div><strong>'+S.kills+' врагов</strong><p>Побеждены в боях</p></div><div class="tile"><div class="icon">🌍</div><strong>'+S.timeline+' линия</strong><p>Цикл семи эпох</p></div></div>';
v+='<div class="sectionname"><b>НОВЫЕ ПРИКЛЮЧЕНИЯ</b></div><div class="featurebuttons"><button data-a="tab" data-tab="cards"><b>🎴 Колода королев</b><small>12 карт, три усиления</small></button><button data-a="tab" data-tab="dungeon"><b>🏯 Башня королев</b><small>Боссы, этажи и награды</small></button></div>';
v+='<div class="sectionname"><b>ПОДАРОК ДНЯ</b></div><div class="row"><span class="icon">🎁</span><div class="desc"><strong>Королевский подарок</strong><p>Ежедневно: 100 монет и 20 кристаллов</p></div></div><button class="go" style="margin:8px 0;width:100%" data-a="claim">'+(claimed?"✓ Сегодня уже получен":"Получить подарок")+'</button>';
v+='<div class="sectionname"><b>СЕМЬ ЭПОХ</b></div>';AGES.forEach((age,i)=>{v+='<div class="row" style="'+(i===S.era?"border-color:#ffe2a4;":"")+'"><span class="icon">'+age.icon+'</span><div class="desc"><strong>'+age.title+'</strong><p>'+age.units.map(t=>t[0]).join(" · ")+'</p></div>'+(i===S.era?'<b style="font-size:9px;color:#ffd697">СЕЙЧАС</b>':"")+'</div>';});
v+='<hr class="divider">'+listHead("Сохранение и настройки","Данные хранятся только на этом iPhone. Сохраняй резервную копию перед очисткой данных Safari.");
v+='<div class="grid2"><button class="smallgo" data-a="export">📁 Экспорт</button><button class="smallgo" data-a="import">📥 Импорт</button><button class="smallgo" data-a="help">❔ Правила</button><button class="smallgo" data-a="mode">🎮 Режим боя</button></div><p class="micro">Самостоятельная игра в жанре наступательной стратегии. Оригинальные персонажи и оформление, без копирования графики We Are Warriors.</p>';return v;}
function render(){ $("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);$("champ").innerHTML=champ();let battle=G.tab==="battle";$("battlePage").hidden=!battle;$("otherPage").hidden=battle;if(battle)renderBattle();else $("otherPage").innerHTML=G.tab==="army"?army():G.tab==="heroes"?heroes():G.tab==="shop"?shop():G.tab==="cards"?cardPage():G.tab==="dungeon"?dungeonPage():other();renderNav();}
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
else if(id==="cardChest"){let card=drawCard();toast("Новая карта: "+card);}
else if(id==="chest"){if(Math.random()<.3){S.gems+=25;toast("Из сундука: 25 кристаллов!");}else {S.coins+=Math.round(180+Math.random()*220);toast("Сундук полон монет!");}}
save();render();if(id!=="chest")toast("Покупка успешна!");}
function choose(i){if(i<0||i>=18)return;if(!S.heroes.includes(i)){let price=28+i*8;if(S.gems<price)return toast("Недостаточно кристаллов");S.gems-=price;S.heroes.push(i);toast(NAMES[i]+" присоединилась к армии!");}S.hero=i;save();render();}
function evolutionPrice(){return Math.round(400*Math.pow(2.15,S.era)*(1+.25*(S.timeline-1)));}
function evolve(){if(S.stage<6)return toast("Сначала выиграй пять битв");let p=evolutionPrice();if(S.coins<p)return toast("Для эволюции нужно "+fmt(p)+" монет");S.coins-=p;S.era++;if(S.era>=7){S.era=0;S.timeline++;S.gems+=85;}S.stage=1;S.food=0;S.base=0;S.attack=0;S.vital=0;S.income=0;S.units=[1,0,0];G.done=false;G.playing=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;save();setTab("battle");toast("Новая эпоха: "+a().title);}
function daily(){let today=new Date().toLocaleDateString("sv-SE");if(S.claimed===today)return toast("Сегодня уже получено");S.claimed=today;S.coins+=100;S.gems+=20;save();render();toast("Подарок: 100 монет и 20 кристаллов!");}
function backup(){const blob=new Blob([JSON.stringify({app:"queen-empire-offline",version:1,state:S},null,2)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="voitel-nicy-save.json";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),2000);}
function restore(){let input=$("savefile");input.value="";input.onchange=()=>{let file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{let v=JSON.parse(reader.result);if(v.app!=="queen-empire-offline"||!v.state)throw Error("bad");S=Object.assign(defaults(),v.state);if(!Array.isArray(S.heroes)||!Array.isArray(S.units))throw Error("bad");save();G.playing=false;G.done=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;setTab("battle");toast("Сохранение восстановлено");}catch(e){toast("Не удалось прочитать сохранение");}};reader.readAsText(file);};input.click();}
document.addEventListener("click",e=>{let el=e.target.closest("[data-a]");if(!el)return;let action=el.dataset.a,k=Number(el.dataset.k)||0;
switch(action){case"tab":setTab(el.dataset.tab);break;case"deckslot":G.deckSlot=k;render();break;case"equip":equipCard(k);break;case"dungeon":if(G.playing){toast("Закончи текущую битву");break;}G.mode="dungeon";G.done=false;setTab("battle");toast("Башня королев · этаж "+S.dungeonFloor);break;case"unit":unit(k);break;case"unlock":unlock(k);break;case"hero":summonHero();break;case"magic":cast(k);break;case"buy":purchase(el.dataset.id);break;case"select":choose(k);break;case"evolve":evolve();break;case"claim":daily();break;case"start":case"newbattle":begin();break;case"close":closeModal();break;case"mode":if(G.playing){toast("Сначала закончи битву");break;}G.mode=G.mode==="story"?"arena":G.mode==="arena"?"dungeon":"story";G.done=false;render();toast(G.mode==="story"?"Режим «Поход»":G.mode==="arena"?"Режим «Арена»":"Режим «Башня»");break;case"pause":G.paused=!G.paused;renderBattle();break;case"speed":G.speed=G.speed===1?2:1;renderBattle();break;case"help":showHelp();break;case"export":backup();break;case"import":restore();break;}
});
function frame(now){let dt=Math.min(.045,(now-last)/1000||.016);last=now;if(!G.paused){for(let i=0;i<G.speed;i++)tick(dt);}draw();uiTimer+=dt;if(uiTimer>.28){uiTimer=0;if(G.tab==="battle")updateHud();$("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);}requestAnimationFrame(frame);}
function resize(){let d=Math.min(devicePixelRatio||1,2);canvas.width=W*d;canvas.height=H*d;c.setTransform(d,0,0,d,0,0);draw();}
window.addEventListener("pagehide",save);document.addEventListener("visibilitychange",()=>{if(document.hidden)save();});window.addEventListener("resize",resize);
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;render();resize();requestAnimationFrame(frame);
if(S.first){S.first=false;save();setTimeout(showHelp,750);}
})();