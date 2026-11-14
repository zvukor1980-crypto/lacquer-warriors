/* Лаковые воительницы — данные игры */
(function (global) {
  const ERAS = [
    {
      id: "stone",
      name: "Каменный век",
      short: "Камень",
      year: "70 000 до н.э.",
      units: [
        { name: "Дубина", role: "Ближний бой", food: 3, hp: 28, dmg: 5, range: 34, speed: 30, cd: 0.7 },
        { name: "Метательница", role: "Дальний бой", food: 5, hp: 16, dmg: 6, range: 128, speed: 28, cd: 0.85 },
        { name: "Наездница", role: "Танк", food: 7, hp: 70, dmg: 9, range: 38, speed: 24, cd: 1.05 }
      ]
    },
    {
      id: "farm",
      name: "Земледелие",
      short: "Ферма",
      year: "12 000 до н.э.",
      units: [
        { name: "Фермерша", role: "Ближний бой", food: 5, hp: 48, dmg: 8, range: 36, speed: 30, cd: 0.7 },
        { name: "Пращница", role: "Дальний бой", food: 8, hp: 26, dmg: 10, range: 136, speed: 28, cd: 0.85 },
        { name: "Коса", role: "Танк", food: 12, hp: 120, dmg: 15, range: 40, speed: 23, cd: 1.05 }
      ]
    },
    {
      id: "sparta",
      name: "Спарта",
      short: "Спарта",
      year: "1000 до н.э.",
      units: [
        { name: "Гоплитка", role: "Ближний бой", food: 7, hp: 80, dmg: 13, range: 36, speed: 31, cd: 0.68 },
        { name: "Лучница", role: "Дальний бой", food: 12, hp: 42, dmg: 16, range: 148, speed: 28, cd: 0.82 },
        { name: "Всадница", role: "Танк", food: 16, hp: 200, dmg: 24, range: 42, speed: 32, cd: 1.0 }
      ]
    },
    {
      id: "ren",
      name: "Ренессанс",
      short: "Ренессанс",
      year: "1500",
      units: [
        { name: "Фехтовальщица", role: "Ближний бой", food: 9, hp: 130, dmg: 22, range: 36, speed: 31, cd: 0.65 },
        { name: "Мушкетёрша", role: "Дальний бой", food: 15, hp: 70, dmg: 28, range: 160, speed: 27, cd: 0.95 },
        { name: "Пушка", role: "Танк", food: 21, hp: 260, dmg: 40, range: 150, speed: 18, cd: 1.4, aoe: 48 }
      ]
    },
    {
      id: "modern",
      name: "Современность",
      short: "Модерн",
      year: "1990",
      units: [
        { name: "Штурмовик", role: "Ближний бой", food: 11, hp: 210, dmg: 34, range: 40, speed: 32, cd: 0.6 },
        { name: "Стрелок", role: "Дальний бой", food: 18, hp: 110, dmg: 42, range: 170, speed: 28, cd: 0.75 },
        { name: "Танк", role: "Танк", food: 26, hp: 420, dmg: 55, range: 150, speed: 20, cd: 1.2, aoe: 52 }
      ]
    },
    {
      id: "space",
      name: "Космос",
      short: "Космос",
      year: "2100",
      units: [
        { name: "Астрорыцарь", role: "Ближний бой", food: 10, hp: 300, dmg: 50, range: 38, speed: 34, cd: 0.58 },
        { name: "Солдат", role: "Дальний бой", food: 17, hp: 160, dmg: 58, range: 175, speed: 30, cd: 0.7 },
        { name: "Корабль", role: "Танк", food: 23, hp: 560, dmg: 80, range: 160, speed: 26, cd: 1.1, aoe: 56 }
      ]
    }
  ];

  const EVOLVE_COST = [400, 1200, 3500, 9000, 22000];

  const UNIT2_COST = [120, 220, 400, 700, 1200, 2000];
  const UNIT3_COST = [250, 480, 850, 1500, 2600, 4200];

  function foodRate(level) {
    return Math.round((1.1 + level * 0.28) * 100) / 100;
  }
  function foodUpgradeCost(level) {
    return Math.floor(10 * Math.pow(1.38, level));
  }
  function baseHp(level) {
    return 40 + level * 18;
  }
  function baseUpgradeCost(level) {
    return Math.floor(22 * Math.pow(1.42, level));
  }
  function polishBonus(level) {
    return level * 0.08;
  }
  function polishCost(level) {
    return Math.floor(150 * Math.pow(1.48, level));
  }

  function enemyBaseHp(era, battle) {
    const eraMul = [1, 1.6, 2.6, 4.2, 6.6, 10][era];
    return Math.round(48 * eraMul * Math.pow(1.16, battle - 1));
  }
  function enemyStatScale(battle) {
    return 1 + (battle - 1) * 0.1;
  }
  function enemyFoodRate(era, battle) {
    return (0.9 + era * 0.15) * (1 + (battle - 1) * 0.08);
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
      battlesPlayed: 0
    };
  }

  global.LW_DATA = {
    ERAS,
    EVOLVE_COST,
    UNIT2_COST,
    UNIT3_COST,
    foodRate,
    foodUpgradeCost,
    baseHp,
    baseUpgradeCost,
    polishBonus,
    polishCost,
    enemyBaseHp,
    enemyStatScale,
    enemyFoodRate,
    defaultSave,
    STORAGE_KEY: "lacquer-warriors-save-v1",
    FOOD_MAX: 40
  };
})(window);
