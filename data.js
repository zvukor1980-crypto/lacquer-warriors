/* Лаковые воительницы — данные, магазин, миграция сохранений */
(function (global) {
  const ERAS = [
    {
      id: "stone", name: "Каменный век", short: "Камень", year: "70 000 до н.э.",
      units: [
        { name: "Дубина", role: "Ближний бой", food: 3, hp: 28, dmg: 5, range: 34, speed: 30, cd: 0.7, proj: "none" },
        { name: "Метательница", role: "Дальний бой", food: 5, hp: 16, dmg: 6, range: 128, speed: 28, cd: 0.85, proj: "stone" },
        { name: "Наездница", role: "Танк", food: 7, hp: 70, dmg: 9, range: 38, speed: 24, cd: 1.05, proj: "none" }
      ]
    },
    {
      id: "farm", name: "Земледелие", short: "Ферма", year: "12 000 до н.э.",
      units: [
        { name: "Фермерша", role: "Ближний бой", food: 5, hp: 48, dmg: 8, range: 36, speed: 30, cd: 0.7, proj: "none" },
        { name: "Пращница", role: "Дальний бой", food: 8, hp: 26, dmg: 10, range: 136, speed: 28, cd: 0.85, proj: "stone" },
        { name: "Коса", role: "Танк", food: 12, hp: 120, dmg: 15, range: 40, speed: 23, cd: 1.05, proj: "none" }
      ]
    },
    {
      id: "sparta", name: "Спарта", short: "Спарта", year: "1000 до н.э.",
      units: [
        { name: "Гоплитка", role: "Ближний бой", food: 7, hp: 80, dmg: 13, range: 36, speed: 31, cd: 0.68, proj: "none" },
        { name: "Лучница", role: "Дальний бой", food: 12, hp: 42, dmg: 16, range: 148, speed: 28, cd: 0.82, proj: "arrow" },
        { name: "Всадница", role: "Танк", food: 16, hp: 200, dmg: 24, range: 42, speed: 32, cd: 1.0, proj: "none" }
      ]
    },
    {
      id: "ren", name: "Ренессанс", short: "Ренессанс", year: "1500",
      units: [
        { name: "Фехтовальщица", role: "Ближний бой", food: 9, hp: 130, dmg: 22, range: 36, speed: 31, cd: 0.65, proj: "none" },
        { name: "Мушкетёрша", role: "Дальний бой", food: 15, hp: 70, dmg: 28, range: 160, speed: 27, cd: 0.95, proj: "bullet" },
        { name: "Пушка", role: "Танк", food: 21, hp: 260, dmg: 40, range: 150, speed: 18, cd: 1.4, aoe: 48, proj: "cannon" }
      ]
    },
    {
      id: "modern", name: "Современность", short: "Модерн", year: "1990",
      units: [
        { name: "Штурмовик", role: "Ближний бой", food: 11, hp: 210, dmg: 34, range: 40, speed: 32, cd: 0.6, proj: "none" },
        { name: "Стрелок", role: "Дальний бой", food: 18, hp: 110, dmg: 42, range: 170, speed: 28, cd: 0.75, proj: "bullet" },
        { name: "Танк", role: "Танк", food: 26, hp: 420, dmg: 55, range: 150, speed: 20, cd: 1.2, aoe: 52, proj: "cannon" }
      ]
    },
    {
      id: "space", name: "Космос", short: "Космос", year: "2100",
      units: [
        { name: "Астрорыцарь", role: "Ближний бой", food: 10, hp: 300, dmg: 50, range: 38, speed: 34, cd: 0.58, proj: "none" },
        { name: "Солдат", role: "Дальний бой", food: 17, hp: 160, dmg: 58, range: 175, speed: 30, cd: 0.7, proj: "laser" },
        { name: "Корабль", role: "Танк", food: 23, hp: 560, dmg: 80, range: 160, speed: 26, cd: 1.1, aoe: 56, proj: "laser" }
      ]
    }
  ];

  const FACTIONS = {
    player: { id: "israel", name: "Израиль", short: "Израиль" },
    enemy: { id: "legion", name: "Тёмный легион", short: "Легион" }
  };

  const EVOLVE_COST = [400, 1200, 3500, 9000, 22000];
  const UNIT2_COST = [120, 220, 400, 700, 1200, 2000];
  const UNIT3_COST = [250, 480, 850, 1500, 2600, 4200];

  const SKILLS = [
    { id: "airstrike", name: "Авиаудар", icon: "✈️", desc: "Самолёты бьют всех врагов на поле.", cost: 80, color: "#5ba7ff" },
    { id: "freeze", name: "Заморозка", icon: "❄️", desc: "Враги не движутся и не бьют 3 сек.", cost: 60, color: "#7ec8f0" },
    { id: "shield", name: "Купол щита", icon: "🛡️", desc: "Щит поглощает урон по вашей базе.", cost: 70, color: "#f5c542" },
    { id: "heal", name: "Волна лечения", icon: "💚", desc: "Лечит всех ваших юнитов и немного базу.", cost: 55, color: "#7bc96a" },
    { id: "meteor", name: "Метеорит", icon: "☄️", desc: "Падает в центр и крушит врагов в зоне.", cost: 90, color: "#e85d4c" },
    { id: "clone", name: "Клоны", icon: "👯", desc: "Создаёт копии ваших воительниц на поле.", cost: 100, color: "#c9a0e8" }
  ];

  const HEROES = [
    { id: "daliya", name: "Далия", title: "Интендант", icon: "🌾", desc: "+15% к производству еды", cost: 400, look: { era: 1, type: 0 } },
    { id: "noa", name: "Ноа", title: "Наставница", icon: "⚔️", desc: "+12% к урону юнитов", cost: 500, look: { era: 2, type: 0 } },
    { id: "yael", name: "Яэль", title: "Страж базы", icon: "🏰", desc: "+20% к здоровью базы", cost: 600, look: { era: 4, type: 0 } },
    { id: "miri", name: "Мири", title: "Казначей", icon: "⭐", desc: "+15% к монетам с боя", cost: 550, look: { era: 3, type: 1 } }
  ];

  const SKINS = [
    { id: "israel", name: "Израильский лак", desc: "Бело-голубая форма по умолчанию", cost: 0 },
    { id: "gold", name: "Золотой лак", desc: "Сияющая золотая броня", cost: 250 },
    { id: "teal", name: "Бирюзовый лак", desc: "Морская бирюза и белый", cost: 250 },
    { id: "scarlet", name: "Алый лак", desc: "Яркий алый с белой отделкой", cost: 250 },
    { id: "opal", name: "Опаловый лак", desc: "Перламутр с радужным бликом", cost: 400 }
  ];

  function foodRate(level) { return Math.round((1.1 + level * 0.28) * 100) / 100; }
  function foodUpgradeCost(level) { return Math.floor(10 * Math.pow(1.38, level)); }
  function baseHp(level) { return 40 + level * 18; }
  function baseUpgradeCost(level) { return Math.floor(22 * Math.pow(1.42, level)); }
  function polishBonus(level) { return level * 0.08; }
  function polishCost(level) { return Math.floor(150 * Math.pow(1.48, level)); }
  function enemyBaseHp(era, battle) {
    const eraMul = [1, 1.6, 2.6, 4.2, 6.6, 10][era];
    return Math.round(48 * eraMul * Math.pow(1.16, battle - 1));
  }
  function enemyStatScale(battle) { return 1 + (battle - 1) * 0.1; }
  function enemyFoodRate(era, battle) { return (0.9 + era * 0.15) * (1 + (battle - 1) * 0.08); }

  function critUpgradeCost(level) { return Math.floor(180 * Math.pow(1.5, level)); }
  function coinUpgradeCost(level) { return Math.floor(200 * Math.pow(1.5, level)); }
  function foodCapUpgradeCost(level) { return Math.floor(160 * Math.pow(1.45, level)); }
  function turretCost(level) { return [300, 700, 1400][level] || 99999; } // cost to go TO level+1

  function foodMaxOf(save) { return 40 + (save.foodCapLevel || 0) * 8; }
  function foodRateOf(save) {
    let r = foodRate(save.foodLevel);
    if (save.heroes && save.heroes.daliya) r *= 1.15;
    return Math.round(r * 100) / 100;
  }
  function baseHpOf(save) {
    let hp = baseHp(save.baseHpLevel);
    if (save.heroes && save.heroes.yael) hp = Math.round(hp * 1.2);
    return hp;
  }
  function unitDmgMul(save) {
    let m = 1 + polishBonus(save.armorPolish || 0);
    if (save.heroes && save.heroes.noa) m *= 1.12;
    return m;
  }
  function critChanceOf(save) { return Math.min(0.45, (save.critLevel || 0) * 0.05); }
  function coinMulOf(save) {
    let m = 1 + (save.coinGainLevel || 0) * 0.1;
    if (save.heroes && save.heroes.miri) m *= 1.15;
    return m;
  }

  function defaultSave() {
    return {
      coins: 0,
      era: 0,
      foodLevel: 0,
      baseHpLevel: 0,
      armorPolish: 0,
      unit2: false,
      unit3: false,
      battle: 1,
      highestEra: 0,
      wins: 0,
      battlesPlayed: 0,
      skills: { airstrike: 0, freeze: 0, shield: 0, heal: 0, meteor: 0, clone: 0 },
      heroes: { daliya: false, noa: false, yael: false, miri: false },
      heroEquipped: null,
      skin: "israel",
      ownedSkins: ["israel"],
      turretLevel: 0,
      critLevel: 0,
      coinGainLevel: 0,
      foodCapLevel: 0,
      lastChestDate: ""
    };
  }

  function migrateSave(raw) {
    const d = defaultSave();
    if (!raw || typeof raw !== "object") return d;
    const s = Object.assign({}, d, raw);
    s.skills = Object.assign({}, d.skills, raw.skills || {});
    s.heroes = Object.assign({}, d.heroes, raw.heroes || {});
    if (!Array.isArray(s.ownedSkins) || !s.ownedSkins.length) s.ownedSkins = ["israel"];
    if (s.ownedSkins.indexOf("israel") < 0) s.ownedSkins.push("israel");
    if (!s.skin) s.skin = "israel";
    ["turretLevel", "critLevel", "coinGainLevel", "foodCapLevel"].forEach((k) => {
      s[k] = s[k] | 0;
    });
    if (typeof s.lastChestDate !== "string") s.lastChestDate = "";
    return s;
  }

  function todayStr() {
    const n = new Date();
    return n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");
  }

  global.LW_DATA = {
    ERAS, FACTIONS, EVOLVE_COST, UNIT2_COST, UNIT3_COST,
    SKILLS, HEROES, SKINS,
    foodRate, foodUpgradeCost, baseHp, baseUpgradeCost, polishBonus, polishCost,
    enemyBaseHp, enemyStatScale, enemyFoodRate,
    critUpgradeCost, coinUpgradeCost, foodCapUpgradeCost, turretCost,
    foodMaxOf, foodRateOf, baseHpOf, unitDmgMul, critChanceOf, coinMulOf,
    defaultSave, migrateSave, todayStr,
    STORAGE_KEY: "lacquer-warriors-save-v1",
    FOOD_MAX: 40
  };
})(window);
