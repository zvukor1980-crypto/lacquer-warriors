/* Боевая симуляция дорожки */
(function (global) {
  const D = global.LW_DATA;
  const Draw = global.LW_DRAW;

  function uid() { return Math.random().toString(36).slice(2, 9); }

  class Battle {
    constructor(save, opts) {
      opts = opts || {};
      this.save = save;
      this.era = save.era;
      this.battleNo = save.battle;
      this.units = [];
      this.projectiles = [];
      this.fx = [];
      this.food = 6;
      this.foodMax = D.FOOD_MAX;
      this.foodRate = D.foodRate(save.foodLevel);
      this.playerMax = D.baseHp(save.baseHpLevel);
      this.playerHp = this.playerMax;
      this.enemyMax = D.enemyBaseHp(save.era, save.battle);
      this.enemyHp = this.enemyMax;
      this.enemyFood = 4;
      this.enemyRate = D.enemyFoodRate(save.era, save.battle);
      this.enemyScale = D.enemyStatScale(save.battle);
      this.coinsEarned = 0;
      this.time = 0;
      this.ended = false;
      this.won = false;
      this.speed = 1;
      this.paused = false;
      this.enemyAi = { wait: 1.2, prefer: 0 };
      this.polish = D.polishBonus(save.armorPolish);
      this.W = 390;
      this.H = 420;
      this.laneY = 210;
      this.baseX = { player: 36, enemy: 354 };
    }

    resize(w, h) {
      this.W = w;
      this.H = h;
      this.laneY = h * 0.48;
      this.baseX.player = 42;
      this.baseX.enemy = w - 42;
    }

    unitDef(type, team) {
      const def = D.ERAS[this.era].units[type];
      const polish = team === "player" ? 1 + this.polish : 1;
      const esc = team === "enemy" ? this.enemyScale : 1;
      return {
        food: def.food,
        hp: Math.round(def.hp * polish * esc),
        dmg: Math.round((def.dmg * polish * esc) * 10) / 10,
        range: def.range,
        speed: def.speed,
        cd: def.cd,
        aoe: def.aoe || 0
      };
    }

    spawn(type, team, x) {
      if (this.ended) return null;
      const def = this.unitDef(type, team);
      const facing = team === "player" ? 1 : -1;
      const laneOff = (this.units.length % 5 - 2) * 5;
      const u = {
        id: uid(),
        type, team, era: this.era,
        x: x != null ? x : (team === "player" ? this.baseX.player + 28 : this.baseX.enemy - 28),
        y: this.laneY + 8 + laneOff,
        hp: def.hp,
        maxHp: def.hp,
        dmg: def.dmg,
        range: def.range,
        speed: def.speed,
        cd: def.cd,
        timer: 0.15,
        aoe: def.aoe,
        facing,
        phase: Math.random() * 6,
        alive: true,
        width: type === 2 ? 48 : 32
      };
      this.units.push(u);
      return u;
    }

    trySpawnPlayer(type) {
      if (this.ended || this.paused) return false;
      if (type === 1 && !this.save.unit2) return false;
      if (type === 2 && !this.save.unit3) return false;
      const cost = D.ERAS[this.era].units[type].food;
      if (this.food < cost) return false;
      this.food -= cost;
      this.spawn(type, "player");
      return true;
    }

    step(dt) {
      if (this.ended || this.paused) return;
      const t = dt * (this.speed || 1);
      this.time += t;
      this.food = Math.min(this.foodMax, this.food + this.foodRate * t);
      this.enemyFood = Math.min(this.foodMax, this.enemyFood + this.enemyRate * t);
      this.enemyAiStep(t);

      for (const u of this.units) {
        if (!u.alive) continue;
        u.timer -= t;
        const foe = this.closestFoe(u);
        const baseX = u.team === "player" ? this.baseX.enemy : this.baseX.player;
        const distBase = Math.abs(baseX - u.x);
        if (foe && Math.abs(foe.x - u.x) <= u.range) {
          if (u.timer <= 0) this.attackUnit(u, foe);
        } else if (!foe && distBase <= u.range + 8) {
          if (u.timer <= 0) this.attackBase(u);
        } else {
          u.x += u.facing * u.speed * t;
        }
      }

      for (const p of this.projectiles) {
        p.x += p.vx * t;
        p.life -= t;
        if (p.target && p.target.alive) {
          if (Math.abs(p.x - p.target.x) < 10) {
            this.hit(p.target, p.dmg, p.aoe, p.x);
            p.life = 0;
          }
        } else if (p.life <= 0 || p.x < 0 || p.x > this.W) {
          p.life = 0;
        }
      }
      this.projectiles = this.projectiles.filter((p) => p.life > 0);

      for (const f of this.fx) f.t += t;
      this.fx = this.fx.filter((f) => f.t < f.life);

      this.units = this.units.filter((u) => u.alive || u.deadT < 0.4);
      for (const u of this.units) if (!u.alive) u.deadT = (u.deadT || 0) + t;

      if (this.enemyHp <= 0) this.finish(true);
      else if (this.playerHp <= 0) this.finish(false);
    }

    enemyAiStep(t) {
      this.enemyAi.wait -= t;
      if (this.enemyAi.wait > 0) return;
      const defs = D.ERAS[this.era].units;
      // bank for a tank sometimes, otherwise cheap units
      const can2 = this.battleNo >= 1;
      const can3 = this.battleNo >= 2 || this.time > 12;
      let choice = 0;
      const r = Math.random();
      if (can3 && this.enemyFood >= defs[2].food && r < 0.28) choice = 2;
      else if (can2 && this.enemyFood >= defs[1].food && r < 0.62) choice = 1;
      else choice = 0;
      if (this.enemyFood >= defs[choice].food) {
        this.enemyFood -= defs[choice].food;
        this.spawn(choice, "enemy");
        this.enemyAi.wait = 0.7 + Math.random() * 1.1 - Math.min(0.4, this.battleNo * 0.04);
      } else {
        this.enemyAi.wait = 0.25;
      }
    }

    closestFoe(u) {
      let best = null, bestD = 1e9;
      for (const o of this.units) {
        if (!o.alive || o.team === u.team) continue;
        const d = Math.abs(o.x - u.x);
        // must be in front
        if (u.team === "player" && o.x < u.x - 8) continue;
        if (u.team === "enemy" && o.x > u.x + 8) continue;
        if (d < bestD) { bestD = d; best = o; }
      }
      return best;
    }

    attackUnit(u, foe) {
      u.timer = u.cd;
      const ranged = u.type === 1 || (u.type === 2 && u.range >= 120);
      if (ranged) {
        const colors = ["#888", "#c9a84a", "#c41e3a", "#5a4030", "#4ec4d4", "#b8f0ff"];
        this.projectiles.push({
          x: u.x + u.facing * 14,
          y: u.y - 18,
          vx: u.facing * 260,
          dmg: u.dmg,
          aoe: u.aoe,
          target: foe,
          life: 0.9,
          r: u.aoe ? 6 : 4,
          color: colors[u.era] || "#888",
          glow: u.era === 5 ? "#b8f0ff" : null
        });
      } else {
        this.hit(foe, u.dmg, u.aoe, foe.x);
      }
    }

    attackBase(u) {
      u.timer = u.cd * 0.9;
      const dmg = u.dmg;
      if (u.team === "player") {
        this.enemyHp = Math.max(0, this.enemyHp - dmg);
        this.addCoins(Math.max(1, Math.round(dmg * 0.35)), u.x, u.y - 30);
      } else {
        this.playerHp = Math.max(0, this.playerHp - dmg);
      }
      this.fx.push({ kind: "txt", x: u.team === "player" ? this.baseX.enemy : this.baseX.player, y: this.laneY - 70, t: 0, life: 0.6, text: "-" + Math.round(dmg), color: "#c03030" });
    }

    hit(target, dmg, aoe, x) {
      const apply = (u, amount) => {
        if (!u.alive) return;
        u.hp -= amount;
        this.fx.push({ kind: "txt", x: u.x, y: u.y - 40, t: 0, life: 0.5, text: "-" + Math.round(amount), color: "#c44" });
        if (u.hp <= 0) this.kill(u);
      };
      apply(target, dmg);
      if (aoe) {
        for (const o of this.units) {
          if (!o.alive || o.team !== target.team || o === target) continue;
          if (Math.abs(o.x - x) <= aoe) apply(o, dmg * 0.45);
        }
      }
    }

    kill(u) {
      u.alive = false;
      u.hp = 0;
      u.deadT = 0;
      if (u.team === "enemy") {
        const coins = Math.max(1, 1 + u.type + Math.floor(this.battleNo / 3));
        this.addCoins(coins, u.x, u.y - 24);
      }
    }

    addCoins(n, x, y) {
      this.coinsEarned += n;
      this.fx.push({ kind: "coin", x, y, t: 0, life: 0.7, text: "+" + n });
    }

    finish(won) {
      if (this.ended) return;
      this.ended = true;
      this.won = won;
    }

    simulate(seconds) {
      const step = 1 / 60;
      let left = seconds;
      while (left > 0 && !this.ended) {
        this.step(step);
        left -= step;
      }
    }

    render(ctx) {
      const W = this.W, H = this.H;
      Draw.drawBackground(ctx, W, H, this.laneY);
      Draw.drawBaseWithHp(ctx, this.baseX.player, this.laneY - 4, "player", this.playerHp, this.playerMax, 118, 140);
      Draw.drawBaseWithHp(ctx, this.baseX.enemy, this.laneY - 4, "enemy", this.enemyHp, this.enemyMax, 118, 140);

      const list = this.units.slice().sort((a, b) => a.y - b.y);
      for (const u of list) {
        ctx.save();
        ctx.translate(u.x, u.y);
        if (!u.alive) {
          ctx.globalAlpha = Math.max(0, 1 - (u.deadT || 0) / 0.4);
          ctx.translate(0, (u.deadT || 0) * 20);
        }
        Draw.drawUnit(ctx, {
          era: u.era,
          type: u.type,
          team: u.team,
          scale: u.type === 2 ? 1.25 : 1.15,
          facing: u.facing,
          t: this.time + u.phase,
          hpRatio: u.alive ? u.hp / u.maxHp : 0
        });
        ctx.restore();
      }
      for (const p of this.projectiles) Draw.drawProjectile(ctx, p);

      for (const f of this.fx) {
        const a = 1 - f.t / f.life;
        ctx.save();
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = f.kind === "coin" ? "#d4a017" : (f.color || "#c44");
        ctx.font = "600 13px Fredoka, Trebuchet MS, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(f.text, f.x, f.y - f.t * 28);
        ctx.restore();
      }
    }
  }

  global.LW_Battle = Battle;
})(window);
