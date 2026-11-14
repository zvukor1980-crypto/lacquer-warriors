/* Лаковые воительницы — интерфейс, сохранения, навигация */
(function () {
  const D = LW_DATA;
  const Draw = LW_DRAW;
  const Battle = LW_Battle;

  const $ = (id) => document.getElementById(id);
  const screens = {
    map: $("screen-map"),
    upgrades: $("screen-upgrades"),
    battle: $("screen-battle")
  };

  let save = load();
  let battle = null;
  let raf = 0;
  let lastT = 0;
  let current = "map";
  let upTab = "upgrades";

  function load() {
    try {
      const raw = localStorage.getItem(D.STORAGE_KEY);
      if (!raw) return D.defaultSave();
      return Object.assign(D.defaultSave(), JSON.parse(raw));
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

  function showScreen(name) {
    current = name;
    Object.keys(screens).forEach((k) => {
      screens[k].classList.toggle("hidden", k !== name);
    });
    if (name === "map") renderMap();
    if (name === "upgrades") renderUpgrades();
  }

  /* ---------- MAP ---------- */
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
      ctx.translate(43, 62);
      Draw.drawUnit(ctx, { era: i, type: 0, team: "player", scale: 1.05, facing: 1, t: i });
      list.appendChild(node);
    });
  }

  /* ---------- UPGRADES ---------- */
  function renderUpgrades() {
    $("up-coins").textContent = fmt(save.coins);
    $("tab-upgrades").classList.toggle("on", upTab === "upgrades");
    $("tab-evolve").classList.toggle("on", upTab === "evolve");
    $("panel-upgrades").classList.toggle("hidden", upTab !== "upgrades");
    $("panel-evolve").classList.toggle("hidden", upTab !== "evolve");
    if (upTab === "upgrades") renderUpPanel();
    else renderEvolvePanel();
  }

  function miniUnit(canvas, era, type, locked) {
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height * 0.68);
    if (locked) ctx.globalAlpha = 0.35;
    Draw.drawUnit(ctx, { era, type, team: "player", scale: 0.95, facing: 1, t: type });
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
      {
        ic: "🥩",
        title: "Производство еды",
        info: D.foodRate(save.foodLevel).toFixed(2) + "/с  ·  ур. " + save.foodLevel,
        cost: D.foodUpgradeCost(save.foodLevel),
        act: "food"
      },
      {
        ic: "🏰",
        title: "Здоровье базы",
        info: D.baseHp(save.baseHpLevel) + " HP  ·  ур. " + save.baseHpLevel,
        cost: D.baseUpgradeCost(save.baseHpLevel),
        act: "base"
      },
      {
        ic: "✨",
        title: "Блеск брони",
        info: "+" + Math.round(D.polishBonus(save.armorPolish) * 100) + "% к урону и HP юнитов  ·  ур. " + save.armorPolish,
        cost: D.polishCost(save.armorPolish),
        act: "polish",
        persist: true
      }
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
    if (save.coins < cost) return;
    if (i === 1) save.unit2 = true;
    if (i === 2) save.unit3 = true;
    save.coins -= cost;
    persist();
    renderUpgrades();
    toast("Юнит открыт!");
  }

  function buyUpgrade(kind) {
    let cost = 0;
    if (kind === "food") cost = D.foodUpgradeCost(save.foodLevel);
    if (kind === "base") cost = D.baseUpgradeCost(save.baseHpLevel);
    if (kind === "polish") cost = D.polishCost(save.armorPolish);
    if (save.coins < cost) return;
    save.coins -= cost;
    if (kind === "food") save.foodLevel++;
    if (kind === "base") save.baseHpLevel++;
    if (kind === "polish") save.armorPolish++;
    persist();
    renderUpgrades();
  }

  function renderEvolvePanel() {
    const panel = $("panel-evolve");
    if (save.era >= 5) {
      panel.innerHTML = '<div class="evolve-box"><h3>Все эпохи открыты!</h3><p class="hint">Вы прошли путь от камня до космоса. Блеск брони продолжает расти — сражайтесь дальше в космической эпохе.</p></div>';
      const c = document.createElement("canvas");
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
      '</div><p class="hint">Эволюция откроет новых воительниц. Производство еды, здоровье базы и открытые юниты этой эпохи сбросятся. <strong>Блеск брони</strong> сохранится.</p>' +
      '<button class="evolve-btn" id="btn-evolve"' + (save.coins < cost ? " disabled" : "") + ">Эволюционировать · ⭐ " + fmt(cost) + "</button></div>";
    const a = $("ev-from").getContext("2d");
    a.translate(90, 140);
    Draw.drawUnit(a, { era: save.era, type: 0, team: "player", scale: 1.1, facing: 1, t: 0 });
    const b = $("ev-to").getContext("2d");
    b.translate(90, 140);
    Draw.drawUnit(b, { era: save.era + 1, type: 0, team: "player", scale: 1.1, facing: 1, t: 1 });
    $("btn-evolve").addEventListener("click", evolve);
  }

  function evolve() {
    if (save.era >= 5) return;
    const cost = D.EVOLVE_COST[save.era];
    if (save.coins < cost) return;
    save.coins -= cost;
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
    return { w, h };
  }

  function startBattle() {
    $("overlay-result").classList.add("hidden");
    $("overlay-pause").classList.add("hidden");
    battle = new Battle(save);
    showScreen("battle");
    screens.battle.offsetHeight;
    fitCanvas();
    $("btl-title").textContent = "Бой " + save.battle;
    $("btl-coins").textContent = fmt(save.coins);
    $("btl-earned").textContent = "0";
    $("btn-speed").textContent = "×" + battle.speed;
    renderUnitButtons();
    lastT = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
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
      g.translate(70, 90);
      Draw.drawUnit(g, { era: save.era, type: i, team: "player", scale: 0.85, facing: 1, t: i });
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
      const need = era.units[i].food;
      b.disabled = !unlocked[i] || battle.food < need || battle.ended || battle.paused;
    });
  }

  function loop(ts) {
    if (!battle) return;
    if (!lastT) lastT = ts;
    let dt = (ts - lastT) / 1000;
    lastT = ts;
    if (dt > 0.08) dt = 0.08;
    battle.step(dt);
    ctx.setTransform((window.devicePixelRatio || 1) > 2 ? 2 : Math.min(window.devicePixelRatio || 1, 2), 0, 0, (window.devicePixelRatio || 1) > 2 ? 2 : Math.min(window.devicePixelRatio || 1, 2), 0, 0);
    // fitCanvas already set transform; re-apply current
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    battle.render(ctx);
    updateDock();
    if (battle.ended) {
      endBattle();
      return;
    }
    raf = requestAnimationFrame(loop);
  }

  function endBattle() {
    cancelAnimationFrame(raf);
    save.coins += battle.coinsEarned;
    save.battlesPlayed++;
    if (battle.won) {
      save.wins++;
      save.battle++;
    }
    persist();
    const ov = $("overlay-result");
    const modal = $("result-modal");
    modal.className = "modal " + (battle.won ? "win" : "lose");
    $("result-title").textContent = battle.won ? "Победа!" : "Поражение";
    $("result-sub").textContent = battle.won
      ? "База врага разрушена. Следующий бой будет сложнее."
      : "Ваша база пала. Улучшите еду и броню — и попробуйте снова.";
    $("result-coins").textContent = fmt(battle.coinsEarned);
    $("result-total").textContent = fmt(save.coins);
    ov.classList.remove("hidden");
    $("btl-coins").textContent = fmt(save.coins);
  }

  function leaveBattle(surrender) {
    $("overlay-pause").classList.add("hidden");
    if (battle && !battle.ended) {
      if (surrender) {
        // keep coins earned so far, don't increment battle
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

  /* ---------- events ---------- */
  $("btn-play").addEventListener("click", startBattle);
  document.querySelectorAll(".nav-item").forEach((b) => {
    b.addEventListener("click", () => {
      const go = b.getAttribute("data-go");
      if (go === "map") showScreen("map");
      if (go === "upgrades") { upTab = "upgrades"; showScreen("upgrades"); }
    });
  });
  $("btn-back-up").addEventListener("click", () => showScreen("map"));
  $("tab-upgrades").addEventListener("click", () => { upTab = "upgrades"; renderUpgrades(); });
  $("tab-evolve").addEventListener("click", () => { upTab = "evolve"; renderUpgrades(); });

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
    battle = null;
    upTab = "upgrades";
    showScreen("upgrades");
  });
  $("btn-to-map").addEventListener("click", () => {
    $("overlay-result").classList.add("hidden");
    battle = null;
    showScreen("map");
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

  /* API для тестов и отладки */
  window.__LW = {
    getSave: () => save,
    setSave: (s) => { save = Object.assign(D.defaultSave(), s); persist(); },
    persist,
    showScreen,
    startBattle,
    getBattle: () => battle,
    spawn: (t) => battle && battle.trySpawnPlayer(t),
    simulate: (sec) => { if (battle) battle.simulate(sec); },
    endBattle,
    toast,
    saveRef: () => save
  };

  showScreen("map");
})();
