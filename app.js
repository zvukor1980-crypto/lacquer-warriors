/* Лаковые воительницы — интерфейс, магазин, сохранения */
(function () {
  const D = LW_DATA;
  const Draw = LW_DRAW;
  const Battle = LW_Battle;
  const $ = (id) => document.getElementById(id);

  const screens = {
    map: $("screen-map"),
    upgrades: $("screen-upgrades"),
    shop: $("screen-shop"),
    battle: $("screen-battle")
  };

  let save = load();
  let battle = null;
  let raf = 0;
  let lastT = 0;
  let current = "map";
  let upTab = "upgrades";
  let shopTab = "skills";

  function load() {
    try {
      const raw = localStorage.getItem(D.STORAGE_KEY);
      if (!raw) return D.defaultSave();
      return D.migrateSave(JSON.parse(raw));
    } catch (e) {
      return D.defaultSave();
    }
  }
  function persist() {
    try { localStorage.setItem(D.STORAGE_KEY, JSON.stringify(save)); } catch (e) {}
  }
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 1600);
  }
  function fmt(n) {
    n = Math.floor(n);
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 10000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }
  function spend(cost) {
    if (save.coins < cost) { toast("Не хватает монет"); return false; }
    save.coins -= cost;
    return true;
  }

  function showScreen(name) {
    current = name;
    Object.keys(screens).forEach((k) => {
      screens[k].classList.toggle("hidden", k !== name);
    });
    if (name === "map") renderMap();
    if (name === "upgrades") renderUpgrades();
    if (name === "shop") renderShop();
  }

  function renderMap() {
    $("map-coins").textContent = fmt(save.coins);
    const list = $("era-list");
    list.innerHTML = "";
    D.ERAS.forEach((era, i) => {
      const st = i < save.era ? "done" : i === save.era ? "current" : "locked";
      const node = document.createElement("div");
      node.className = "era-node " + st;
      node.innerHTML =
        '<div class="era-portrait"><canvas width="172" height="172"></canvas></div>' +
        '<div class="era-label"><h3></h3><p></p><span class="badge"></span></div>';
      node.querySelector("h3").textContent = era.name;
      node.querySelector("p").textContent = era.year;
      const badge = node.querySelector(".badge");
      if (st === "done") { badge.className = "badge done"; badge.textContent = "Пройдена ✓"; }
      else if (st === "current") { badge.className = "badge now"; badge.textContent = "Бой " + save.battle; }
      else { badge.className = "badge lock"; badge.textContent = "🔒 Закрыта"; }
      const c = node.querySelector("canvas");
      const ctx = c.getContext("2d");
      ctx.scale(2, 2);
      ctx.translate(43, 70);
      Draw.drawUnit(ctx, { era: i, type: 0, team: "player", skin: save.skin, scale: 0.88, facing: 1, t: i });
      list.appendChild(node);
    });
  }

  function renderUpgrades() {
    $("up-coins").textContent = fmt(save.coins);
    $("tab-upgrades").classList.toggle("on", upTab === "upgrades");
    $("tab-evolve").classList.toggle("on", upTab === "evolve");
    $("panel-upgrades").classList.toggle("hidden", upTab !== "upgrades");
    $("panel-evolve").classList.toggle("hidden", upTab !== "evolve");
    if (upTab === "upgrades") renderUpPanel();
    else renderEvolvePanel();
  }

  function miniUnit(canvas, era, type, locked, team) {
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height * 0.74);
    if (locked) ctx.globalAlpha = 0.35;
    Draw.drawUnit(ctx, { era, type, team: team || "player", skin: save.skin, scale: 0.95, facing: 1, t: type });
  }

  function renderUpPanel() {
    const era = D.ERAS[save.era];
    const panel = $("panel-upgrades");
    const unlocked = [true, save.unit2, save.unit3];
    const costs = [0, D.UNIT2_COST[save.era], D.UNIT3_COST[save.era]];
    let cards = '<div class="unit-row">';
    era.units.forEach((u, i) => {
      cards += '<div class="unit-card' + (unlocked[i] ? " unlocked" : "") + '">';
      cards += '<canvas width="172" height="192" data-u="' + i + '"></canvas>';
      cards += "<h4>" + u.name + "</h4><div class='role'>" + u.role + " · 🥩" + u.food + "</div>";
      if (!unlocked[i]) {
        cards += '<button class="unlock-btn" data-unlock="' + i + '"' +
          (save.coins < costs[i] ? " disabled" : "") + ">⭐ " + fmt(costs[i]) + "</button>";
      } else {
        cards += '<div class="cost-line">Открыта ✓</div>';
      }
      cards += "</div>";
    });
    cards += "</div>";
    const rows = [
      { ic: "🥩", title: "Производство еды", info: D.foodRateOf(save).toFixed(2) + "/с  ·  ур. " + save.foodLevel, cost: D.foodUpgradeCost(save.foodLevel), act: "food" },
      { ic: "🏰", title: "Здоровье базы", info: D.baseHpOf(save) + " HP  ·  ур. " + save.baseHpLevel, cost: D.baseUpgradeCost(save.baseHpLevel), act: "base" },
      { ic: "✨", title: "Блеск брони", info: "+" + Math.round(D.polishBonus(save.armorPolish) * 100) + "% к урону и HP  ·  ур. " + save.armorPolish, cost: D.polishCost(save.armorPolish), act: "polish", persist: true }
    ];
    rows.forEach((r) => {
      cards += '<div class="up-row"><div class="ic">' + r.ic + "</div><div class='info'><h4>" + r.title +
        (r.persist ? ' <span class="persist-tag">навсегда</span>' : "") + "</h4><p>" + r.info +
        "</p></div><button class='buy-btn' data-buy='" + r.act + "'" +
        (save.coins < r.cost ? " disabled" : "") + ">⭐ " + fmt(r.cost) + "</button></div>";
    });
    panel.innerHTML = cards;
    panel.querySelectorAll("canvas").forEach((c) => {
      const i = +c.getAttribute("data-u");
      miniUnit(c, save.era, i, !unlocked[i]);
    });
    panel.querySelectorAll("[data-unlock]").forEach((b) => {
      b.addEventListener("click", () => unlockUnit(+b.getAttribute("data-unlock")));
    });
    panel.querySelectorAll("[data-buy]").forEach((b) => {
      b.addEventListener("click", () => buyUpgrade(b.getAttribute("data-buy")));
    });
  }

  function unlockUnit(i) {
    const cost = i === 1 ? D.UNIT2_COST[save.era] : D.UNIT3_COST[save.era];
    if (!spend(cost)) return;
    if (i === 1) save.unit2 = true;
    if (i === 2) save.unit3 = true;
    persist(); renderUpgrades(); toast("Юнит открыт!");
  }
  function buyUpgrade(kind) {
    let cost = 0;
    if (kind === "food") cost = D.foodUpgradeCost(save.foodLevel);
    if (kind === "base") cost = D.baseUpgradeCost(save.baseHpLevel);
    if (kind === "polish") cost = D.polishCost(save.armorPolish);
    if (!spend(cost)) return;
    if (kind === "food") save.foodLevel++;
    if (kind === "base") save.baseHpLevel++;
    if (kind === "polish") save.armorPolish++;
    persist(); renderUpgrades();
  }

  function renderEvolvePanel() {
    const panel = $("panel-evolve");
    if (save.era >= 5) {
      panel.innerHTML = '<div class="evolve-box"><h3>Все эпохи открыты!</h3><p class="hint">Блеск брони, герои и покупки магазина остаются с вами в космической эпохе.</p></div>';
      return;
    }
    const cost = D.EVOLVE_COST[save.era];
    const from = D.ERAS[save.era];
    const to = D.ERAS[save.era + 1];
    panel.innerHTML =
      '<div class="evolve-box"><div class="evolve-arrow">' +
      '<div class="evolve-era"><canvas id="ev-from" width="180" height="200"></canvas><h3>' + from.name + "</h3></div>" +
      "<div style='font-size:28px'>➜</div>" +
      '<div class="evolve-era"><canvas id="ev-to" width="180" height="200"></canvas><h3>' + to.name + "</h3></div>" +
      '</div><p class="hint">Эволюция откроет новых воительниц. Производство еды, здоровье базы и открытые юниты эпохи сбросятся. <strong>Блеск брони, герои, облики и навыки</strong> сохранятся.</p>' +
      '<button class="evolve-btn" id="btn-evolve"' + (save.coins < cost ? " disabled" : "") + ">Эволюционировать · ⭐ " + fmt(cost) + "</button></div>";
    const a = $("ev-from").getContext("2d");
    a.translate(90, 148);
    Draw.drawUnit(a, { era: save.era, type: 0, team: "player", skin: save.skin, scale: 1.1, facing: 1, t: 0 });
    const b = $("ev-to").getContext("2d");
    b.translate(90, 148);
    Draw.drawUnit(b, { era: save.era + 1, type: 0, team: "player", skin: save.skin, scale: 1.1, facing: 1, t: 1 });
    $("btn-evolve").addEventListener("click", evolve);
  }

  function evolve() {
    if (save.era >= 5) return;
    const cost = D.EVOLVE_COST[save.era];
    if (!spend(cost)) return;
    save.era++;
    save.highestEra = Math.max(save.highestEra, save.era);
    save.foodLevel = 0;
    save.baseHpLevel = 0;
    save.unit2 = false;
    save.unit3 = false;
    save.battle = 1;
    persist();
    toast("Добро пожаловать в эпоху: " + D.ERAS[save.era].name);
    renderUpgrades();
  }

  /* ---------- SHOP ---------- */
  function renderShop() {
    $("shop-coins").textContent = fmt(save.coins);
    document.querySelectorAll("#shop-tabs .tab").forEach((t) => {
      t.classList.toggle("on", t.getAttribute("data-shop") === shopTab);
    });
    renderChest();
    if (shopTab === "skills") renderShopSkills();
    else if (shopTab === "heroes") renderShopHeroes();
    else if (shopTab === "skins") renderShopSkins();
    else renderShopBoosts();
  }

  function renderChest() {
    const box = $("chest-banner");
    const today = D.todayStr();
    const ready = save.lastChestDate !== today;
    box.innerHTML = '<div class="ic">🎁</div><div class="info"><h4>Ежедневный сундук</h4><p>' +
      (ready ? "Бесплатные монеты и шанс навыка. Один раз в день." : "Уже открыт сегодня. Приходите завтра.") +
      '</p></div><button class="buy-btn" id="btn-chest"' + (ready ? "" : " disabled") + ">" +
      (ready ? "Открыть" : "Завтра") + "</button>";
    const b = $("btn-chest");
    if (b) b.addEventListener("click", openChest);
  }

  function openChest() {
    const today = D.todayStr();
    if (save.lastChestDate === today) return;
    save.lastChestDate = today;
    const coins = 50 + Math.floor(Math.random() * 71);
    save.coins += coins;
    let msg = "В сундуке: ⭐ " + coins;
    if (Math.random() < 0.45) {
      const sk = D.SKILLS[Math.floor(Math.random() * D.SKILLS.length)];
      save.skills[sk.id] = (save.skills[sk.id] || 0) + 1;
      msg += " и " + sk.name;
    }
    persist();
    toast(msg);
    renderShop();
  }

  function renderShopSkills() {
    const panel = $("panel-shop");
    let h = '<div class="shop-grid">';
    D.SKILLS.forEach((s) => {
      const n = save.skills[s.id] | 0;
      h += '<div class="shop-card"><div style="font-size:28px">' + s.icon + "</div><h4>" + s.name +
        "</h4><div class='desc'>" + s.desc + "</div><div class='owned'>В запасе: " + n +
        "</div><button class='buy-btn' data-skill='" + s.id + "'" + (save.coins < s.cost ? " disabled" : "") +
        ">Купить · ⭐ " + s.cost + "</button></div>";
    });
    h += "</div>";
    panel.innerHTML = h;
    panel.querySelectorAll("[data-skill]").forEach((b) => {
      b.addEventListener("click", () => buySkill(b.getAttribute("data-skill")));
    });
  }
  function buySkill(id) {
    const s = D.SKILLS.find((x) => x.id === id);
    if (!s || !spend(s.cost)) return;
    save.skills[id] = (save.skills[id] || 0) + 1;
    persist(); toast(s.name + " +1"); renderShop();
  }

  function renderShopHeroes() {
    const panel = $("panel-shop");
    let h = '<div class="shop-grid">';
    D.HEROES.forEach((hero) => {
      const owned = !!(save.heroes && save.heroes[hero.id]);
      h += '<div class="shop-card"><canvas width="160" height="180" data-hero="' + hero.id + '"></canvas><h4>' +
        hero.icon + " " + hero.name + "</h4><div class='desc'>" + hero.title + " · " + hero.desc + "</div>";
      if (owned) h += "<div class='owned'>Нанята ✓ · пассив действует</div>";
      else h += "<button class='buy-btn' data-hero='" + hero.id + "'" + (save.coins < hero.cost ? " disabled" : "") +
        ">Нанять · ⭐ " + hero.cost + "</button>";
      h += "</div>";
    });
    h += "</div>";
    panel.innerHTML = h;
    panel.querySelectorAll("canvas[data-hero]").forEach((c) => {
      const hero = D.HEROES.find((x) => x.id === c.getAttribute("data-hero"));
      const ctx = c.getContext("2d");
      ctx.translate(80, 138);
      Draw.drawUnit(ctx, { era: hero.look.era, type: hero.look.type, team: "player", skin: save.skin, scale: 1, facing: 1, t: 1 });
    });
    panel.querySelectorAll("button[data-hero]").forEach((b) => {
      b.addEventListener("click", () => buyHero(b.getAttribute("data-hero")));
    });
  }
  function buyHero(id) {
    const hero = D.HEROES.find((x) => x.id === id);
    if (!hero || save.heroes[id]) return;
    if (!spend(hero.cost)) return;
    save.heroes[id] = true;
    save.heroEquipped = id;
    persist(); toast(hero.name + " в отряде!"); renderShop();
  }

  function renderShopSkins() {
    const panel = $("panel-shop");
    const colors = { israel: "#3d7ad6", gold: "#e8c44a", teal: "#2aa8a0", scarlet: "#e03a4a", opal: "#d8c8f0" };
    let h = '<div class="shop-grid">';
    D.SKINS.forEach((sk) => {
      const owned = save.ownedSkins.indexOf(sk.id) >= 0;
      const on = save.skin === sk.id;
      h += '<div class="shop-card"><canvas width="160" height="180" data-skin="' + sk.id +
        '"></canvas><span class="skin-dot" style="background:' + colors[sk.id] + '"></span><h4>' + sk.name +
        "</h4><div class='desc'>" + sk.desc + "</div>";
      if (on) h += "<div class='owned'>Надето ✓</div>";
      else if (owned) h += "<button class='buy-btn' data-wear='" + sk.id + "'>Надеть</button>";
      else h += "<button class='buy-btn' data-buyskin='" + sk.id + "'" + (save.coins < sk.cost ? " disabled" : "") +
        ">Купить · ⭐ " + sk.cost + "</button>";
      h += "</div>";
    });
    h += "</div>";
    panel.innerHTML = h;
    panel.querySelectorAll("canvas[data-skin]").forEach((c) => {
      const id = c.getAttribute("data-skin");
      const ctx = c.getContext("2d");
      ctx.translate(80, 138);
      Draw.drawUnit(ctx, { era: save.era, type: 0, team: "player", skin: id, scale: 1, facing: 1, t: 0 });
    });
    panel.querySelectorAll("[data-buyskin]").forEach((b) => b.addEventListener("click", () => buySkin(b.getAttribute("data-buyskin"))));
    panel.querySelectorAll("[data-wear]").forEach((b) => b.addEventListener("click", () => wearSkin(b.getAttribute("data-wear"))));
  }
  function buySkin(id) {
    const sk = D.SKINS.find((x) => x.id === id);
    if (!sk || save.ownedSkins.indexOf(id) >= 0) return;
    if (!spend(sk.cost)) return;
    save.ownedSkins.push(id);
    save.skin = id;
    persist(); toast(sk.name + " куплен"); renderShop();
  }
  function wearSkin(id) {
    if (save.ownedSkins.indexOf(id) < 0) return;
    save.skin = id;
    persist(); toast("Облик изменён"); renderShop();
  }

  function renderShopBoosts() {
    const panel = $("panel-shop");
    const turretNext = save.turretLevel >= 3 ? null : D.turretCost(save.turretLevel);
    const items = [
      { ic: "🎯", title: "Критический удар", info: Math.round(D.critChanceOf(save) * 100) + "% шанс крита  ·  ур. " + save.critLevel, cost: D.critUpgradeCost(save.critLevel), act: "crit" },
      { ic: "⭐", title: "Приток монет", info: "+" + Math.round((D.coinMulOf(save) - 1) * 100) + "% монет с боя  ·  ур. " + save.coinGainLevel, cost: D.coinUpgradeCost(save.coinGainLevel), act: "coin" },
      { ic: "🍖", title: "Запас еды", info: "Максимум " + D.foodMaxOf(save) + "  ·  ур. " + save.foodCapLevel, cost: D.foodCapUpgradeCost(save.foodCapLevel), act: "cap" },
      { ic: "🔫", title: "Турель базы", info: save.turretLevel ? ("Уровень " + save.turretLevel + " · сама стреляет по врагам") : "Ещё не установлена", cost: turretNext, act: "turret", maxed: save.turretLevel >= 3 }
    ];
    let h = "";
    items.forEach((r) => {
      h += '<div class="up-row"><div class="ic">' + r.ic + "</div><div class='info'><h4>" + r.title +
        ' <span class="persist-tag">навсегда</span></h4><p>' + r.info + "</p></div>";
      if (r.maxed) h += "<div class='owned'>Максимум</div>";
      else h += "<button class='buy-btn' data-boost='" + r.act + "'" + (save.coins < r.cost ? " disabled" : "") + ">⭐ " + fmt(r.cost) + "</button>";
      h += "</div>";
    });
    panel.innerHTML = h;
    panel.querySelectorAll("[data-boost]").forEach((b) => b.addEventListener("click", () => buyBoost(b.getAttribute("data-boost"))));
  }
  function buyBoost(act) {
    let cost = 0;
    if (act === "crit") cost = D.critUpgradeCost(save.critLevel);
    if (act === "coin") cost = D.coinUpgradeCost(save.coinGainLevel);
    if (act === "cap") cost = D.foodCapUpgradeCost(save.foodCapLevel);
    if (act === "turret") {
      if (save.turretLevel >= 3) return;
      cost = D.turretCost(save.turretLevel);
    }
    if (!spend(cost)) return;
    if (act === "crit") save.critLevel++;
    if (act === "coin") save.coinGainLevel++;
    if (act === "cap") save.foodCapLevel++;
    if (act === "turret") save.turretLevel++;
    persist(); toast("Усиление куплено"); renderShop();
  }

  /* ---------- BATTLE ---------- */
  const canvas = $("battle-canvas");
  const ctx = canvas.getContext("2d");

  function fitCanvas() {
    const wrap = $("battle-canvas-wrap");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth || 390;
    const h = wrap.clientHeight || 420;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (battle) battle.resize(w, h);
  }

  function startBattle() {
    $("overlay-result").classList.add("hidden");
    $("overlay-pause").classList.add("hidden");
    $("toast").classList.remove("show");
    battle = new Battle(save);
    showScreen("battle");
    $("btl-title").textContent = "Бой " + save.battle;
    $("btl-coins").textContent = fmt(save.coins);
    $("btl-earned").textContent = "0";
    $("btn-speed").textContent = "×" + battle.speed;
    renderUnitButtons();
    renderSkillBar();
    screens.battle.offsetHeight;
    fitCanvas();
    lastT = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function renderSkillBar() {
    const bar = $("skill-bar");
    bar.innerHTML = "";
    D.SKILLS.forEach((s) => {
      const n = (battle ? battle.skills[s.id] : save.skills[s.id]) | 0;
      const b = document.createElement("button");
      b.className = "skill-btn";
      b.disabled = n <= 0;
      b.innerHTML = '<span class="ic">' + s.icon + "</span>" + s.name + "<div>×" + n + "</div>";
      b.addEventListener("click", () => {
        if (battle && battle.useSkill(s.id)) {
          persist();
          renderSkillBar();
        }
      });
      bar.appendChild(b);
    });
  }

  function renderUnitButtons() {
    const box = $("unit-btns");
    box.innerHTML = "";
    const era = D.ERAS[save.era];
    const unlocked = [true, save.unit2, save.unit3];
    era.units.forEach((u, i) => {
      const b = document.createElement("button");
      b.className = "unit-btn" + (unlocked[i] ? "" : " locked");
      b.disabled = !unlocked[i];
      b.innerHTML = '<canvas width="140" height="128"></canvas><div class="fcost">🥩 ' + u.food + "</div>";
      const c = b.querySelector("canvas");
      const g = c.getContext("2d");
      g.translate(70, 102);
      Draw.drawUnit(g, { era: save.era, type: i, team: "player", skin: save.skin, scale: 0.78, facing: 1, t: i });
      b.addEventListener("click", () => {
        if (battle && battle.trySpawnPlayer(i)) updateDock();
      });
      b.dataset.type = i;
      box.appendChild(b);
    });
    updateDock();
  }

  function updateDock() {
    if (!battle) return;
    $("food-val").textContent = Math.floor(battle.food);
    $("food-fill").style.height = (100 * battle.food / battle.foodMax) + "%";
    $("btl-earned").textContent = fmt(battle.coinsEarned);
    const era = D.ERAS[save.era];
    const unlocked = [true, save.unit2, save.unit3];
    document.querySelectorAll("#unit-btns .unit-btn").forEach((b) => {
      const i = +b.dataset.type;
      b.disabled = !unlocked[i] || battle.food < era.units[i].food || battle.ended || battle.paused;
    });
  }

  function loop(ts) {
    if (!battle) return;
    if (!lastT) lastT = ts;
    let dt = (ts - lastT) / 1000;
    lastT = ts;
    if (dt > 0.08) dt = 0.08;
    battle.step(dt);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    battle.render(ctx);
    updateDock();
    if (battle.ended) { endBattle(); return; }
    raf = requestAnimationFrame(loop);
  }

  function endBattle() {
    cancelAnimationFrame(raf);
    // sync remaining skill charges back
    if (battle.skills) save.skills = Object.assign(save.skills, battle.skills);
    save.coins += battle.coinsEarned;
    save.battlesPlayed++;
    if (battle.won) { save.wins++; save.battle++; }
    persist();
    const ov = $("overlay-result");
    const modal = $("result-modal");
    modal.className = "modal " + (battle.won ? "win" : "lose");
    $("result-title").textContent = battle.won ? "Победа Израиля!" : "Поражение";
    $("result-sub").textContent = battle.won
      ? "База Тёмного легиона разрушена. Следующий бой будет сложнее."
      : "Ваша база пала. Загляните в магазин и улучшения — и попробуйте снова.";
    $("result-coins").textContent = fmt(battle.coinsEarned);
    $("result-total").textContent = fmt(save.coins);
    ov.classList.remove("hidden");
    $("btl-coins").textContent = fmt(save.coins);
  }

  function leaveBattle(surrender) {
    $("overlay-pause").classList.add("hidden");
    if (battle && !battle.ended) {
      if (surrender) {
        if (battle.skills) save.skills = Object.assign(save.skills, battle.skills);
        save.coins += battle.coinsEarned;
        save.battlesPlayed++;
        persist();
      }
      battle.ended = true;
    }
    cancelAnimationFrame(raf);
    battle = null;
    showScreen("map");
  }

  /* events */
  $("btn-play").addEventListener("click", startBattle);
  document.querySelectorAll(".nav-item").forEach((b) => {
    b.addEventListener("click", () => {
      const go = b.getAttribute("data-go");
      if (go === "map") showScreen("map");
      if (go === "upgrades") { upTab = "upgrades"; showScreen("upgrades"); }
      if (go === "shop") { shopTab = "skills"; showScreen("shop"); }
    });
  });
  $("btn-back-up").addEventListener("click", () => showScreen("map"));
  $("btn-back-shop").addEventListener("click", () => showScreen("map"));
  $("tab-upgrades").addEventListener("click", () => { upTab = "upgrades"; renderUpgrades(); });
  $("tab-evolve").addEventListener("click", () => { upTab = "evolve"; renderUpgrades(); });
  document.querySelectorAll("#shop-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => { shopTab = t.getAttribute("data-shop"); renderShop(); });
  });

  $("btn-pause").addEventListener("click", () => {
    if (!battle || battle.ended) return;
    battle.paused = true;
    $("overlay-pause").classList.remove("hidden");
  });
  $("btn-resume").addEventListener("click", () => {
    if (!battle) return;
    battle.paused = false;
    $("overlay-pause").classList.add("hidden");
    lastT = 0;
  });
  $("btn-surrender").addEventListener("click", () => leaveBattle(true));
  $("btn-speed").addEventListener("click", () => {
    if (!battle) return;
    battle.speed = battle.speed === 1 ? 2 : battle.speed === 2 ? 3 : 1;
    $("btn-speed").textContent = "×" + battle.speed;
  });
  $("btn-again").addEventListener("click", startBattle);
  $("btn-to-upgrades").addEventListener("click", () => {
    $("overlay-result").classList.add("hidden");
    battle = null; upTab = "upgrades"; showScreen("upgrades");
  });
  $("btn-to-map").addEventListener("click", () => {
    $("overlay-result").classList.add("hidden");
    battle = null; showScreen("map");
  });
  $("btn-settings").addEventListener("click", () => $("overlay-settings").classList.remove("hidden"));
  $("btn-close-set").addEventListener("click", () => $("overlay-settings").classList.add("hidden"));
  $("btn-reset").addEventListener("click", () => {
    if (!confirm("Сбросить весь прогресс?")) return;
    save = D.defaultSave();
    persist();
    $("overlay-settings").classList.add("hidden");
    showScreen("map");
    toast("Прогресс сброшен");
  });

  window.addEventListener("resize", () => { if (current === "battle") fitCanvas(); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && battle && !battle.ended) {
      battle.paused = true;
      $("overlay-pause").classList.remove("hidden");
    }
  });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  window.__LW = {
    getSave: () => save,
    setSave: (s) => { save = D.migrateSave(Object.assign(D.defaultSave(), s)); persist(); },
    persist, showScreen, startBattle,
    getBattle: () => battle,
    spawn: (t) => battle && battle.trySpawnPlayer(t),
    simulate: (sec) => { if (battle) battle.simulate(sec); },
    buySkill, buyHero, buySkin, wearSkin, buyBoost, openChest,
    useSkill: (id) => battle && battle.useSkill(id),
    endBattle, toast, saveRef: () => save
  };

  showScreen("map");
})();
