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
["auto","🌟","Королевский призыв","Премиум-автопризыв: быстрее на 25%","gems",110],
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
  if(G.contractDone&&G.contract)return {tag:"КОНТРАКТ ВЫПОЛНЕН",title:G.contract.title,desc:"Дополнительная награда за победу уже заработана. Доведи бой до конца!",action:"none",label:"Удачи"};
  if(!G.heroUsed)return {tag:"СОВЕТ ПО БОЮ",title:"Вызови командиршу",desc:NAMES[S.hero]+" — сильный бесплатный боец, доступный один раз за бой.",action:"hero",label:"👑 Призвать"};
  if(ultimateReady())return {tag:"КОРОННЫЙ ПРИЁМ ГОТОВ",title:signature().name,desc:signature().desc,action:"ultimate",label:signature().icon+" Применить"};
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
 case "ultimate":return ultimate();
 case "magic":return cast(d.k);
 case "pause":G.paused=!G.paused;render();return;
 case "select":return choose(d.k);
 case "startstory":if(G.playing)return;G.mode="story";setTab("battle");begin();return;
 case "setmode":G.mode=d.mode;setTab("battle");return;
 }
}


/* Permanent, save-compatible heroine mastery. Levels unlock new lacquer detailing. */
const HERO_XP=[0,100,400,900,1600,Infinity];
const SIGNATURES=[
{name:"Королевский щит",icon:"🛡️",desc:"Лечение армии и крепости, короткая остановка врагов."},
{name:"Алый залп",icon:"🏹",desc:"Сильный залп по опаснейшим противникам и вражеской крепости."},
{name:"Звёздное сияние",icon:"✨",desc:"Магический взрыв, заморозка противников и урон крепости."}
];
function heroLevel(id=S.hero){
 const xp=Math.max(0,Number((S.heroXP||[])[id])||0);
 let level=1;while(level<5&&xp>=HERO_XP[level])level++;
 return level;
}
function heroProgress(id=S.hero){
 const xp=Math.max(0,Number((S.heroXP||[])[id])||0),level=heroLevel(id);
 if(level>=5)return {level,value:100,remaining:0};
 const lower=HERO_XP[level-1],upper=HERO_XP[level];
 return {level,value:Math.min(100,Math.round((xp-lower)/(upper-lower)*100)),remaining:Math.max(0,upper-xp)};
}
function signature(){return SIGNATURES[S.hero%3];}
function heroAlive(){return G.troops.some(t=>t.side==="p"&&t.heroLevel>0&&t.hp>0);}
function ultimateReady(){return G.playing&&!G.done&&!G.paused&&G.heroUsed&&!G.ultimateUsed&&G.heroCharge>=100&&heroAlive();}
function renderHeroStatus(){
 const dock=$("heroStatus");if(!dock)return;
 dock.hidden=!G.playing||!G.heroUsed||G.done||G.tab!=="battle";
 if(dock.hidden)return;
 const charged=ultimateReady(),alive=heroAlive();
 const value=Math.max(0,Math.min(100,Math.floor(G.heroCharge)));
 const label=G.ultimateUsed?"ИСПОЛЬЗОВАН":!alive?"ГЕРОИНЯ ВЫБЫЛА":charged?"ГОТОВО!":"ЗАРЯД "+value+"%";
 const key=[S.hero,heroLevel(),G.ultimateUsed,charged,alive,G.paused].join("|");
 // Preserve the physical button DOM during charging to avoid lost touches in Safari.
 if(dock.dataset.key!==key||!dock.innerHTML){
  dock.dataset.key=key;
  dock.innerHTML='<div class="hero-status-top"><strong>👑 '+NAMES[S.hero]+' · ур. '+heroLevel()+'</strong><span></span></div>'+
  '<div class="hero-charge-track"><i></i></div>'+
  '<button class="hero-ultimate '+(charged?"ready":"")+'" data-a="ultimate" '+(!charged?'disabled':'')+'>'+signature().icon+' '+signature().name+'</button>';
 }
 const track=dock.querySelector(".hero-charge-track i");
 if(track)track.style.width=value+"%";
 const top=dock.querySelector(".hero-status-top span");
 if(top&&top.textContent!==label)top.textContent=label;
}
function ultimate(){
 if(!G.playing||G.paused||G.done)return toast("Сначала продолжи битву");
 if(!G.heroUsed)return toast("Сначала призови командиршу");
 if(G.ultimateUsed)return toast("Особый приём уже использован");
 if(!heroAlive())return toast("Командирша выбыла из боя");
 if(G.heroCharge<100)return toast("Накопи 100% энергии");
 const kind=S.hero%3,lv=heroLevel();
 if(kind===0){
  G.base=Math.min(G.baseMax,G.base+G.baseMax*(.12+.04*lv));
  for(const t of G.troops)if(t.side==="p")t.hp=Math.min(t.max,t.hp+t.max*(.23+lv*.04));
  G.frozen=Math.max(G.frozen,1.8+lv*.2);
  if(window.BattleFX)window.BattleFX.magic(2,G.troops);
 }else if(kind===1){
  const enemies=G.troops.filter(t=>t.side==="e"&&t.hp>0).sort((a,b)=>Number(b.boss)-Number(a.boss)||b.hp-a.hp);
  enemies.slice(0,4).forEach(t=>{t.hp-=94+27*lv;t.hitPulse=.24;});
  G.enemy=Math.max(0,G.enemy-(70+18*lv));
  if(window.BattleFX)window.BattleFX.magic(1,G.troops);
 }else{
  G.frozen=Math.max(G.frozen,2.7+lv*.28);
  for(const t of G.troops)if(t.side==="e"){t.hp-=53+18*lv;t.hitPulse=.24;}
  G.enemy=Math.max(0,G.enemy-(48+16*lv));
  if(window.BattleFX)window.BattleFX.magic(0,G.troops);
 }
 G.heroCharge=0;G.ultimateUsed=true;G.shake=.42;
 G.battleMessage=signature().name+"!";G.battleMessageTime=2.8;
 sfx("ultimate");renderBattle();renderBattleQuick();renderHeroStatus();
 toast(NAMES[S.hero]+": "+signature().name+"!");
}

function defaults(){return {coins:180,gems:85,era:0,stage:1,timeline:1,food:0,base:0,attack:0,vital:0,income:0,auto:false,skin:0,relic:0,magic:[0,1,2],loadout:[0,1,2],units:[1,0,0],hero:0,heroes:[0],wins:0,losses:0,kills:0,deployed:0,claimed:"",first:true,sound:true,music:true,fx:true,musicVolume:.68,fxVolume:.72,cards:[1,1,1,0,0,0,0,0,0,0,0,0],deck:[0,1,2],dungeonFloor:1,dungeonWins:0,bossWins:0,purchases:0,quests:null,streak:0,bestStreak:0,heroXP:Array(18).fill(0),freeKitClaimed:false};}
let S=defaults();try{const data=JSON.parse(localStorage.getItem(KEY)||"null");if(data&&typeof data==="object")S=Object.assign(defaults(),data);}catch(e){}
S.era=Math.max(0,Math.min(6,Number(S.era)||0));S.stage=Math.max(1,Math.min(6,Number(S.stage)||1));
if(!Array.isArray(S.units))S.units=[1,0,0];if(!Array.isArray(S.heroes))S.heroes=[0];if(!Array.isArray(S.magic))S.magic=[0,1,2];if(!Array.isArray(S.loadout))S.loadout=[0,1,2];if(!Array.isArray(S.cards))S.cards=[1,1,1,0,0,0,0,0,0,0,0,0];if(!Array.isArray(S.deck))S.deck=[0,1,2];S.cards=S.cards.slice(0,CARDS.length).map(x=>Math.max(0,Math.min(5,Number(x)||0)));while(S.cards.length<CARDS.length)S.cards.push(0);S.deck=S.deck.slice(0,3).filter(i=>Number.isInteger(i)&&i>=0&&i<CARDS.length&&S.cards[i]>0);while(S.deck.length<3){let next=S.cards.findIndex((x,i)=>x>0&&!S.deck.includes(i));if(next<0)break;S.deck.push(next);}S.dungeonFloor=Math.max(1,Math.min(1000,Number(S.dungeonFloor)||1));S.musicVolume=[.35,.52,.68,.85,1].reduce((a,b)=>Math.abs(b-(Number(S.musicVolume)||.68))<Math.abs(a-(Number(S.musicVolume)||.68))?b:a,.68);S.fxVolume=Math.max(.2,Math.min(1,Number(S.fxVolume)||.72));S.music=S.music!==false;S.fx=S.fx!==false;S.heroXP=Array.isArray(S.heroXP)?Array.from({length:18},(_,i)=>Math.max(0,Math.min(100000,Number(S.heroXP[i])||0))):Array(18).fill(0);S.purchases=Math.max(0,Number(S.purchases)||0);S.streak=Math.max(0,Number(S.streak)||0);S.bestStreak=Math.max(0,Number(S.bestStreak)||0);
const G={tab:"battle",mode:"story",playing:false,done:false,paused:false,speed:1,time:0,food:12,base:450,baseMax:450,enemy:450,enemyMax:450,troops:[],particles:[],queue:[],next:0,used:{},heroUsed:false,frozen:0,raging:0,dead:0,damage:0,autoWait:0,autoEnabled:!!S.auto,deckSlot:0,bossSpawned:false,bossBeaten:false,bossPulse:12,battleMessage:"",battleMessageTime:0,shake:0,shopFilter:"popular",quickMagicOpen:false,heroCharge:0,ultimateUsed:false,stance:"balanced",wave:0,battleDeployed:0,contract:null,contractDone:false};
const canvas=$("canvas"),c=canvas.getContext("2d");if(window.CrownAudio)window.CrownAudio.settings(S);
let last=0,uiTimer=0,saveTimer=0,toastTimer=0;const W=390,H=300;let ambientTime=0;
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+"м":n>=1000?(n/1000).toFixed(1)+"к":String(Math.floor(n));
let audioContext=null;
function sfx(kind,pan=0){if(window.CrownAudio)window.CrownAudio.sfx(kind,pan);}
function syncAudio(){if(window.CrownAudio)window.CrownAudio.settings(S);}
function renderAudioDock(){
 const dock=$("audioDock");if(!dock)return;
 const status=window.CrownAudio?window.CrownAudio.status:null;
 const playing=status&&status.playing&&S.music!==false;
 const scene=status&&!status.ready&&S.music!==false&&S.sound!==false?"КОСНИСЬ ДЛЯ МУЗЫКИ":G.playing?(G.paused?"ПАУЗА":G.troops.some(t=>t.boss&&t.hp>0)?"БОСС · POWER":"БОЙ · POWER"):"КОРОЛЕВСКАЯ ТЕМА";
 const state=[S.sound,S.music,S.fx,S.musicVolume,S.fxVolume,scene,playing].join(":");
 if(dock.dataset&&dock.dataset.key===state)return;
 if(dock.dataset)dock.dataset.key=state;
 dock.className="audio-dock "+(playing?"music-playing":"");
 const bars='<div class="audio-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>';
 dock.innerHTML='<div class="audio-identity">'+bars+'<div class="audio-label"><b>ROCK SOUNDTRACK</b><small>'+scene+'</small></div></div>'+
 '<button class="audio-toggle '+(S.music!==false&&S.sound!==false?"on":"off")+'" data-a="soundmusic" aria-label="Включить или выключить музыку">'+(S.music!==false&&S.sound!==false?"♫ ВКЛ":"♫ ВЫКЛ")+'</button>'+
 '<button class="audio-toggle '+(S.fx!==false&&S.sound!==false?"on":"off")+'" data-a="soundfx" aria-label="Включить или выключить эффекты">'+(S.fx!==false&&S.sound!==false?"⚡ FX":"⚡ ВЫКЛ")+'</button>'+
 '<button class="audio-toggle volume" data-a="soundvolume" aria-label="Громкость музыки">'+(Math.round(S.musicVolume*100))+'%</button>';
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
function heroSvg(id){return window.QueenArt.portrait(id,S.skin+Math.floor((heroLevel(id)-1)/2));}
function champ(){return '<div class="portrait">'+heroSvg(S.hero)+'</div><div class="champtext"><label>КОРОЛЕВА · '+S.heroes.length+' ИЗ 18</label><strong>'+NAMES[S.hero]+'</strong><small>'+a().title+' · Глянцевые доспехи</small></div><button class="chip" data-a="tab" data-tab="heroes">Героини ›</button>';}
function rect(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
function backdrop(){window.FairytaleScene.background(c,S.era,G.time+ambientTime*.25,G.mode);if(window.BattleFX)window.BattleFX.scenery(c,S.era,ambientTime);}
function castle(x,enemy){window.FairytaleScene.castle(c,x,enemy,S.era,G.time+ambientTime*.35);}
function soldier(t){window.QueenArt.draw(c,t,S.era,G.time+ambientTime*.3,S.skin);}
function draw(){if(!c)return;c.clearRect(0,0,W,H);c.save();if(G.shake>0)c.translate((Math.random()-.5)*G.shake*8,(Math.random()-.5)*G.shake*4);backdrop();castle(28,false);castle(361,true);
if(!G.playing&&!G.done){rect(47,76,296,71,15,"#0C163DE8","#FFD270");c.textAlign="center";c.fillStyle="#FFDD82";c.font="bold 22px Georgia";c.fillText("СЕМЬ КОРОЛЕВСТВ",195,105);c.fillStyle="#E4ECFF";c.font="bold 11px system-ui";c.fillText("Собери армию. Победи всех!",195,131);c.textAlign="left";}
G.troops.slice().sort((x,y)=>x.y-y.y).forEach(soldier);if(window.BattleFX)window.BattleFX.foreground(c,S.era,ambientTime);
G.particles.forEach((p,i)=>{const opacity=Math.max(0,Math.min(1,p.life*2));c.globalAlpha=opacity;c.save();c.translate(p.x,p.y);c.rotate(G.time*3+i*.3);c.fillStyle=p.color;c.beginPath();const rad=p.radius*(i%3===0?1.8:1);if(i%3===0){for(let j=0;j<8;j++){let angle=j*Math.PI/4,r=j%2?rad*.26:rad;c.lineTo(Math.sin(angle)*r,Math.cos(angle)*r);}c.closePath();}else c.arc(0,0,rad,0,Math.PI*2);c.fill();c.restore();});c.globalAlpha=1;
if(window.BattleFX)window.BattleFX.paint(c,ambientTime);
if(G.frozen>0){c.fillStyle="#E2F6FF3F";c.fillRect(0,0,W,H);}
if(G.raging>0){c.fillStyle="#FFE1B415";c.fillRect(0,0,W,H);}
c.restore();
}
function sparkle(x,y,color,n){for(let i=0;i<n;i++)G.particles.push({x,y,vx:(Math.random()-.5)*100,vy:(Math.random()-.8)*85,life:.3+Math.random()*.5,color,radius:1+Math.random()*2.5});if(G.particles.length>250)G.particles.splice(0,80);}

/* V15: tactical stances, enemy-wave pacing and a side objective each battle.
   All state is battle-local. Existing progress key and saved schema unchanged. */
const TACTICS={
 balanced:{name:"БАЛАНС",icon:"⚖️",attack:1,food:1,base:1,health:1},
 assault:{name:"НАПОР",icon:"⚔️",attack:1.28,food:1,base:1.16,health:1.10},
 guard:{name:"ЗАЩИТА",icon:"🛡️",attack:.84,food:1.28,base:.62,health:.83}
};
function stance(){return TACTICS[G.stance]||TACTICS.balanced;}
function changeStance(){
 if(!G.playing||G.done)return toast("Сначала начни бой");
 if(G.paused)return toast("Сначала продолжи бой");
 const keys=["balanced","assault","guard"];
 G.stance=keys[(keys.indexOf(G.stance)+1)%keys.length];
 G.battleMessage="ТАКТИКА: "+stance().name;G.battleMessageTime=1.35;
 toast("Тактика: "+stance().name+(G.stance==="assault"?" · больше урона":G.stance==="guard"?" · быстрее еда, крепче оборона":" · равномерные усиления"));
 sfx("click");renderBattle();
}
function selectContract(){
 const items=[
  {id:"kills",title:"ОХОТА",desc:"Победи 5 противников",goal:5},
  {id:"troops",title:"ПОДКРЕПЛЕНИЕ",desc:"Призови 5 воительниц",goal:5},
  {id:"survive",title:"СТОЙКОСТЬ",desc:"Продержись 40 секунд, сохранив 45% крепости",goal:40}
 ];
 const q=items[(S.wins+S.stage+S.era+(G.mode==="arena"?1:G.mode==="dungeon"?2:0))%items.length];
 return {...q,coins:55+S.era*15+S.stage*13,gems:3};
}
function contractProgress(){
 const task=G.contract;if(!task)return 0;
 return task.id==="kills"?Math.min(task.goal,G.dead):task.id==="troops"?Math.min(task.goal,G.battleDeployed):Math.min(task.goal,Math.floor(G.time));
}
function contractLabel(){
 if(!G.contract)return "🎯 РОК-ЗАДАНИЕ";
 const goal=G.contract.goal,prog=contractProgress();
 return G.contractDone?"🎯 ГОТОВО":("🎯 "+prog+"/"+goal);
}
function checkContract(){
 if(!G.playing||G.contractDone||!G.contract)return;
 const task=G.contract,progress=contractProgress();
 if(progress<task.goal)return;
 if(task.id==="survive"&&G.base<G.baseMax*.45)return;
 G.contractDone=true;
 G.food=Math.min(130,G.food+13);
 G.battleMessage="КОНТРАКТ ВЫПОЛНЕН! +13 ЕДЫ";G.battleMessageTime=2.6;
 if(window.BattleFX)window.BattleFX.magic(3,G.troops);
 sfx("win");
 toast("🎯 "+task.title+" выполнено — бонус за победу!");
}

function waves(){
let arr=[],at=3.2;
const dungeon=G.mode==="dungeon",boss=dungeon||S.stage>=5;
if(boss)arr.push({at:dungeon?5:12,k:2,boss:true,wave:0});
let amount=dungeon?2:3;
for(let wave=0;wave<amount;wave++){
let count=3+wave*2+Math.min(3,S.stage-1)+(dungeon?Math.min(4,Math.ceil(S.dungeonFloor/2)):0);
for(let i=0;i<count;i++){arr.push({at,k:i===count-1&&wave>0?2:(i+wave)%4===0?1:0,wave:wave+1});at+=2.7+Math.random()*.55;}
at+=7;
}
return arr.sort((x,y)=>x.at-y.at);
}
function createTroop(side,k,hero,boss=false){
const stat=[{hp:84,damage:14,speed:30,range:23,rate:.88},{hp:49,damage:14,speed:23,range:96,rate:1.29},{hp:220,damage:35,speed:15,range:28,rate:1.55}][k];
const hid=hero==null?side==="p"?(S.deployed+Math.floor(Math.random()*5))%18:(Math.floor(Math.random()*17)+3)%18:hero;
const extra=side==="p"?(1+(k===0?cardBonus("melee"):k===1?cardBonus("ranged"):cardBonus("heavy"))):1;
const bossScale=boss?(G.mode==="dungeon"?4.5+Math.min(5,S.dungeonFloor*.22):3.8):1;
const hl=hero==null?0:heroLevel(hero),hm=hl?1+.15*(hl-1):1;
const hp=stat.hp*healthPower(side)*(hero==null?1:2.5)*bossScale*hm;
const t={side,k,hid,x:side==="p"?49:342,y:235+Math.random()*14,hp,max:hp,damage:stat.damage*attackPower(side)*(hero==null?1:2*(1+cardBonus("hero")))*extra*(boss?2.8:1)*hm,speed:stat.speed*(side==="p"?1+cardBonus("speed"):1)*(boss?.79:1),range:stat.range,rate:stat.rate*(boss?1.1:1),cd:Math.random()*.5,elite:hero!=null||boss,boss,heroLevel:hl,seed:Math.random()*10};
G.troops.push(t);if(side==="p")G.battleDeployed=(G.battleDeployed||0)+1;if(window.BattleFX)window.BattleFX.summon(t.x,t.y,side,boss);if(side==="p"){S.deployed++;saveTimer=1;sparkle(t.x,t.y-50,"#fff9c6",7);}if(boss){if(window.CrownAudio)window.CrownAudio.setScene("boss");G.bossSpawned=true;G.bossPulse=13;G.battleMessage="На поле вышла предводительница врага!";G.battleMessageTime=3;sfx("boss");}
return t;
}
function begin(){if(window.BattleFX)window.BattleFX.reset();if(window.CrownAudio)window.CrownAudio.setScene("battle");G.playing=true;G.done=false;G.paused=false;G.quickMagicOpen=false;G.stance="balanced";G.wave=0;G.battleDeployed=0;G.contract=selectContract();G.contractDone=false;G.heroCharge=0;G.ultimateUsed=false;G.time=0;G.food=12;G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;G.troops=[];G.particles=[];G.queue=waves();G.next=0;G.used={};G.heroUsed=false;G.frozen=0;G.raging=0;G.dead=0;G.damage=0;G.autoWait=0;G.bossSpawned=false;G.bossBeaten=false;G.bossPulse=14;G.battleMessage="🎯 "+G.contract.desc;G.battleMessageTime=3.8;G.shake=0;closeModal();render();window.scrollTo(0,0);sfx("start");}
function complete(won){
if(G.done)return;
G.playing=false;G.done=true;G.quickMagicOpen=false;if(window.BattleFX)window.BattleFX.reward(won);if(window.CrownAudio)window.CrownAudio.setScene(won?"victory":"defeat");else sfx(won?"win":"lose");
let reward=Math.round((won?195:65)*(1+(S.stage-1)*.2+S.era*.36)*(1+S.income*.18+cardBonus("coins"))*(G.mode==="arena"?1.3:G.mode==="dungeon"?1.45:1)*(won?1+.04*Math.min(5,(S.streak||0)+1):1));
let gems=won?(G.mode==="arena"?18:G.mode==="dungeon"?25:8):0;
if(won&&G.contractDone&&G.contract){reward+=G.contract.coins;gems+=G.contract.gems;}S.coins+=reward;S.gems+=gems;
let bonusText="";
if(won){
S.wins++;S.streak=(S.streak||0)+1;S.bestStreak=Math.max(S.bestStreak||0,S.streak);
if(G.mode==="story"&&S.stage<6)S.stage++;
if(G.bossBeaten)S.bossWins++;
if(G.mode==="dungeon"){S.dungeonWins++;S.dungeonFloor++;bonusText=drawCard();}else if(G.bossBeaten||G.mode==="arena"&&Math.random()<.3){bonusText=drawCard();}
}else {S.losses++;S.streak=0;}
let heroResult="";if(G.heroUsed){const old=heroLevel(S.hero),earned=won?85:32;
S.heroXP[S.hero]=Math.min(100000,(S.heroXP[S.hero]||0)+earned);
const newest=heroLevel(S.hero);
heroResult='<div class="hero-xp-reward">👑 '+NAMES[S.hero]+' · +'+earned+' опыта'+(newest>old?' · НОВЫЙ УРОВЕНЬ '+newest+'!':'')+'</div>';
}
save();
$("modal").hidden=false;
let msg=won?"Победа воительниц!":"Армия отступила";
$("modal").innerHTML='<div class="modalbox"><div class="big">'+(won?"🏆":"🛡️")+'</div><h2>'+msg+'</h2><p>'+(won&&G.mode==="dungeon"?"Этаж башни пройден. В награду ты получила новую карту!":won&&S.stage===6?"Эпоха покорена. Теперь можно перейти в новую эпоху.":"Улучши войска и отправляйся в новый поход.")+'</p><p style="font-size:20px;color:#ffe0a0;font-weight:950">🪙 +'+fmt(reward)+'　💎 +'+gems+'</p>'+(bonusText?'<div class="reward-card">🎴 '+bonusText+'</div>':'')+(G.contract&&G.contractDone&&won?'<div class="hero-xp-reward">🎯 '+G.contract.title+' · бонус 🪙 '+G.contract.coins+' / 💎 '+G.contract.gems+'</div>':'')+'<p class="winning-streak">'+(won&&S.streak>1?'🔥 Серия побед: '+S.streak+' · награда увеличена!':'')+'</p>'+heroResult+'<div class="end-actions"><button class="go" data-a="newbattle">⚔️ Следующий бой</button><button class="chip" data-a="tab" data-tab="army">⬆️ Улучшения</button><button class="chip" data-a="tab" data-tab="other">🎯 Задания</button></div></div>';
render();
}
function tick(dt){
if(window.BattleFX)window.BattleFX.update(dt);
G.particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=150*dt;p.life-=dt;});G.particles=G.particles.filter(p=>p.life>0);
if(!G.playing||G.done||G.paused)return;G.time+=dt;G.food=Math.min(130,G.food+foodRate()*stance().food*dt);G.frozen=Math.max(0,G.frozen-dt);G.raging=Math.max(0,G.raging-dt);G.shake=Math.max(0,G.shake-dt);if(G.heroUsed&&!G.ultimateUsed&&heroAlive())G.heroCharge=Math.min(100,G.heroCharge+dt*1.9);G.battleMessageTime=Math.max(0,G.battleMessageTime-dt);
if(G.next<G.queue.length&&G.time>=G.queue[G.next].at){
 const w=G.queue[G.next];
 if(w.wave>G.wave){G.wave=w.wave;
  if(w.wave>1){G.food=Math.min(130,G.food+11);G.battleMessage="ВОЛНА "+w.wave+"! +11 ЕДЫ";G.battleMessageTime=2.3;sfx("unit");}
 }
 createTroop("e",w.k,null,!!w.boss);G.next++;
}
if(G.autoEnabled){
 G.autoWait+=dt;
 if(G.autoWait>=(S.auto?4.5:6.0)){
  const allied=G.troops.filter(t=>t.side==="p"&&t.hp>0);
  if(allied.length<16){
   const front=allied.filter(t=>t.k===0).length,ranged=allied.filter(t=>t.k===1).length;
   const choice=S.units[1]&&G.food>=cost(1)&&ranged<Math.ceil((front+1)*.75)?1:S.units[2]&&G.food>=cost(2)&&front>=3&&Math.random()<.30?2:0;
   if(G.food>=cost(choice)){G.food-=cost(choice);createTroop("p",choice,null);G.autoWait=0;}
   else if(G.food>=cost(0)){G.food-=cost(0);createTroop("p",0,null);G.autoWait=0;}
  }else G.autoWait=0;
 }
}
const boss=G.troops.find(t=>t.boss&&t.hp>0);
if(boss&&G.frozen<=0){G.bossPulse-=dt;if(G.bossPulse<=0){G.bossPulse=13;G.shake=.5;sfx("meteor");for(const ally of G.troops){if(ally.side==="p"){ally.hp-=boss.damage*.42*stance().health;sparkle(ally.x,ally.y-55,"#edb777",9);}}G.base-=boss.damage*.35*stance().base;G.battleMessage="Особая атака босса!";G.battleMessageTime=2.4;}}
for(const t of G.troops){if(t.hp<=0)continue;t.cd-=dt;t.attackPulse=Math.max(0,(t.attackPulse||0)-dt);t.hitPulse=Math.max(0,(t.hitPulse||0)-dt);t.moving=false;let nearest=null,dist=1e6;for(const e of G.troops){if(e.hp>0&&e.side!==t.side){let d=Math.abs(e.x-t.x);if(d<dist){nearest=e;dist=d;}}}
let direction=t.side==="p"?1:-1,baseDistance=t.side==="p"?361-t.x:t.x-28,target=nearest&&dist<baseDistance+4?nearest:null;
if(!(target?dist<t.range:baseDistance<t.range)){if(t.side==="e"&&G.frozen>0)continue;t.x+=t.speed*dt*direction;t.moving=true;t.x=Math.max(28,Math.min(361,t.x));continue;}
if(t.cd<=0&&(t.side==="p"||G.frozen<=0)){t.cd=t.rate;t.attackPulse=.19;if(t.side==="p"&&Math.random()<.18)sfx("hit");const critical=Math.random()<.085;let dmg=t.damage*(t.side==="p"&&G.raging>0?1.6:1)*(critical?1.6:1)*(t.side==="p"?stance().attack:1);if(t.side==="e"&&target&&target.side==="p")dmg*=stance().health;if(target){target.hp-=dmg;target.hitPulse=.22;
if(window.BattleFX)window.BattleFX.attack(t,target,dmg,t.k===1?"arrow":t.k===2?"magic":"slash",t.side==="e",critical);
if(t.side==="p"){if(G.heroUsed&&!G.ultimateUsed&&heroAlive())G.heroCharge=Math.min(100,G.heroCharge+Math.min(20,dmg*.28));sfx(critical?"critical":t.k===1?"arrow":t.k===2?"heavy":"blade",(t.x-195)/195);}
sparkle(target.x,target.y-30,t.side==="p"?"#FFE18A":"#D483FF",t.k===1?5:3);}
else if(t.side==="p"){G.enemy-=dmg*.8;G.damage+=dmg*.8;if(G.heroUsed&&!G.ultimateUsed&&heroAlive())G.heroCharge=Math.min(100,G.heroCharge+Math.min(20,dmg*.2));if(window.BattleFX)window.BattleFX.baseHit(359,190,true);sfx("fortress",.8);sparkle(359,190,"#FFCB72",3);}
else{G.base-=dmg*.8*stance().base;if(window.BattleFX)window.BattleFX.baseHit(29,190,false);sparkle(29,190,"#A4D7FF",3);}}}
for(let i=G.troops.length-1;i>=0;i--){let dead=G.troops[i];if(dead.hp<=0){sparkle(dead.x,dead.y-28,dead.side==="e"?"#ffc3b1":"#eb9bd9",dead.boss?28:10);if(dead.boss){G.bossBeaten=true;G.battleMessage="Вражеская предводительница повержена!";G.battleMessageTime=3;}if(dead.side==="e"){S.coins+=Math.round((9+dead.k*12)*(1+S.income*.16)*(dead.boss?8:1));S.kills++;G.dead++;G.food=Math.min(130,G.food+(dead.boss?20:3));}G.troops.splice(i,1);}}
checkContract();if(G.enemy<=0&&(!G.bossSpawned||G.bossBeaten))return complete(true);if(G.enemy<=0)G.enemy=1;if(G.base<=0)return complete(false);if(G.time>=275)return complete(G.enemy<G.enemyMax*.3&&(!G.bossSpawned||G.bossBeaten));
saveTimer+=dt;if(saveTimer>=10){saveTimer=0;save();}}
function unit(k){if(!G.playing&&!G.done&&G.tab==="battle"&&S.units[k])begin();if(!G.playing)return toast("Сначала начни битву");if(G.paused)return toast("Бой на паузе");if(!S.units[k])return toast("Открой отряд в развитии");if(G.food<cost(k))return toast("Недостаточно еды");G.food-=cost(k);createTroop("p",k,null);renderBattle();sfx("unit");}
function summonHero(){if(!G.playing&&!G.done&&G.tab==="battle")begin();if(!G.playing)return toast("Сначала начни битву");if(G.paused)return toast("Бой на паузе");if(G.heroUsed)return toast("Героиня уже призвана");G.heroUsed=true;createTroop("p",S.units[2]?2:S.units[1]?1:0,S.hero);toast(NAMES[S.hero]+" вступила в бой!");renderBattle();renderBattleQuick();sfx("hero");}
function cast(k){if(!G.playing&&!G.done&&G.tab==="battle")begin();if(!G.playing)return toast("Сначала начни битву");if(G.paused)return toast("Бой на паузе");if(G.used[k])return toast("Эти чары уже использованы");if(!S.loadout.includes(k))return toast("Выбери заклинание в магазине");G.used[k]=true;sfx(["ice","meteor","heal","rage","wind","hero"][k]||"magic");
if(k===0){G.frozen=5;toast("Враги заморожены!");}
if(k===1){for(const t of G.troops)if(t.side==="e"){t.hp-=76*attackPower("p")*(1+cardBonus("meteors"));sparkle(t.x,t.y-30,"#fce9e8",10);}G.enemy-=40*attackPower("p");toast("Метеорный дождь!");}
if(k===2){G.base=Math.min(G.baseMax,G.base+140*(1+cardBonus("healing")));for(const t of G.troops)if(t.side==="p")t.hp=Math.min(t.max,t.hp+t.max*(.5+cardBonus("healing")));toast("Армия исцелена!");}
if(k===3){G.raging=12;toast("Боевая ярость!");}
if(k===4){for(const t of G.troops)if(t.side==="e"){t.x=Math.min(359,t.x+48);t.hp-=20;}toast("Врагов отбросило!");}
if(k===5){let u=G.troops.find(t=>t.side==="p");createTroop("p",u?u.k:0,S.hero);createTroop("p",u?u.k:0,S.hero);toast("Двойники призваны!");}if(window.BattleFX)window.BattleFX.magic(k,G.troops);renderBattle();}
function renderBattleQuick(){
 const dock=$("battleQuick");if(!dock)return;
 if(G.tab!=="battle"||G.done){
  if(!dock.hidden){dock.hidden=true;dock.innerHTML="";dock.dataset.key="";}
  return;
 }
 dock.hidden=false;
 dock.className="battle-quick rock-dock "+(G.quickMagicOpen?"magic-open":"")+(G.playing?" in-battle":" pre-battle");
 
 const key=[G.quickMagicOpen?"magic":"troops",G.playing,S.era,S.skin,S.hero,S.timeline,
  S.units.join(","),S.loadout.join(","),Object.keys(G.used).filter(k=>G.used[k]).join(","),
  G.heroUsed,G.ultimateUsed,ultimateReady(),G.paused].join("|");
 if(dock.dataset.key===key&&dock.innerHTML){
  const food=dock.querySelector("#dockFood");
  if(food)food.textContent=Math.floor(G.food);
  const task=dock.querySelector("#dockContract");
  if(task)task.textContent=G.quickMagicOpen?"✦ МАГИЯ":G.playing&&G.contract?(G.contractDone?"✓ КОНТРАКТ":G.contract.title+" "+contractProgress()+"/"+G.contract.goal):"⚡ ВЫБЕРИ ВОИТЕЛЬНИЦУ";
  const auto=dock.querySelector("#dockAuto");if(auto)auto.textContent=G.autoEnabled?"▣ АВТО":"▫ АВТО";
  const charge=dock.querySelector("[data-hero-charge]");
  if(charge)charge.textContent=G.ultimateUsed?"ИСПОЛЬЗОВАН":Math.floor(G.heroCharge)+"%";
  if(dock.querySelectorAll)dock.querySelectorAll(".quick-button.troop").forEach((button,k)=>{
   const ready=!!S.units[k]&&!G.paused&&(!G.playing||G.food>=cost(k));
   const bar=button.querySelector&&button.querySelector(".recruit-meter i");
   if(bar&&bar.style)bar.style.width=(!G.playing?100:Math.min(100,G.food/cost(k)*100))+"%";
   if(button.classList){button.classList.toggle("ready",ready);button.classList.toggle("charging",!!S.units[k]&&!ready);}
  });
  return;
 }
 dock.dataset.key=key;
 const heroAction=G.heroUsed?
  '<button class="quick-button hero '+(ultimateReady()?"ready":"inactive")+'" '+(!ultimateReady()?'disabled':'')+' data-a="ultimate" aria-label="'+signature().name+'"><span class="quick-portrait portrait-power">'+signature().icon+'</span><span class="quick-name">ПРИЁМ</span><span class="quick-price" data-hero-charge>'+(G.ultimateUsed?"ИСПОЛЬЗОВАН":Math.floor(G.heroCharge)+"%")+'</span></button>':
  '<button class="quick-button hero" '+(G.paused?'disabled':'')+' data-a="hero" aria-label="Призвать '+NAMES[S.hero]+'"><span class="quick-portrait hero-face">'+heroSvg(S.hero)+'</span><span class="quick-name">'+NAMES[S.hero]+'</span><span class="quick-price">ПРИЗВАТЬ</span></button>';
 let cards="";
 if(G.quickMagicOpen){
  cards='<button class="quick-button back" data-a="quickmagic" aria-label="Вернуться к отрядам"><span class="quick-portrait rock-glyph">↩</span><span class="quick-name">ОТРЯДЫ</span><span class="quick-price">НАЗАД</span></button>';
  for(const k of S.loadout.slice(0,3)){
   cards+='<button class="quick-button spellkey '+(G.used[k]?"inactive":"")+'" '+(G.used[k]||G.paused?'disabled':'')+' data-a="magic" data-k="'+k+'" aria-label="'+MAGICS[k][0]+'"><span class="quick-portrait rock-glyph">'+MAGICS[k][1]+'</span><span class="quick-name">'+MAGICS[k][0]+'</span><span class="quick-price">'+(G.used[k]?"ИСПОЛЬЗ.":"ПРИМЕНИТЬ")+'</span></button>';
  }
  cards+=heroAction;
 }else{
  cards=a().units.map((t,k)=>{
   const own=!!S.units[k],ready=own&&!G.paused&&(!G.playing||G.food>=cost(k));
   const price=k===1?175:420;
   const unitSvg=window.QueenArt.figureSvg((S.era*3+k*5+4)%18,k,S.era,false,S.skin);
   return '<button class="quick-button troop troop-'+k+' '+(!own?"locked":ready?"ready":"charging")+'" data-a="'+(own?"unit":"unlock")+'" data-k="'+k+'" aria-label="'+t[0]+(own?": нужно "+cost(k)+" еды":": открыть за "+price+" монет")+'">'+
    '<span class="quick-portrait">'+unitSvg+'</span><span class="quick-name">'+t[0]+'</span><span class="quick-price">'+(own?(G.playing?"🍎 "+cost(k):"⚡ В БОЙ"):"🪙 "+price)+'</span><span class="recruit-meter" aria-hidden="true"><i style="width:'+(own?(!G.playing?100:Math.min(100,G.food/cost(k)*100)):0)+'%"></i></span></button>';
  }).join("")+heroAction+
  '<button class="quick-button magic" data-a="quickmagic" aria-label="Выбрать магию"><span class="quick-portrait rock-glyph">✦</span><span class="quick-name">МАГИЯ</span><span class="quick-price">3 ПРИЁМА</span></button>';
 }
 dock.innerHTML='<div class="rock-dock-heading"><strong id="dockContract" aria-label="Задание боя">'+(G.quickMagicOpen?"✦ МАГИЯ":G.playing&&G.contract?(G.contractDone?"✓ КОНТРАКТ":G.contract.title+" "+contractProgress()+"/"+G.contract.goal):"⚡ ВЫБЕРИ ВОИТЕЛЬНИЦУ")+'</strong><div class="rock-dock-meta"><span>🍎 <b id="dockFood">'+Math.floor(G.food)+'</b></span><button id="dockAuto" data-a="auto" aria-label="Автопризыв воительниц">'+(G.autoEnabled?"▣ АВТО":"▫ АВТО")+'</button><button data-a="battlemenu" aria-label="Открыть меню игры">☰ МЕНЮ</button></div></div>'+
 '<div class="rock-dock-grid">'+cards+'</div>';
}
function renderNav(){const reward=readyMissionIndex()>=0;const tabs=[["battle","⚔️","Бой"],["army","⬆️","Улучшить"],["heroes","👑","Герои"],["shop","🛍️","Магазин"],["other","🎯","Цели"]];$("nav").innerHTML=tabs.map(t=>'<button data-a="tab" data-tab="'+t[0]+'" class="'+(G.tab===t[0]||(t[0]==="other"&&(G.tab==="cards"||G.tab==="dungeon"))?"active":"")+'"><span>'+t[1]+(t[0]==="other"&&reward?'<i class="nav-reward"></i>':'')+'</span>'+t[2]+'</button>').join("");}
function renderBattle(){
$("topchip").className="topchip "+(G.contractDone?"contract-done":"");
$("eraText").textContent=a().era+" · Линия "+S.timeline;$("eraName").textContent=a().title;$("modeBtn").textContent="Режим: "+(G.mode==="story"?"Поход":G.mode==="arena"?"Арена":"Башня")+" ▾";
$("topchip").innerHTML='<span>'+(G.mode==="dungeon"?"🏯 "+S.dungeonFloor:"⚔️ "+Math.min(5,S.stage)+"/5")+'</span><span>'+(G.playing?"⚡ ВОЛНА "+Math.max(1,G.wave)+"/"+(G.mode==="dungeon"?2:3):"⏱ "+Math.floor(G.time)+" с")+'</span><span aria-label="'+(G.contract?G.contract.desc:"Боевой контракт")+'">'+contractLabel()+'</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";
$("units").innerHTML=a().units.map((t,k)=>'<button class="unit '+(!S.units[k]?"locked":G.playing&&G.food>=cost(k)?"ready":"")+'" aria-label="'+t[0]+'" data-a="'+(S.units[k]?"unit":"unlock")+'" data-k="'+k+'"><span class="art">'+window.QueenArt.figureSvg((S.era*3+k*5+4)%18,k,S.era,false,S.skin)+'</span><strong>'+t[0]+'</strong><span class="cost">'+(S.units[k]?"🍎 "+cost(k):"🔒 Открыть")+'</span></button>').join("");
$("spells").innerHTML=S.loadout.slice(0,3).map(k=>'<button class="spell" '+(G.used[k]||!G.playing?"disabled":"")+' data-a="magic" data-k="'+k+'"><span>'+MAGICS[k][1]+'</span><small>'+MAGICS[k][0]+'</small></button>').join("")+'<button class="spell" '+(!G.heroUsed?'data-a="hero" '+(!G.playing?'disabled':''):'data-a="ultimate" '+(!ultimateReady()?'disabled':''))+'><span>'+(!G.heroUsed?'👸':signature().icon)+'</span><small>'+(!G.heroUsed?NAMES[S.hero]:'Приём '+Math.floor(G.heroCharge)+'%')+'</small></button>';
$("fightaction").innerHTML=(!G.playing)?'<button class="go" data-a="start">⚡ НАЧАТЬ БОЙ</button>':G.playing?'<div class="battletools"><button class="chip" data-a="pause">'+(G.paused?"▶ ПРОДОЛЖИТЬ":"Ⅱ ПАУЗА")+'</button><button class="chip tactic '+G.stance+'" data-a="stance" title="Баланс → Напор → Защита">'+stance().icon+' '+stance().name+'</button><button class="chip" data-a="speed">⏩ ×'+G.speed+'</button><button class="chip" data-a="soundmusic">'+(S.music!==false?"♫ ЗВУК":"♫ ВКЛ")+'</button></div>':"";
renderHeroStatus();$("hint").textContent=G.playing?"Нажимай на подсвеченные отряды, чтобы выпускать бойцов":G.mode==="dungeon"?"Башня: победи босса и получи карту":S.stage===6?"Пять побед! Новая эпоха ждёт в «Улучшить»":"Начни сражение или улучши армию за монеты";$("battleShortcuts").innerHTML=G.playing?"":'<button data-a="tab" data-tab="army">⬆️ Улучшить армию</button><button data-a="tab" data-tab="other">🎯 Задания</button>';}

function updateBossBar(){
const boss=G.troops.find(t=>t.boss&&t.hp>0),bar=$("bossbar"),notice=$("battleAlert");
bar.hidden=!boss;
if(boss)bar.innerHTML='<strong>👑 БОСС</strong><div class="boss-track"><i style="width:'+Math.max(0,Math.round(boss.hp/boss.max*100))+'%"></i></div><span>'+Math.max(0,Math.floor(boss.hp/boss.max*100))+'%</span>';
notice.hidden=!(G.battleMessageTime>0);if(!notice.hidden)notice.textContent=G.battleMessage;
}
function updateHud(){
$("topchip").className="topchip "+(G.contractDone?"contract-done":"");
$("topchip").innerHTML='<span>'+(G.mode==="dungeon"?"🏯 "+S.dungeonFloor:"⚔️ "+Math.min(5,S.stage)+"/5")+'</span><span>'+(G.playing?"⚡ ВОЛНА "+Math.max(1,G.wave)+"/"+(G.mode==="dungeon"?2:3):"⏱ "+Math.floor(G.time)+" с")+'</span><span aria-label="'+(G.contract?G.contract.desc:"Боевой контракт")+'">'+contractLabel()+'</span>';
$("hpbar").innerHTML='<b>🏰</b><div class="track"><i style="width:'+Math.max(0,G.base/G.baseMax*100)+'%"></i></div><div class="track enemy"><i style="width:'+Math.max(0,G.enemy/G.enemyMax*100)+'%"></i></div><b>🏯</b>';
$("foodValue").textContent=Math.floor(G.food);$("foodRate").textContent="+"+foodRate().toFixed(1)+"/с";$("foodFill").style.width=(G.food/130*100)+"%";updateBossBar();renderHeroStatus();renderBattleQuick();if(document.querySelectorAll){document.querySelectorAll("#units .unit").forEach((el,k)=>{if(el.classList&&el.classList.toggle)el.classList.toggle("ready",!!S.units[k]&&G.playing&&!G.paused&&G.food>=cost(k));});}
}
function listHead(title,desc){return '<div class="herohead"><h2>'+title+'</h2><p>'+desc+'</p></div>';}
const FREE_MAX={food:12,base:10,attack:10,vital:10,income:10,skin:24,relic:10};
function levelPrice(id){return 0;} // No in-game or real currency costs.
function upgradeMaxed(id){return Object.prototype.hasOwnProperty.call(FREE_MAX,id)&&S[id]>=FREE_MAX[id];}
function starterKit(){
 if(S.freeKitClaimed)return toast("Рок-набор уже получен");
 S.freeKitClaimed=true;
 S.units=[1,1,1];
 S.heroes=Array.from(new Set([...(S.heroes||[]),0,1,2]));
 S.magic=Array.from(new Set([...(S.magic||[]),0,1,2,3]));
 S.loadout=[0,1,3];S.auto=true;G.autoEnabled=true;
 S.skin=Math.min(FREE_MAX.skin,S.skin+1);
 S.cards[3]=Math.max(1,S.cards[3]||0);
 S.cards[5]=Math.max(1,S.cards[5]||0);
 S.purchases=(S.purchases||0)+1;
 save();render();sfx("buy");
 toast("Рок-набор: 3 отряда, героини, магия, облик, карты и АВТО!");
}
function getFreeCard(i){
 if(!Number.isInteger(i)||i<0||i>=CARDS.length)return;
 if(S.cards[i]>=5)return toast("Карта уже улучшена до максимума");
 S.cards[i]=Math.min(5,(S.cards[i]||0)+1);
 S.purchases=(S.purchases||0)+1;
 save();render();sfx("card");
 toast(CARDS[i][0]+": уровень "+S.cards[i]+" — бесплатно");
}
function army(){let v=listHead("Развитие империи","Усиления, новые отряды и переходы между эпохами. Монеты зарабатываются даже при поражении.");
v+='<div class="sectionname"><b>УЛУЧШЕНИЯ</b></div>';
for(const id of ["food","base","attack","vital","income"]){let x=SHOP.find(t=>t[0]===id);v+='<div class="row"><span class="icon">'+x[1]+'</span><div class="desc"><strong>'+x[2]+'</strong><p>'+x[3]+' · ур. '+S[id]+'</p></div><button data-a="buy" data-id="'+id+'">🪙 '+fmt(levelPrice(id))+'</button></div>';}
v+='<div class="sectionname"><b>ОТРЯДЫ ЭПОХИ</b></div><div class="grid2">';
a().units.forEach((t,k)=>{v+='<div class="tile"><div class="icon">'+t[1]+'</div><strong>'+t[0]+'</strong><p>'+["Ближний бой и защита","Урон с расстояния","Мощный тяжёлый отряд"][k]+'</p><button data-a="unlock" data-k="'+k+'">'+(S.units[k]?"✓ Открыто":"🪙 "+(k===1?175:420))+'</button></div>';});v+='</div><hr class="divider">';
let next=AGES[(S.era+1)%7],price=evolutionPrice();v+=listHead("✨ Новая эпоха",a().title+" → "+next.title+". Войска и улучшения эпохи сбрасываются, а купленные героини, реликвии и магия остаются.");
v+='<button class="go" style="width:100%;margin:10px 0" data-a="evolve">'+(S.stage<6?"Выиграй пять битв • "+(S.stage-1)+"/5":"ЭВОЛЮЦИЯ • 🪙 "+fmt(price))+'</button>';return v;}
function heroes(){let v=listHead("Глянцевые королевы","18 взрослых мультяшных героинь с разными причёсками, образами и блестящими лаковыми доспехами.");v+='<section class="queen-feature"><div class="queen-feature-art">'+heroSvg(S.hero)+'</div><div class="queen-feature-copy"><small>ТВОЯ КОМАНДИРША • ВЫБРАНА</small><h3>'+NAMES[S.hero]+'</h3><p><b>'+signature().name+'</b> — '+signature().desc+'</p><div class="hero-rank"><strong>УРОВЕНЬ '+heroLevel()+'</strong><small>'+(heroLevel()===5?'Максимальное мастерство':'До нового уровня: '+heroProgress().remaining+' опыта')+'</small><div class="hero-rank-track"><i style="width:'+heroProgress().value+'%"></i></div></div><div class="queen-feature-actions"><button data-a="tab" data-tab="battle">⚔️ В бой</button><button data-a="buy" data-id="skin">✨ Лаковый облик · 💎 '+fmt(levelPrice("skin"))+'</button></div></div></section>';
v+='<div class="sectionname"><b>КОЛЛЕКЦИЯ</b><small>'+S.heroes.length+' / 18 открыто</small></div><div class="herogrid">';
for(let i=0;i<18;i++){let own=S.heroes.includes(i),selected=S.hero===i;v+='<div class="herocard '+(selected?"on":"")+'">'+heroSvg(i)+'<strong>'+NAMES[i]+'</strong><small>'+["Защитница","Снайперша","Королева"][i%3]+' · ур. '+heroLevel(i)+'</small><button data-a="select" data-k="'+i+'">'+(selected?"✓ Выбрана":own?"Выбрать":"💎 "+(28+i*8))+'</button></div>';}
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
 '<button data-a="soundmusic">'+(S.music===false?"🎼 Включить музыку":"🎼 Выключить музыку")+'</button>'+'<button data-a="soundfx">'+(S.fx===false?"⚡ Включить эффекты":"⚡ Выключить эффекты")+'</button>'+'<button data-a="soundvolume">🔊 Громкость музыки '+Math.round(S.musicVolume*100)+'%</button>'+
 '<button data-a="help">❔ Как играть</button></div>';
 v+='<p class="micro">Игра полностью офлайн после первой загрузки. Сохранение хранится на этом устройстве. Перед очисткой Safari используй «Сохранить прогресс».</p>';
 return v;
}
function applyMobileLayout(){
 const root=$("app");if(!root||!root.classList)return;
 const h=Number(window.visualViewport&&window.visualViewport.height)||Number(window.innerHeight)||800;
 const w=Number(window.visualViewport&&window.visualViewport.width)||Number(window.innerWidth)||390;
 const cockpit=G.tab==="battle"&&!G.done;
 root.classList.toggle("combat-cockpit",cockpit);
 root.classList.toggle("combat-active",G.tab==="battle"&&G.playing&&!G.done);
 root.classList.toggle("compact-height",h<765);
 root.classList.toggle("very-short",h<675);
 root.classList.toggle("compact-width",w<374);
 if(document.body&&document.body.classList)document.body.classList.toggle("game-cockpit",cockpit);
}
function syncArenaLayout(){
 const root=$("app");if(!root||!root.classList||!root.classList.contains("combat-cockpit"))return;
 const vp=window.visualViewport||null;
 const height=Number(vp&&vp.height)||Number(window.innerHeight)||800;
 const width=Number(vp&&vp.width)||Number(window.innerWidth)||390;
 const rect=(e,fallback)=>{
  if(!e||e.hidden)return 0;
  const b=e.getBoundingClientRect&&e.getBoundingClientRect();
  return b&&Number(b.height)>0?Number(b.height):fallback;
 };
 const header=$("gameHeader")||document.querySelector("header");
 const headerH=rect(header,height<500?42:49);
 const dockH=rect($("battleQuick"),height<540?128:height<750?152:165);
 const actionH=rect($("fightaction"),G.playing?43:53);
 // Budget includes the iOS status bar, corners, Home indicator and inter-row gaps.
 const reserve=height<480?10:height<650?29:50;
 const available=Math.max(58,height-headerH-dockH-actionH-reserve-18);
 const widthLimit=(Math.min(480,width)-18)*300/390;
 const arena=Math.max(58,Math.min(available,widthLimit));
 if(root.style&&root.style.setProperty){
  root.style.setProperty("--arena-h",arena.toFixed(1)+"px");
  root.style.setProperty("--arena-w",(arena*390/300).toFixed(1)+"px");
 }
}
function render(){ applyMobileLayout();ensureMissions();renderAudioDock();$("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);$("champ").innerHTML=champ();let battle=G.tab==="battle";$("battlePage").hidden=!battle;$("otherPage").hidden=battle;if(battle)renderBattle();else $("otherPage").innerHTML=G.tab==="army"?army():G.tab==="heroes"?heroes():G.tab==="shop"?shop():G.tab==="cards"?cardPage():G.tab==="dungeon"?dungeonPage():other();renderNav();advisorCard();renderBattleQuick();syncArenaLayout();}
function setTab(tab){
 if(G.playing&&G.tab==="battle"&&tab!=="battle"){G.paused=true;if(window.CrownAudio)window.CrownAudio.setScene("pause");}
 G.tab=tab;closeModal();render();window.scrollTo(0,0);
}
function showBattleMenu(){
 if(G.playing&&!G.paused){G.paused=true;if(window.CrownAudio)window.CrownAudio.setScene("pause");}
 renderBattle();renderBattleQuick();
 $("modal").hidden=false;
 $("modal").innerHTML='<div class="modalbox rock-battle-menu"><h2>⚡ БОЕВОЕ МЕНЮ</h2><p>Управление сражением и развитие империи — в одном меню.</p>'+
 '<button class="go" data-a="resumebattle">'+(G.playing?'▶ ПРОДОЛЖИТЬ БОЙ':'⚡ НАЧАТЬ БОЙ')+'</button><div class="rock-menu-links">'+
 '<button data-a="tab" data-tab="army">⬆️ УЛУЧШЕНИЯ</button>'+
 '<button data-a="tab" data-tab="heroes">👑 ГЕРОИНИ</button>'+
 '<button data-a="tab" data-tab="shop">🛍️ МАГАЗИН</button>'+
 '<button data-a="tab" data-tab="other">🎯 ЗАДАНИЯ</button></div></div>';
}
function resumeBattleMenu(){
 closeModal();if(!G.playing&&!G.done){begin();return;}if(G.playing){G.paused=false;if(window.CrownAudio)window.CrownAudio.setScene(G.troops.some(t=>t.boss&&t.hp>0)?"boss":"battle");renderBattle();renderBattleQuick();}
}

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
function unlock(k){
 if(!Number.isInteger(k)||k<0||k>2)return;
 if(S.units[k])return toast("Отряд уже открыт");
 S.units[k]=1;
 S.purchases=(S.purchases||0)+1;
 save();render();sfx("buy");
 toast(a().units[k][0]+" открыта бесплатно!");
}
function purchase(id){
 const item=SHOP.find(t=>t[0]===id);if(!item)return;
 if(upgradeMaxed(id))return toast("Максимальный уровень уже достигнут");
 if(id==="auto"&&S.auto)return toast("Автопризыв уже открыт");
 if(id.startsWith("magic")&&S.magic.includes(Number(id.slice(5)))){
  const spell=Number(id.slice(5));
  if(S.loadout.includes(spell))return toast("Эта магия уже в колоде");
  S.loadout[2]=spell;save();render();sfx("buy");return toast(MAGICS[spell][0]+" выбрана для боя");
 }
 S.purchases=(S.purchases||0)+1;
 if(["food","base","attack","vital","income","skin","relic"].includes(id))S[id]++;
 else if(id==="auto"){S.auto=true;G.autoEnabled=true;}
 else if(id.startsWith("magic")){
  const spell=Number(id.slice(5));
  S.magic=Array.from(new Set([...S.magic,spell]));
  S.loadout[2]=spell;
 }else if(id==="cardChest"){
  if(S.cards.every(n=>n>=5)){save();render();return toast("Все карты уже максимального уровня");}
  const available=S.cards.map((n,i)=>n<5?i:-1).filter(i=>i>=0);
  const pick=available[Math.floor(Math.random()*available.length)];
  S.cards[pick]=Math.min(5,(S.cards[pick]||0)+1);
  toast("🎴 "+CARDS[pick][0]+" · уровень "+S.cards[pick]);
 }else if(id==="chest"){
  if(Math.random()<.3){S.gems+=25;toast("Сундук: +25 кристаллов");}
  else{S.coins+=Math.round(180+Math.random()*220);toast("Сундук: монеты в коллекцию!");}
 }
 save();render();sfx(id==="cardChest"?"card":"buy");
 if(id!=="chest"&&id!=="cardChest")toast(item[2]+" — бесплатно!");
}
function choose(i){
 if(!Number.isInteger(i)||i<0||i>=18)return;
 if(G.playing)return toast("Смени командиршу после боя");
 if(!S.heroes.includes(i)){S.heroes.push(i);toast(NAMES[i]+" присоединилась бесплатно!");}
 S.hero=i;save();render();
}
function evolutionPrice(){return 0;}
function evolve(){
 if(S.stage<6)return toast("Выиграй пять битв, чтобы открыть новую эпоху");
 S.era++;if(S.era>=7){S.era=0;S.timeline++;S.gems+=85;}
 S.stage=1;
 // Keep previously chosen levels and troops: no repetitive reacquisition.
 G.done=false;G.playing=false;G.troops=[];
 G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;
 save();setTab("battle");toast("Новая эпоха бесплатно: "+a().title);
}
function daily(){let today=todayKey();if(S.claimed===today)return toast("Сегодня уже получено");S.claimed=today;S.coins+=100;S.gems+=20;save();render();toast("Подарок: 100 монет и 20 кристаллов!");}
function backup(){const blob=new Blob([JSON.stringify({app:"queen-empire-offline",version:1,state:S},null,2)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="voitel-nicy-save.json";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),2000);}
function restore(){let input=$("savefile");input.value="";input.onchange=()=>{let file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{let v=JSON.parse(reader.result);if(v.app!=="queen-empire-offline"||!v.state)throw Error("bad");S=Object.assign(defaults(),v.state);S.heroXP=Array.isArray(S.heroXP)?Array.from({length:18},(_,i)=>Math.max(0,Math.min(100000,Number(S.heroXP[i])||0))):Array(18).fill(0);if(!Array.isArray(S.heroes)||!Array.isArray(S.units))throw Error("bad");save();G.playing=false;G.done=false;G.troops=[];G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;setTab("battle");toast("Сохранение восстановлено");}catch(e){toast("Не удалось прочитать сохранение");}};reader.readAsText(file);};input.click();}
document.addEventListener("click",e=>{let el=e.target.closest("[data-a]");if(!el)return;let action=el.dataset.a,k=Number(el.dataset.k)||0;
if(["tab","mode","setmode","deckslot","pause","speed","shopfilter","help","close","export","import"].includes(action))sfx("click");
switch(action){case"tab":setTab(el.dataset.tab);break;case"battlemenu":showBattleMenu();break;case"resumebattle":resumeBattleMenu();break;case"quickmagic":G.quickMagicOpen=!G.quickMagicOpen;renderBattleQuick();sfx("click");break;case"mentor":followAdvice();break;case"claimquest":claimMission(k);break;case"shopfilter":G.shopFilter=el.dataset.filter;render();break;case"deckslot":G.deckSlot=k;render();break;case"equip":equipCard(k);break;case"dungeon":if(G.playing){toast("Закончи текущую битву");break;}G.mode="dungeon";G.done=false;setTab("battle");toast("Башня королев · этаж "+S.dungeonFloor);break;case"unit":unit(k);break;case"unlock":unlock(k);break;case"hero":summonHero();break;case"ultimate":ultimate();break;case"magic":cast(k);G.quickMagicOpen=false;renderBattleQuick();break;case"buy":purchase(el.dataset.id);break;case"starterkit":starterKit();break;case"getcard":getFreeCard(k);break;case"select":choose(k);break;case"evolve":evolve();break;case"claim":daily();break;case"start":case"newbattle":begin();break;case"close":closeModal();break;case"mode":showModePicker();break;case"setmode":chooseMode(el.dataset.mode);break;case"pause":G.paused=!G.paused;if(window.CrownAudio)window.CrownAudio.setScene(G.paused?"pause":"battle");renderBattle();renderBattleQuick();renderAudioDock();break;case"auto":G.autoEnabled=!G.autoEnabled;G.autoWait=0;renderBattleQuick();toast(G.autoEnabled?"Автопризыв включён · можно управлять вручную":"Автопризыв выключен");break;case"speed":G.speed=G.speed===1?2:1;renderBattle();break;case"stance":changeStance();break;case"help":showHelp();break;case"sound":S.sound=S.sound===false;syncAudio();save();render();sfx("click");break;case"soundmusic":S.music=S.music===false;S.sound=true;syncAudio();if(window.CrownAudio)window.CrownAudio.unlock();save();render();sfx("click");break;case"soundfx":S.fx=S.fx===false;S.sound=true;syncAudio();save();render();sfx("click");break;case"soundvolume":{const levels=[.35,.52,.68,.85,1];let i=levels.findIndex(v=>Math.abs(v-S.musicVolume)<.02);S.musicVolume=levels[(i+1)%levels.length];syncAudio();save();render();sfx("click");break;}case"export":backup();break;case"import":restore();break;}
});
function frame(now){let dt=Math.min(.045,(now-last)/1000||.016);last=now;ambientTime+=dt;if(!G.paused){for(let i=0;i<G.speed;i++)tick(dt);}if(G.tab==="battle"&&!document.hidden)draw();uiTimer+=dt;if(uiTimer>.28){uiTimer=0;if(G.tab==="battle")updateHud();advisorCard();if(window.CrownAudio)window.CrownAudio.sceneTick({playing:G.playing,paused:G.paused,boss:G.troops.some(t=>t.boss&&t.hp>0),done:G.done,era:S.era});renderAudioDock();$("gold").textContent=fmt(S.coins);$("gems").textContent=fmt(S.gems);}requestAnimationFrame(frame);}
function resize(){let d=Math.min(devicePixelRatio||1,2);canvas.width=W*d;canvas.height=H*d;c.setTransform(d,0,0,d,0,0);draw();}
window.addEventListener("pagehide",save);document.addEventListener("visibilitychange",()=>{if(document.hidden)save();});window.addEventListener("resize",()=>{applyMobileLayout();syncArenaLayout();resize();});if(window.visualViewport&&window.visualViewport.addEventListener)window.visualViewport.addEventListener("resize",()=>{applyMobileLayout();syncArenaLayout();});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
G.baseMax=baseHP();G.base=G.baseMax;G.enemyMax=enemyHP();G.enemy=G.enemyMax;render();resize();requestAnimationFrame(frame);
if(S.first){S.first=false;save();setTimeout(showHelp,750);}
})();