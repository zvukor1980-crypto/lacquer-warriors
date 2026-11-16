(function(){
"use strict";
const $=id=>document.getElementById(id);
const KEY="queen_empire_offline_v2";
const AGES=[
{title:"Лунные сады",era:"Эпоха 1 · Изумрудные земли",sky:["#78bdce","#d9eef0","#63a989"],icon:"🌿",units:[["Амазонка","⚔️"],["Охотница","🏹"],["Всадница","🐆"]]},
{title:"Золотые сады",era:"Эпоха 2 · Царство цветов",sky:["#88b3bd","#efdfc9","#8caf86"],icon:"🌸",units:[["Хранительница","🗡️"],["Фея-стрелок","🪄"],["Лесная королева","🦌"]]},
{title:"Бронзовая корона",era:"Эпоха 3 · Древние легенды",sky:["#c0af99","#f2d8ae","#bd9e74"],icon:"🏛️",units:[["Легионерка","🛡️"],["Лучница","🏹"],["Царица львов","🦁"]]},
{title:"Бархат и порох",era:"Эпоха 4 · Королевские дворцы",sky:["#8c9fa2","#decab4","#647b7c"],icon:"🏰",units:[["Дуэлянтка","🗡️"],["Мушкетёрша","🎯"],["Герцогиня","💣"]]},
{title:"Город чудес",era:"Эпоха 5 · Индустриальный мир",sky:["#647c8d","#bdc6bf","#5f8792"],icon:"⚙️",units:[["Защитница","🔧"],["Снайперша","🎯"],["Меха-пилот","🤖"]]},
{title:"Радужные огни",era:"Эпоха 6 · Город будущего",sky:["#28465f","#699db1","#3e7182"],icon:"🌃",units:[["Кибер-ниндзя","⚡"],["Техноведьма","🔮"],["Робо-амазонка","🦾"]]},
{title:"Звёздные дворцы",era:"Эпоха 7 · Галактическая империя",sky:["#1b3554","#477d95","#294e74"],icon:"🌌",units:[["Астрорыцарь","🪐"],["Лазерная леди","✨"],["Королева комет","🚀"]]}
];
const NAMES=["Астра","Мира","Селена","Ника","Виктория","Лея","Роксана","Эсмеральда","София","Ирис","Кассиопея","Рубина","Аврора","Тамира","Вега","Мелисса","Кира","Аделина"];
const HAIRS=["#332136","#e9c38c","#832942","#28223e","#b36944","#14172e","#ecd2a5","#a44a5c","#6a412c","#222a45","#b88b63","#e8bc68","#793975","#2f1e27","#e9c5b1","#975041","#2e2039","#db9dbf"];
const SKINS=["#f1ba99","#b88469","#f0c7a7","#bd7b5d","#d69a7f","#edb69b","#c78c71","#e6ab8b","#ac7058","#f0c9ae","#d9a282","#c98c72"];
const COLORS=["#0b5967","#c16a44","#417c68","#c18d48","#ac4d61","#2d6288","#56836a","#ad6456","#3e5981","#4e7164","#92624d","#385c70","#c07b4b","#5b7f77","#7f515d","#bf8c56","#316a74","#ad6859"];
const MAGICS=[["Ледяные чары","❄️","На 5 секунд замораживает врагов"],["Метеоры","☄️","Поражает всех врагов"],["Лечение","💗","Восстанавливает здоровье"],["Ярость","🔥","Увеличивает урон на 12 секунд"],["Тайфун","🌪️","Отбрасывает врагов назад"],["Двойники","👥","Призывает две копии героини"]];
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


/* The advisor is deliberately deterministic and fully offline: it reads the saved economy,
   progression and live battle conditions; no account, internet or subscription required. */
const MISSIONS=[
{id:"victories",icon:"🏆",name:"Королевский поход",desc:"Выиграй 2 сражения",stat:"wins",target:2,coins:170,gems:8},
{id:"troops",icon:"⚔️",name:"Собери армию",desc:"Призови 10 воительниц",stat:"deployed",target:10,coins:140,gems:5},
{id:"upgrades",icon:"✨",name:"Стань сильнее",desc:"Сделай 2 покупки или открой отряд",stat:"purchases",target:2,coins:200,gems:10}
];
function todayKey(){const d=new Date(),y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");return y+"-"+m+"-"+day;}
function ensureMissions(){
 const day=todayKey();
 if(!S.quests||S.quests.date!==day||!S.quests.base||!Array.isArray(S.quests.claimed)){
   S.quests={date:day,base:{wins:S.wins,deployed:S.deployed,purchases:S.purchases},claimed:[false,false,false]};
   save();
 }
}
function missionProgress(i){ensureMissions();const t=MISSIONS[i];return Math.min(t.target,Math.max(0,(Number(S[t.stat])||0)-(Number(S.quests.base[t.stat])||0)));}
function missionReady(i){ensureMissions();return !S.quests.claimed[i]&&missionProgress(i)>=MISSIONS[i].target;}
function readyMissionIndex(){ensureMissions();return MISSIONS.findIndex((_,i)=>missionReady(i));}
function claimMission(i){
 ensureMissions();
 if(!Number.isInteger(i)||i<0||i>=MISSIONS.length)return;
 if(S.quests.claimed[i])return toast("Эта награда уже получена");
 if(!missionReady(i))return toast("Сначала выполни задание");
 const mission=MISSIONS[i];S.quests.claimed[i]=true;S.coins+=mission.coins;S.gems+=mission.gems;
 save();sfx("win");render();toast("Награда: +"+mission.coins+" монет и +"+mission.gems+" кристаллов");
}
function questBoard(){
 ensureMissions();
 const achieved=MISSIONS.filter((_,i)=>missionProgress(i)>=MISSIONS[i].target).length;
 let html='<section class="missions-board"><div class="missions-heading"><div><small>КОРОЛЕВСКИЕ ПОРУЧЕНИЯ</small><h3>Задания дня</h3></div><b>'+achieved+' / 3</b></div>';
 MISSIONS.forEach((t,i)=>{
  const n=missionProgress(i),done=S.quests.claimed[i];
  html+='<div class="mission"><span class="mission-icon">'+t.icon+'</span><div class="mission-main"><strong>'+t.name+'</strong><small>'+t.desc+' · '+n+'/'+t.target+'</small><div class="mission-meter"><i style="width:'+(n/t.target*100)+'%"></i></div></div><button data-a="claimquest" data-k="'+i+'" '+(done||n<t.target?'disabled':'')+'>'+(done?'✓ Готово':n>=t.target?'Получить':'🪙 '+t.coins)+'</button></div>';
 });
 return html+'</section>';
}
function nextAdvice(){
 ensureMissions();
 if(G.playing){
  if(G.paused)return {tag:"БОЙ ОСТАНОВЛЕН",title:"Вернёмся к победе?",desc:"Бой стоит на паузе — продолжи, когда будешь готов.",action:"pause",label:"▶ Продолжить"};
  if(G.base<G.baseMax*.55&&!G.used[2]&&S.loadout.includes(2))return {tag:"СОВЕТ ПО БОЮ",title:"Защити крепость",desc:"Прочность базы падает. Сейчас выгоднее применить лечение.",action:"magic",k:2,label:"💗 Лечение"};
  if(!G.heroUsed)return {tag:"СОВЕТ ПО БОЮ",title:"Вызови командиршу",desc:NAMES[S.hero]+" — сильный бесплатный боец, доступный один раз за бой.",action:"hero",label:"👑 Призвать"};
  if(S.units[1]&&G.food>=cost(1))return {tag:"СОВЕТ ПО БОЮ",title:"Поддержи армию лучницей",desc:"Стрелки атакуют издалека и прикрывают переднюю линию.",action:"unit",k:1,label:"🏹 Выпустить"};
  if(G.food>=cost(0))return {tag:"СОВЕТ ПО БОЮ",title:"Время для подкрепления",desc:"Еды достаточно для нового бойца ближнего боя.",action:"unit",k:0,label:"⚔️ Выпустить"};
  return {tag:"СОВЕТ ПО БОЮ",title:"Копи еду",desc:"Еда пополняется автоматически. Когда хватит, карточка воительницы подсветится.",action:"none",label:"Всё понятно"};
 }
 const ready=readyMissionIndex();
 if(ready>=0)return {tag:"ЕСТЬ НАГРАДА",title:"Поручение выполнено!",desc:"Забери награду за «"+MISSIONS[ready].name+"»: монеты и кристаллы.",action:"claimquest",k:ready,label:"🎁 Забрать"};
 if(S.claimed!==todayKey())return {tag:"ПОДАРОК ДНЯ",title:"Начни с бесплатного подарка",desc:"100 монет и 20 кристаллов — без рекламы и настоящих платежей.",action:"claim",label:"🎁 Получить"};
 if(S.stage>=6){
  const p=evolutionPrice();
  return S.coins>=p?
   {tag:"СЛЕДУЮЩАЯ ЭПОХА",title:"Открывай новый мир",desc:"Пять побед уже есть. За "+fmt(p)+" монет перейдёшь к следующей эпохе.",action:"evolve",label:"🌟 Эволюция"}:
   {tag:"НАСТУПАЕТ НОВАЯ ЭПОХА",title:"Накопи на эволюцию",desc:"До следующей эпохи нужно ещё "+fmt(p-S.coins)+" монет. Победи в новом походе.",action:"setmode",mode:"story",label:"⚔️ Поход"};
 }
 if(S.food<1&&S.coins>=levelPrice("food"))return {tag:"СОВЕТ ПО УЛУЧШЕНИЯМ",title:"Сначала ускорь получение еды",desc:"«Сады изобилия» позволят быстрее выпускать войска. Купи за "+fmt(levelPrice("food"))+" монет.",action:"buy",id:"food",label:"🍎 Улучшить"};
 if(!S.units[1]&&S.coins>=175)return {tag:"ПОРА ОТКРЫТЬ ОТРЯД",title:"Открой стрелков",desc:"Дальнобойная поддержка поможет справляться с тяжёлыми противницами. Цена 175 монет.",action:"unlock",k:1,label:"🏹 Открыть"};
 if(S.attack<1&&S.coins>=levelPrice("attack"))return {tag:"СОВЕТ ПО УЛУЧШЕНИЯМ",title:"Усиль всех воительниц",desc:"«Алый клинок» даёт +17% к урону каждой воительницы.",action:"buy",id:"attack",label:"⚔️ Улучшить"};
 if(!S.units[2]&&S.units[1]&&S.coins>=420)return {tag:"ПОРА ОТКРЫТЬ ОТРЯД",title:"Добавь тяжёлую защитницу",desc:"Третий отряд выдерживает больше урона и помогает наступлению.",action:"unlock",k:2,label:"🛡️ Открыть"};
 const next=["food","attack","vital","base","income"].sort((x,y)=>Number(S[x])-Number(S[y])||levelPrice(x)-levelPrice(y))[0];
 if(S.coins>=levelPrice(next)){
  const item=SHOP.find(x=>x[0]===next);
  return {tag:"ЛУЧШАЯ ПОКУПКА СЕЙЧАС",title:item[2],desc:item[3]+". Цена "+fmt(levelPrice(next))+" монет.",action:"buy",id:next,label:"Улучшить"};
 }
 if(S.heroes.length===1&&S.gems>=36&&S.wins>=2)return {tag:"КОЛЛЕКЦИЯ ГЕРОИНЬ",title:"Пригласи вторую героиню",desc:"У тебя достаточно кристаллов для новой командирши. Познакомься с Мирой.",action:"select",k:1,label:"👑 Пригласить"};
 return {tag:"СЛЕДУЮЩИЙ ШАГ",title:"Отправляйся в новый поход",desc:"Получишь монеты за каждую победу и даже за поражение. Затем вернись за усилениями.",action:"startstory",label:"⚔️ В бой"};
}
function advisorCard(){
 const d=nextAdvice();
 const key=[d.tag,d.title,d.desc,d.label,d.action,d.k,d.id,d.mode].join("|");
 if(G.mentorKey===key&&$("mentor").innerHTML)return;
 G.mentorKey=key;
 $("mentor").innerHTML='<div class="mentor-avatar">'+window.QueenArt.portrait(9)+'</div><div class="mentor-copy"><small>ЛИРА · '+d.tag+'</small><strong>'+d.title+'</strong><p>'+d.desc+'</p></div><button class="mentor-action" data-a="mentor" '+(d.action==="none"?'disabled':'')+'>'+d.label+'</button>';
}
function followAdvice(){
 const d=nextAdvice();
 switch(d.action){
 case "claimquest":return claimMission(d.k);
 case "claim":return daily();
 case "buy":return purchase(d.id);
 case "unlock":return unlock(d.k);
 case "evolve":return evolve();
 case "unit":return unit(d.k);
 case "hero":return summonHero();
 case "magic":return cast(d.k);
 case "pause":G.paused=!G.paused;render();return;
 case "select":return choose(d.k);
 case "startstory":if(G.playing)return;G.mode="story";setTab("battle");begin();return;
 case "setmode":G.mode=d.mode;setTab("battle");return;
 }
}

function defaults(){return {coins:180,gems:85,era:0,stage:1,timeline:1,food:0,base:0,attack:0,vital:0,income:0,auto:false,skin:0,relic:0,magic:[0,1,2],loadout:[0,1,2],units:[1,0,0],hero:0,heroes:[0],wins:0,losses:0,kills:0,deployed:0,claimed:"",first:true,sound:true,cards:[1,1,1,0,0,0,0,0,0,0,0,0],deck:[0,1,2],dungeonFloor:1,dungeonWins:0,bossWins:0,purchases:0,quests:null,streak:0,bestStreak:0};}
let S=defaults();try{const data=JSON.parse(localStorage.getItem(KEY)||"null");if(data&&typeof data==="object")S=Object.assign(defaults(),data);}catch(e){}
S.era=Math.max(0,Math.min(6,Number(S.era)||0));S.stage=Math.max(1,Math.min(6,Number(S.stage)||1));
if(!Array.isArray(S.units))S.units=[1,0,0];if(!Array.isArray(S.heroes))S.heroes=[0];if(!Array.isArray(S.magic))S.magic=[0,1,2];if(!Array.isArray(S.loadout))S.loadout=[0,1,2];if(!Array.isArray(S.cards))S.cards=[1,1,1,0,0,0,0,0,0,0,0,0];if(!Array.isArray(S.deck))S.deck=[0,1,2];S.cards=S.cards.slice(0,CARDS.length).map(x=>Math.max(0,Math.min(5,Number(x)||0)));while(S.cards.length<CARDS.length)S.cards.push(0);S.deck=S.deck.slice(0,3).filter(i=>Number.isInteger(i)&&i>=0&&i<CARDS.length&&S.cards[i]>0);while(S.deck.length<3){let next=S.cards.findIndex((x,i)=>x>0&&!S.deck.includes(i));if(next<0)break;S.deck.push(next);}S.dungeonFloor=Math.max(1,Math.min(1000,Number(S.dungeonFloor)||1));S.purchases=Math.max(0,Number(S.purchases)||0);S.streak=Math.max(0,Number(S.streak)||0);S.bestStreak=Math.max(0,Number(S.bestStreak)||0);
const G={tab:"battle",mode:"story",playing:false,done:false,paused:false,speed:1,time:0,food:12,base:450,baseMax:450,enemy:450,enemyMax:450,troops:[],particles:[],queue:[],next:0,used:{},heroUsed:false,frozen:0,raging:0,dead:0,damage:0,autoWait:0,autoEnabled:false,deckSlot:0,bossSpawned:false,bossBeaten:false,bossPulse:12,battleMessage:"",battleMessageTime:0,shake:0,shopFilter:"popular"};
const canvas=$("canvas"),c=canvas.getContext("2d");
let last=0,uiTimer=0,saveTimer=0,toastTimer=0;const W=390,H=300;
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+"м":n>=1000?(n/1000).toFixed(1)+"к":String(Math.floor(n));
let audioContext=null;
function sfx(kind){
 if(S.sound===false)return;
 const Audio=window.AudioContext||window.webkitAudioContext;
 if(!Audio)return;
 try{
  if(!audioContext)audioContext=new Audio();
  if(audioContext.state==="suspended")audioContext.resume().catch(()=>{});
  const notes={start:[392,523,659],unit:[207,276],hero:[466,622,830],magic:[660,880,740],buy:[523,660],win:[523,659,784,1046],lose:[277,220,165],boss:[185,146,185],card:[659,830,988]}[kind]||[440];
  const base=audioContext.currentTime;
  notes.forEach((freq,i)=>{
   const osc=audioContext.createOscillator(),gain=audioContext.createGain();
   osc.type=kind==="boss"?"triangle":"sine";
   osc.frequency.setValueAtTime(freq,base+i*.085);
   gain.gain.setValueAtTime(.0001,base+i*.085);
   gain.gain.exponentialRampToValueAtTime(.026,base+i*.085+.018);
   gain.gain.exponentialRampToValueAtTime(.0001,base+i*.085+.15);
   osc.connect(gain);gain.connect(audioContext.destination);
   osc.start(base+i*.085);osc.stop(base+i*.085+.17);
  });
 }catch(e){}
}
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
function champ(){return '<div class="portrait">'+heroSvg(S.hero)+'</div><div class="champtext"><label>ВЕРХОВНАЯ КОМАНДИРША</label><strong>'+NAMES[S.hero]+'</strong><small>'+a().title+' · реликвии '+S.relic+'</small></div><button class="chip" data-a="tab" data-tab="heroes">Сменить ›</button>';}
function rect(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
function backdrop(){window.FairytaleScene.background(c,S.era,G.time,G.mode);}
function castle(x,enemy){window.FairytaleScene.castle(c,x,enemy,S.era,G.time);}
function soldier(t){window.QueenArt.draw(c,t,S.era,G.time,S.skin);}
function draw(){if(!c)return;c.clearRect(0,0,W,H);c.save();if(G.shake>0)c.translate((Math.random()-.5)*G.shake*8,(Math.random()-.5)*G.shake*4);backdrop();castle(28,false);castle(361,true);
if(!G.playing&&!G.done){rect(52,76,286,69,21,"#fff9f6e8","#ffffff");c.textAlign="center";c.fillStyle="#9566a4";c.font="bold 21px Georgia";c.fillText("Сказка семи королевств",195,104);c.fillStyle="#977eaa";c.font="12px sans-serif";c.fillText("Выбирай воительниц — и в путь!",195,130);c.textAlign="left";}
G.troops.slice().sort((x,y)=>x.y-y.y).forEach(soldier);
G.particles.forEach((p,i)=>{const opacity=Math.max(0,Math.min(1,p.life*2));c.globalAlpha=opacity;c.save();c.translate(p.x,p.y);c.rotate(G.time*3+i*.3);c.fillStyle=p.color;c.beginPath();const rad=p.radius*(i%3===0?1.8:1);if(i%3===0){for(let j=0;j<8;j++){let angle=j*Math.PI/4,r=j%2?rad*.26:rad;c.lineTo(Math.sin(angle)*r,Math.cos(angle)*r);}c.closePath();}else c.arc(0,0,rad,0,Math.PI*2);c.fill();c.restore();});c.globalAlpha=1;
if(G.frozen>0){c.fillStyle="#E2F6FF3F";c.fillRect(0,0,W,H);}
if(G.raging>0){c.fillStyle="#FFE1B415";c.fillRect(0,0,W,H);}
c.restore();
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
G.troops.push(t);if(side==="p"){S.deployed++;saveTimer=1;sparkle(t.x,t.y-50,"#fff9c6",7);}if(boss){G.bossSpawned=true;G.bossPulse=13;G.battleMessage="На поле вышла предводительница врага!";G.battleMessageTime=3;sfx("boss");}
return t;
}
function begin(){G.playing=true;G.done=false;G.paused=false;G.time=0;G.food=12;G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;G.troops=[];G.particles=[];G.queue=waves();G.next=0;G.used={};G.heroUsed=false;G.frozen=0;G.raging=0;G.dead=0;G.damage=0;G.autoWait=0;G.autoEnabled=!!S.auto;G.bossSpawned=false;G.bossBeaten=false;G.bossPulse=14;G.battleMessage="";G.battleMessageTime=0;G.shake=0;closeModal();render();sfx("start");}
function complete(won){
if(G.done)return;
G.playing=false;G.done=true;sfx(won?"win":"lose");
let reward=Math.round((won?195:65)*(1+(S.stage-1)*.2+S.era*.36)*(1+S.income*.18+cardBonus("coins"))*(G.mode==="arena"?1.3:G.mode==="dungeon"?1.45:1)*(won?1+.04*Math.min(5,(S.streak||0)+1):1));
let gems=won?(G.mode==="arena"?18:G.mode==="dungeon"?25:8):0;
S.coins+=reward;S.gems+=gems;
let bonusText="";
if(won){
S.wins++;S.streak=(S.streak||0)+1;S.bestStreak=Math.max(S.bestStreak||0,S.streak);
if(G.mode==="story"&&S.stage<6)S.stage++;
if(G.bossBeaten)S.bossWins++;
if(G.mode==="dungeon"){S.dungeonWins++;S.dungeonFloor++;bonusText=drawCard();}else if(G.bossBeaten||G.mode==="arena"&&Math.random()<.3){bonusText=drawCard();}
}else {S.losses++;S.streak=0;}
save();
$("modal").hidden=false;
let msg=won?"Победа воительниц!":"Армия отступила";
$("modal").innerHTML='<div class="modalbox"><div class="big">'+(won?"🏆":"🛡️")+'</div><h2>'+msg+'</h2><p>'+(won&&G.mode==="dungeon"?"Этаж башни пройден. В награду ты получила новую карту!":won&&S.stage===6?"Эпоха покорена. Теперь можно перейти в новую эпоху.":"Улучши войска и отправляйся в новый поход.")+'</p><p style="font-size:20px;color:#ffe0a0;font-weight:950">🪙 +'+fmt(reward)+'　💎 +'+gems+'</p>'+(bonusText?'<div class="reward-card">🎴 '+bonusText+'</div>':'')+'<p class="winning-streak">'+(won&&S.streak>1?'🔥 Серия побед: '+S.streak+' · награда увеличена!':'')+'</p><div class="end-actions"><button class="go" data-a="newbattle">⚔️ Следующий бой</button><button class="chip" data-a="tab" data-tab="army">⬆️ Улучшения</button><button class="chip" data-a="tab" data-tab="other">🎯 Задания</button></div></div>';
render();
}
function tick(dt){
G.particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=150*dt;p.life-=dt;});G.particles=G.particles.filter(p=>p.life>0);
if(!G.playing||G.done||G.paused)return;G.time+=dt;G.food=Math.min(130,G.food+foodRate()*dt);G.frozen=Math.max(0,G.frozen-dt);G.raging=Math.max(0,G.raging-dt);G.shake=Math.max(0,G.shake-dt);G.battleMessageTime=Math.max(0,G.battleMessageTime-dt);
if(G.next<G.queue.length&&G.time>=G.queue[G.next].at){const w=G.queue[G.next];createTroop("e",w.k,null,!!w.boss);G.next++;}
if(G.autoEnabled){G.autoWait+=dt;if(G.autoWait>=8&&G.food>=cost(0)){G.autoWait=0;G.food-=cost(0);createTroop("p",0,null);}}
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
function unit(k){if(!G.playing)return toast("Сначала начни битву");if(G.paused)return toast("Бой на паузе");if(!S.units[k])return toast("Открой отряд в развитии");if(G.food<cost(k))return toast("Недостаточно еды");G.food-=cost(k);createTroop("p",k,null);renderBattle();sfx("unit");}
function summonHero(){if(!G.playing)return toast("Сначала начни битву");if(G.paused)return toast("Бой на паузе");if(G.heroUsed)return toast("Героиня уже призвана");G.heroUsed=true;createTroop("p",S.units[2]?2:S.units[1]?1:0,S.hero);toast(NAMES[S.hero]+" вступила в бой!");renderBattle();sfx("hero");}
function cast(k){if(!G.playing)return toast("Сначала начни битву");if(G.paused)return toast("Бой на паузе");if(G.used[k])return toast("Эти чары уже использованы");if(!S.loadout.includes(k))return toast("Выбери заклинание в магазине");G.used[k]=true;sfx("magic");
if(k===0){G.frozen=5;toast("Враги заморожены!");}
if(k===1){for(const t of G.troops)if(t.side==="e"){t.hp-=76*attackPower("p")*(1+cardBonus("meteors"));sparkle(t.x,t.y-30,"#fce9e8",10);}G.enemy-=40*attackPower("p");toast("Метеорный дождь!");}
if(k===2){G.base=Math.min(G.baseMax,G.base+140*(1+cardBonus("healing")));for(const t of G.troops)if(t.side==="p")t.hp=Math.min(t.max,t.hp+t.max*(.5+cardBonus("healing")));toast("Армия исцелена!");}
if(k===3){G.raging=12;toast("Боевая ярость!");}
if(k===4){for(const t of G.troops)if(t.side==="e"){t.x=Math.min(359,t.x+48);t.hp-=20;}toast("Врагов отбросило!");}
if(k===5){let u=G.troops.find(t=>t.side==="p");createTroop("p",u?u.k:0,S.hero);createTroop("p",u?u.k:0,S.hero);toast("Двойники призваны!");}renderBattle();}
function renderNav(){const reward=readyMissionIndex()>=0;const tabs=[["battle","⚔️","Бой"],["army","⬆️","Улучшить"],["heroes","👑","Герои"],["shop","🛍️","Магазин"],["other","🎯","Цели"]];$("nav").innerHTML=tabs.map(t=>'<button data-a="tab" data-tab="'+t[0]+'" class="'+(G.tab===t[0]||(t[0]==="other"&&(G.tab==="cards"||G.tab==="dungeon"))?"active":"")+'"><span>'+t[1]+(t[0]==="other"&&reward?'<i class="nav-reward"></i>':'')+'</span>'+t[2]+'</button>').join("");}
function renderBattle(){
$("eraText").textContent=a().era+" · Линия "+S.timeline;$("eraName").textContent=a().title;$("modeBtn").textContent="Режим: "+(G.mode==="story"?"Поход":G.mode==="arena"?"Арена":"Башня")+" ▾";
$("topchip").innerHTML='<span>'+(G.mode==="dungeon"?"🏯 Этаж "+S.dungeonFloor:"⚔️ Битва "+Math.min(5,S.stage)+" / 5")+'</span><span>⏱ '+Math.floor(G.time)+' с</span><span>⚔️ '+G.dead+'</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";
$("units").innerHTML=a().units.map((t,k)=>'<button class="unit '+(!S.units[k]?"locked":G.playing&&G.food>=cost(k)?"ready":"")+'" aria-label="'+t[0]+'" data-a="'+(S.units[k]?"unit":"unlock")+'" data-k="'+k+'"><span class="art">'+window.QueenArt.figureSvg((S.era*3+k*5+4)%18,k,S.era,false,S.skin)+'</span><strong>'+t[0]+'</strong><span class="cost">'+(S.units[k]?"🍎 "+cost(k):"🔒 Открыть")+'</span></button>').join("");
$("spells").innerHTML=S.loadout.slice(0,3).map(k=>'<button class="spell" '+(G.used[k]||!G.playing?"disabled":"")+' data-a="magic" data-k="'+k+'"><span>'+MAGICS[k][1]+'</span><small>'+MAGICS[k][0]+'</small></button>').join("")+'<button class="spell" '+(G.heroUsed||!G.playing?"disabled":"")+' data-a="hero"><span>👸</span><small>'+NAMES[S.hero]+'</small></button>';
$("fightaction").innerHTML=(!G.playing)?'<button class="go" data-a="start">⚔️ В БОЙ</button>':G.playing?'<div class="battletools"><button class="chip" data-a="speed">⏩ ×'+G.speed+'</button><button class="chip" data-a="pause">'+(G.paused?"▶ Продолжить":"Ⅱ Пауза")+'</button>'+(S.auto?'<button class="chip" data-a="auto">Авто: '+(G.autoEnabled?"Вкл":"Выкл")+'</button>':"")+'</div>':"";
$("hint").textContent=G.playing?"Нажимай на подсвеченные отряды, чтобы выпускать бойцов":G.mode==="dungeon"?"Башня: победи босса и получи карту":S.stage===6?"Пять побед! Новая эпоха ждёт в «Улучшить»":"Начни сражение или улучши армию за монеты";$("battleShortcuts").innerHTML=G.playing?"":'<button data-a="tab" data-tab="army">⬆️ Улучшить армию</button><button data-a="tab" data-tab="other">🎯 Задания</button>';}

function updateBossBar(){
const boss=G.troops.find(t=>t.boss&&t.hp>0),bar=$("bossbar"),notice=$("battleAlert");
bar.hidden=!boss;
if(boss)bar.innerHTML='<strong>👑 БОСС</strong><div class="boss-track"><i style="width:'+Math.max(0,Math.round(boss.hp/boss.max*100))+'%"></i></div><span>'+Math.max(0,Math.floor(boss.hp/boss.max*100))+'%</span>';
notice.hidden=!(G.battleMessageTime>0);if(!notice.hidden)notice.textContent=G.battleMessage;
}
function updateHud(){
$("topchip").innerHTML='<span>'+(G.mode==="dungeon"?"🏯 Этаж "+S.dungeonFloor:"⚔️ Битва "+Math.min(5,S.stage)+" / 5")+'</span><span>⏱ '+Math.floor(G.time)+' с</span><span>⚔️ '+G.dead+'</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";updateBossBar();if(document.querySelectorAll){document.querySelectorAll("#units .unit").forEach((el,k)=>{if(el.classList&&el.classList.toggle)el.classList.toggle("ready",!!S.units[k]&&G.playing&&!G.paused&&G.food>=cost(k));});}
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
function shop(){
 let v=listHead("Королевский магазин","Все покупки за игровые монеты и кристаллы. Настоящих платежей и рекламы нет.");
 const filters=[["popular","⭐ Важное"],["power","⚔️ Сила"],["magic","✨ Магия"],["style","🎨 Облики"]];
 v+='<div class="shopfilters">'+filters.map(x=>'<button data-a="shopfilter" data-filter="'+x[0]+'" class="'+(G.shopFilter===x[0]?"active":"")+'">'+x[1]+'</button>').join("")+'</div>';
 let ids=G.shopFilter==="power"?["food","attack","vital","base","income","relic"]:
 G.shopFilter==="magic"?["magic3","magic4","magic5","auto","cardChest"]:
 G.shopFilter==="style"?["skin","relic","chest","cardChest"]:
 ["food","attack","base","vital","auto","cardChest"];
 for(const id of ids){
  const item=SHOP.find(x=>x[0]===id);if(!item)continue;
  let [key,icon,name,desc,currency]=item;
  let owned=id==="auto"?S.auto:id.startsWith("magic")?S.magic.includes(Number(id.slice(5))):false;
  const enough=Number(S[currency])>=levelPrice(id);
  const pay=currency==="gems"?"💎 ":"🪙 ";
  v+='<div class="market-card '+(enough&&!owned?"affordable":"")+'"><div class="market-icon">'+icon+'</div><div class="market-desc"><strong>'+name+'</strong><small>'+desc+'</small>'+(["food","attack","base","vital","income"].includes(id)?'<span>Уровень '+S[id]+'</span>':"")+'</div><button data-a="buy" data-id="'+id+'" class="'+(owned?"owned":!enough?"tooexpensive":"")+'">'+(owned?(id.startsWith("magic")?"Выбрать":"✓ Есть"):pay+fmt(levelPrice(id)))+'</button></div>';
 }
 v+='<p class="micro" style="margin:12px 3px">Советница Лира сверху показывает наиболее полезную покупку с учётом твоих монет, войск и прогресса.</p>';
 return v;
}
function other(){
 ensureMissions();
 const claimed=S.claimed===todayKey();
 let v=listHead("Цели и награды","Выполняй короткие задания, забирай ежедневные подарки и открывай новые приключения.");
 v+=questBoard();
 v+='<div class="daily-reward"><div><small>БЕСПЛАТНО КАЖДЫЙ ДЕНЬ</small><strong>🎁 Королевский подарок</strong><span>100 монет + 20 кристаллов</span></div><button data-a="claim" '+(claimed?"disabled":"")+'>'+(claimed?"✓ Получено":"Забрать")+'</button></div>';
 v+='<div class="sectionname"><b>КУДА ОТПРАВИТЬСЯ</b></div><div class="featurebuttons"><button data-a="tab" data-tab="cards"><b>🎴 Боевые карты</b><small>Коллекция из 12 усилений</small></button><button data-a="tab" data-tab="dungeon"><b>🏯 Башня боссов</b><small>Этаж '+S.dungeonFloor+' · награды</small></button></div>';
 v+='<div class="sectionname"><b>МОЙ ПРОГРЕСС</b></div><div class="stat-grid">'+
 '<div><strong>'+S.wins+'</strong><small>побед</small></div>'+
 '<div><strong>'+S.heroes.length+'/18</strong><small>героинь</small></div>'+
 '<div><strong>'+S.kills+'</strong><small>побеждено</small></div>'+
 '<div><strong>×'+S.streak+'</strong><small>серия побед</small></div></div>';
 v+='<div class="sectionname"><b>НАСТРОЙКИ И СОХРАНЕНИЯ</b></div><div class="settings-grid">'+
 '<button data-a="export">⬇️ Сохранить прогресс</button>'+
 '<button data-a="import">⬆️ Загрузить прогресс</button>'+
 '<button data-a="sound">'+(S.sound===false?"🔇 Включить звук":"🔊 Выключить звук")+'</button>'+
 '<button data-a="help">❔ Как играть</button></div>';
 v+='<p class="micro">Игра полностью офлайн после первой загрузки. Сохранение хранится на этом устройстве. Перед очисткой Safari используй «Сохранить прогресс».</p>';
 return v;
}
function render(){ ensureMissions();$("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);$("champ").innerHTML=champ();let battle=G.tab==="battle";$("battlePage").hidden=!battle;$("otherPage").hidden=battle;if(battle)renderBattle();else $("otherPage").innerHTML=G.tab==="army"?army():G.tab==="heroes"?heroes():G.tab==="shop"?shop():G.tab==="cards"?cardPage():G.tab==="dungeon"?dungeonPage():other();renderNav();advisorCard();}
function setTab(tab){G.tab=tab;closeModal();render();window.scrollTo(0,0);}
function closeModal(){$("modal").hidden=true;$("modal").innerHTML="";}
function showModePicker(){
if(G.playing)return toast("Сначала заверши текущий бой");
const rows=[
["story","⚔️","Поход","Основные сражения и продвижение по эпохам"],
["arena","🏆","Арена","Сложнее враги, больше награды"],
["dungeon","🏯","Башня","Боссы, этажи и особые карты"]
];
$("modal").hidden=false;
$("modal").innerHTML='<div class="modalbox"><h2>Выбери режим</h2><p>Нажми на нужный вариант. Список всех режимов — перед тобой.</p><div class="modechoices">'+rows.map(v=>'<button class="modechoice '+(G.mode===v[0]?"selected":"")+'" data-a="setmode" data-mode="'+v[0]+'"><span>'+v[1]+'</span><div><strong>'+v[2]+(G.mode===v[0]?" ✓":"")+'</strong><small>'+v[3]+'</small></div></button>').join("")+'</div><button class="chip" data-a="close" style="width:100%">Закрыть</button></div>';
}
function chooseMode(mode){
if(!["story","arena","dungeon"].includes(mode))return;
if(G.playing)return toast("Сначала заверши текущий бой");
G.mode=mode;G.done=false;closeModal();setTab("battle");
toast(mode==="story"?"Выбран поход":mode==="arena"?"Выбрана арена":"Выбрана башня");
}

function showHelp(){$("modal").hidden=false;$("modal").innerHTML='<div class="modalbox"><div class="big">👑</div><h2>Три шага к победе</h2><div class="intro-steps"><div><b>1</b><span><strong>Нажми «В бой»</strong><small>Еда начинает появляться сама.</small></span></div><div><b>2</b><span><strong>Выпускай воительниц</strong><small>Нажимай на их карточки и применяй магию.</small></span></div><div><b>3</b><span><strong>Улучшай армию</strong><small>Лира подскажет, что выгоднее купить. Выполняй задания и получай призы.</small></span></div></div><button class="go" style="width:100%" data-a="close">Понятно, играть!</button></div>';}
function unlock(k){if(S.units[k])return toast("Отряд уже открыт");if(k===0)return;if(k===2&&!S.units[1])return toast("Сначала открой второй отряд");let p=k===1?175:420;if(S.coins<p){setTab("army");return toast("Нужно "+p+" монет");}S.coins-=p;S.units[k]=1;S.purchases=(S.purchases||0)+1;save();render();sfx("buy");toast("Открыт новый отряд!");}
function purchase(id){let item=SHOP.find(t=>t[0]===id);if(!item)return;
if(id==="auto"&&S.auto)return toast("Уже куплено");if(id.startsWith("magic")&&S.magic.includes(Number(id.slice(5)))){let spell=Number(id.slice(5));if(S.loadout.includes(spell))return toast("Эта магия уже в колоде");S.loadout[2]=spell;save();render();return toast("Магия выбрана для боя!");}
let currency=item[4],price=levelPrice(id);if(S[currency]<price)return toast("Недостаточно "+(currency==="gems"?"кристаллов":"монет"));
S[currency]-=price;S.purchases=(S.purchases||0)+1;
if(["food","base","attack","vital","income","skin","relic"].includes(id))S[id]++;
else if(id==="auto")S.auto=true;else if(id.startsWith("magic")){let spell=Number(id.slice(5));S.magic.push(spell);S.loadout[2]=spell;}
else if(id==="cardChest"){let card=drawCard();toast("Новая карта: "+card);}
else if(id==="chest"){if(Math.random()<.3){S.gems+=25;toast("Из сундука: 25 кристаллов!");}else {S.coins+=Math.round(180+Math.random()*220);toast("Сундук полон монет!");}}
save();render();sfx(id==="cardChest"?"card":"buy");if(id!=="chest"&&id!=="cardChest")toast("Покупка успешна!");}
function choose(i){if(i<0||i>=18)return;if(!S.heroes.includes(i)){let price=28+i*8;if(S.gems<price)return toast("Недостаточно кристаллов");S.gems-=price;S.heroes.push(i);toast(NAMES[i]+" присоединилась к армии!");}S.hero=i;save();render();}
function evolutionPrice(){return Math.round(400*Math.pow(2.15,S.era)*(1+.25*(S.timeline-1)));}
function evolve(){if(S.stage<6)return toast("Сначала выиграй пять битв");let p=evolutionPrice();if(S.coins<p)return toast("Для эволюции нужно "+fmt(p)+" монет");S.coins-=p;S.era++;if(S.era>=7){S.era=0;S.timeline++;S.gems+=85;}S.stage=1;S.food=0;S.base=0;S.attack=0;S.vital=0;S.income=0;S.units=[1,0,0];G.done=false;G.playing=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;save();setTab("battle");toast("Новая эпоха: "+a().title);}
function daily(){let today=todayKey();if(S.claimed===today)return toast("Сегодня уже получено");S.claimed=today;S.coins+=100;S.gems+=20;save();render();toast("Подарок: 100 монет и 20 кристаллов!");}
function backup(){const blob=new Blob([JSON.stringify({app:"queen-empire-offline",version:1,state:S},null,2)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="voitel-nicy-save.json";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),2000);}
function restore(){let input=$("savefile");input.value="";input.onchange=()=>{let file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{let v=JSON.parse(reader.result);if(v.app!=="queen-empire-offline"||!v.state)throw Error("bad");S=Object.assign(defaults(),v.state);if(!Array.isArray(S.heroes)||!Array.isArray(S.units))throw Error("bad");save();G.playing=false;G.done=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;setTab("battle");toast("Сохранение восстановлено");}catch(e){toast("Не удалось прочитать сохранение");}};reader.readAsText(file);};input.click();}
document.addEventListener("click",e=>{let el=e.target.closest("[data-a]");if(!el)return;let action=el.dataset.a,k=Number(el.dataset.k)||0;
switch(action){case"tab":setTab(el.dataset.tab);break;case"mentor":followAdvice();break;case"claimquest":claimMission(k);break;case"shopfilter":G.shopFilter=el.dataset.filter;render();break;case"deckslot":G.deckSlot=k;render();break;case"equip":equipCard(k);break;case"dungeon":if(G.playing){toast("Закончи текущую битву");break;}G.mode="dungeon";G.done=false;setTab("battle");toast("Башня королев · этаж "+S.dungeonFloor);break;case"unit":unit(k);break;case"unlock":unlock(k);break;case"hero":summonHero();break;case"magic":cast(k);break;case"buy":purchase(el.dataset.id);break;case"select":choose(k);break;case"evolve":evolve();break;case"claim":daily();break;case"start":case"newbattle":begin();break;case"close":closeModal();break;case"mode":showModePicker();break;case"setmode":chooseMode(el.dataset.mode);break;case"pause":G.paused=!G.paused;renderBattle();break;case"auto":G.autoEnabled=!G.autoEnabled;renderBattle();toast(G.autoEnabled?"Автопризыв включён":"Автопризыв выключен");break;case"speed":G.speed=G.speed===1?2:1;renderBattle();break;case"help":showHelp();break;case"sound":S.sound=S.sound===false;save();render();sfx("buy");break;case"export":backup();break;case"import":restore();break;}
});
function frame(now){let dt=Math.min(.045,(now-last)/1000||.016);last=now;if(!G.paused){for(let i=0;i<G.speed;i++)tick(dt);}draw();uiTimer+=dt;if(uiTimer>.28){uiTimer=0;if(G.tab==="battle")updateHud();advisorCard();$("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);}requestAnimationFrame(frame);}
function resize(){let d=Math.min(devicePixelRatio||1,2);canvas.width=W*d;canvas.height=H*d;c.setTransform(d,0,0,d,0,0);draw();}
window.addEventListener("pagehide",save);document.addEventListener("visibilitychange",()=>{if(document.hidden)save();});window.addEventListener("resize",resize);
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;render();resize();requestAnimationFrame(frame);
if(S.first){S.first=false;save();setTimeout(showHelp,750);}
})();