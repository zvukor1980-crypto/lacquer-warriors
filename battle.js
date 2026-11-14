/* Боевая симуляция: эффекты, навыки, турель, криты */
(function (global) {
  const D = global.LW_DATA;
  const Draw = global.LW_DRAW;

  function uid() { return Math.random().toString(36).slice(2, 9); }
  function projKind(era, type) {
    const def = D.ERAS[era].units[type];
    return def.proj || "none";
  }

  class Battle {
    constructor(save) {
      this.save = save;
      this.era = save.era;
      this.battleNo = save.battle;
      this.units = [];
      this.projectiles = [];
      this.fx = [];
      this.foodMax = D.foodMaxOf(save);
      this.food = Math.min(6, this.foodMax);
      this.foodRate = D.foodRateOf(save);
      this.playerMax = D.baseHpOf(save);
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
      this.enemyAi = { wait: 1.2 };
      this.dmgMul = D.unitDmgMul(save);
      this.polish = D.polishBonus(save.armorPolish);
      this.crit = D.critChanceOf(save);
      this.coinMul = D.coinMulOf(save);
      this.skin = save.skin || "israel";
      this.turretLevel = save.turretLevel || 0;
      this.turretCd = 0;
      this.shield = 0;
      this.shieldMax = 0;
      this.freezeT = 0;
      this.skills = Object.assign({}, save.skills || {});
      this.W = 390;
      this.H = 420;
      this.laneY = 210;
      this.baseX = { player: 42, enemy: 348 };
    }

    resize(w, h) {
      this.W = w;
      this.H = h;
      this.laneY = h * 0.48;
      this.baseX.player = 48;
      this.baseX.enemy = w - 48;
    }

    unitDef(type, team) {
      const def = D.ERAS[this.era].units[type];
      const mul = team === "player" ? this.dmgMul : 1;
      const hpMul = team === "player" ? (1 + this.polish) : 1;
      const esc = team === "enemy" ? this.enemyScale : 1;
      return {
        food: def.food,
        hp: Math.round(def.hp * hpMul * esc),
        dmg: Math.round(def.dmg * mul * esc * 10) / 10,
        range: def.range,
        speed: def.speed,
        cd: def.cd,
        aoe: def.aoe || 0,
        proj: def.proj || "none"
      };
    }

    spawn(type, team, x) {
      if (this.ended) return null;
      const def = this.unitDef(type, team);
      const facing = team === "player" ? 1 : -1;
      const laneOff = (this.units.length % 5 - 2) * 6;
      const look = Draw.lookFor(this.era, type, team, team === "player" ? this.skin : null);
      const u = {
        id: uid(),
        type, team, era: this.era, look,
        x: x != null ? x : (team === "player" ? this.baseX.player + 32 : this.baseX.enemy - 32),
        y: this.laneY + 8 + laneOff,
        hp: def.hp, maxHp: def.hp, dmg: def.dmg,
        range: def.range, speed: def.speed, cd: def.cd,
        timer: 0.15, aoe: def.aoe, proj: def.proj,
        facing, phase: Math.random() * 6, alive: true,
        frozen: 0, knock: 0, width: type === 2 ? 56 : 28,
        attackT: 0, hitT: 0, walking: false
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
      if (this.freezeT > 0) this.freezeT -= t;
      this.enemyAiStep(t);
      this.turretStep(t);

      for (const u of this.units) {
        if (!u.alive) continue;
        if (u.attackT > 0) u.attackT = Math.max(0, u.attackT - t);
        if (u.hitT > 0) u.hitT = Math.max(0, u.hitT - t);
        if (u.frozen > 0) { u.frozen -= t; u.walking = false; continue; }
        if (u.knock) {
          u.x += u.knock * t;
          u.knock *= Math.max(0, 1 - t * 6);
          u.knock -= t * 8 * Math.sign(u.knock || 1);
          if (Math.abs(u.knock) < 2) u.knock = 0;
        }
        u.timer -= t;
        const foe = this.closestFoe(u);
        const baseX = u.team === "player" ? this.baseX.enemy : this.baseX.player;
        const distBase = Math.abs(baseX - u.x);
        u.walking = false;
        if (foe && Math.abs(foe.x - u.x) <= u.range) {
          if (u.timer <= 0) this.attackUnit(u, foe);
        } else if (!foe && distBase <= u.range + 8) {
          if (u.timer <= 0) this.attackBase(u);
        } else {
          u.x += u.facing * u.speed * t;
          u.walking = Math.abs(u.knock) < 6;
        }
      }

      for (const p of this.projectiles) {
        p.x += (p.vx || 0) * t;
        p.y += (p.vy || 0) * t;
        p.life -= t;
        if (p.target && p.target.alive) {
          if (Math.abs(p.x - p.target.x) < 12) {
            this.hit(p.target, p.dmg, p.aoe, p.x, p.crit);
            p.life = 0;
          }
        } else if (p.life <= 0 || p.x < -20 || p.x > this.W + 20) {
          p.life = 0;
        }
      }
      this.projectiles = this.projectiles.filter((p) => p.life > 0);

      for (const f of this.fx) f.t += t;
      this.fx = this.fx.filter((f) => f.t < f.life);

      this.units = this.units.filter((u) => u.alive || u.deadT < 0.75);
      for (const u of this.units) if (!u.alive) u.deadT = (u.deadT || 0) + t;

      if (this.enemyHp <= 0) this.finish(true);
      else if (this.playerHp <= 0) this.finish(false);
    }

    turretStep(t) {
      if (this.turretLevel <= 0 || this.ended) return;
      this.turretCd -= t;
      if (this.turretCd > 0) return;
      let best = null, bestD = 1e9;
      for (const o of this.units) {
        if (!o.alive || o.team !== "enemy") continue;
        const d = Math.abs(o.x - this.baseX.player);
        if (d < bestD && d < 200 + this.turretLevel * 30) { bestD = d; best = o; }
      }
      if (!best) return;
      this.turretCd = Math.max(0.45, 1.1 - this.turretLevel * 0.2);
      const dmg = 6 + this.turretLevel * 5 + this.era * 3;
      this.shoot(this.baseX.player + 28, this.laneY - 18, best, dmg, 0, "bullet", "#5ba7ff", "#fff", 1);
      this.fx.push({ kind: "flash", x: this.baseX.player + 36, y: this.laneY - 18, t: 0, life: 0.12 });
    }

    enemyAiStep(t) {
      if (this.freezeT > 0) return;
      this.enemyAi.wait -= t;
      if (this.enemyAi.wait > 0) return;
      const defs = D.ERAS[this.era].units;
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
        if (u.team === "player" && o.x < u.x - 8) continue;
        if (u.team === "enemy" && o.x > u.x + 8) continue;
        if (d < bestD) { bestD = d; best = o; }
      }
      return best;
    }

    rollCrit() { return Math.random() < this.crit; }

    muzzleOf(u) {
      const img = Draw.getSprite(u.team, u.era, u.type);
      const scale = u.type === 2 ? 1.18 : 1.08;
      return Draw.muzzleOffset({ era: u.era, type: u.type, team: u.team, facing: u.facing, scale }, img);
    }

    shoot(x, y, target, dmg, aoe, kind, color, glow, facing) {
      const spd = kind === "laser" ? 420 : kind === "cannon" ? 170 : kind === "arrow" ? 230 : kind === "stone" ? 180 : 260;
      this.projectiles.push({
        x, y, vx: (facing || 1) * spd, vy: 0,
        dmg, aoe, target, life: 1.2,
        r: kind === "cannon" ? 8 : kind === "stone" ? 6 : 4,
        kind, color, glow, crit: false
      });
    }

    attackUnit(u, foe) {
      u.timer = u.cd;
      u.attackT = 0.28;
      const isRanged = u.proj && u.proj !== "none";
      const crit = u.team === "player" && this.rollCrit();
      const dmg = crit ? u.dmg * 1.6 : u.dmg;
      const tip = this.muzzleOf(u);
      if (isRanged) {
        const colors = { stone: "#888", arrow: "#6a4a20", bullet: "#ffe27a", cannon: "#3a3028", laser: u.team === "player" ? "#5ba7ff" : "#e080ff" };
        this.shoot(u.x + tip.x, u.y + tip.y, foe, dmg, u.aoe, u.proj, colors[u.proj] || "#ffe27a", u.proj === "laser" ? colors[u.proj] : null, u.facing);
        this.projectiles[this.projectiles.length - 1].crit = crit;
        this.fx.push({ kind: "flash", x: u.x + tip.x, y: u.y + tip.y, t: 0, life: 0.16 });
      } else {
        this.fx.push({ kind: "slash", x: u.x + tip.x, y: u.y + tip.y, t: 0, life: 0.18, facing: u.facing, color: u.team === "player" ? "#c8e8ff" : "#e0b0ff" });
        this.hit(foe, dmg, u.aoe, foe.x, crit);
      }
    }

    attackBase(u) {
      u.timer = u.cd * 0.9;
      let dmg = u.dmg;
      const crit = u.team === "player" && this.rollCrit();
      if (crit) dmg *= 1.6;
      u.attackT = 0.28;
      const tip = this.muzzleOf(u);
      if (u.proj && u.proj !== "none") {
        this.fx.push({ kind: "flash", x: u.x + tip.x, y: u.y + tip.y, t: 0, life: 0.16 });
      } else {
        this.fx.push({ kind: "slash", x: u.x + tip.x, y: u.y + tip.y, t: 0, life: 0.18, facing: u.facing, color: "#fff" });
      }
      if (u.team === "player") {
        this.enemyHp = Math.max(0, this.enemyHp - dmg);
        this.addCoins(Math.max(1, Math.round(dmg * 0.35)), u.x, u.y - 30);
      } else {
        this.damagePlayerBase(dmg);
      }
      this.fx.push({ kind: "txt", x: u.team === "player" ? this.baseX.enemy : this.baseX.player, y: this.laneY - 70, t: 0, life: 0.6, text: (crit ? "КРИТ " : "-") + Math.round(dmg), color: crit ? "#f5c542" : "#c03030", crit });
    }

    damagePlayerBase(dmg) {
      if (this.shield > 0) {
        const use = Math.min(this.shield, dmg);
        this.shield -= use;
        dmg -= use;
        this.fx.push({ kind: "spark", x: this.baseX.player, y: this.laneY - 40, t: 0, life: 0.3, color: "#7ec8f0" });
      }
      if (dmg > 0) this.playerHp = Math.max(0, this.playerHp - dmg);
    }

    hit(target, dmg, aoe, x, crit) {
      const apply = (u, amount, isCrit) => {
        if (!u.alive) return;
        u.hp -= amount;
        u.hitT = 0.16;
        u.knock = (u.team === "player" ? -1 : 1) * (isCrit ? 40 : 22);
        this.fx.push({ kind: "txt", x: u.x, y: u.y - 40, t: 0, life: 0.55, text: (isCrit ? "КРИТ " : "-") + Math.round(amount), color: isCrit ? "#f5c542" : "#c44", crit: isCrit });
        this.fx.push({ kind: "spark", x: u.x, y: u.y - 16, t: 0, life: 0.25, color: isCrit ? "#ffe27a" : "#fff" });
        if (u.hp <= 0) this.kill(u);
      };
      apply(target, dmg, crit);
      if (aoe) {
        for (const o of this.units) {
          if (!o.alive || o.team !== target.team || o === target) continue;
          if (Math.abs(o.x - x) <= aoe) apply(o, dmg * 0.45, false);
        }
      }
    }

    kill(u) {
      u.alive = false;
      u.hp = 0;
      u.deadT = 0;
      this.fx.push({ kind: "poof", x: u.x, y: u.y - 10, t: 0, life: 0.4, color: u.team === "enemy" ? "rgba(160,100,200,.75)" : "rgba(180,200,230,.75)" });
      if (u.team === "enemy") {
        const coins = Math.max(1, Math.round((1 + u.type + Math.floor(this.battleNo / 3)) * this.coinMul));
        this.addCoins(coins, u.x, u.y - 24);
      }
    }

    addCoins(n, x, y) {
      n = Math.max(1, Math.round(n * (x != null ? 1 : 1)));
      this.coinsEarned += n;
      this.fx.push({ kind: "coin", x: x || this.W / 2, y: y || this.laneY, t: 0, life: 0.7, text: "+" + n });
    }

    canUseSkill(id) { return (this.skills[id] | 0) > 0 && !this.ended && !this.paused; }

    useSkill(id) {
      if (!this.canUseSkill(id)) return false;
      this.skills[id]--;
      if (this.save.skills) this.save.skills[id] = this.skills[id];
      if (id === "airstrike") {
        for (const u of this.units) {
          if (u.alive && u.team === "enemy") this.hit(u, 18 + this.era * 10, 0, u.x, false);
        }
        this.enemyHp = Math.max(0, this.enemyHp - (12 + this.era * 8));
        this.fx.push({ kind: "slash", x: this.W * 0.6, y: this.laneY - 80, t: 0, life: 0.5, facing: 1, color: "#5ba7ff" });
        this.fx.push({ kind: "flash", x: this.W * 0.65, y: this.laneY - 20, t: 0, life: 0.3 });
      } else if (id === "freeze") {
        this.freezeT = 3;
        for (const u of this.units) if (u.alive && u.team === "enemy") {
          u.frozen = 3;
          this.fx.push({ kind: "ice", x: u.x, y: u.y - 10, t: 0, life: 3 });
        }
      } else if (id === "shield") {
        this.shieldMax = 40 + this.era * 20 + this.playerMax * 0.25;
        this.shield = this.shieldMax;
        this.fx.push({ kind: "heal", x: this.baseX.player, y: this.laneY, t: 0, life: 0.6, color: "#7ec8f0" });
      } else if (id === "heal") {
        for (const u of this.units) if (u.alive && u.team === "player") {
          u.hp = Math.min(u.maxHp, u.hp + u.maxHp * 0.55);
          this.fx.push({ kind: "heal", x: u.x, y: u.y, t: 0, life: 0.5 });
        }
        this.playerHp = Math.min(this.playerMax, this.playerHp + this.playerMax * 0.2);
      } else if (id === "meteor") {
        const cx = this.W * 0.62;
        this.fx.push({ kind: "meteor", x: cx, y: this.laneY, t: 0, life: 0.45 });
        const dmg = 28 + this.era * 14;
        for (const u of this.units) {
          if (u.alive && u.team === "enemy" && Math.abs(u.x - cx) < 90) this.hit(u, dmg, 0, u.x, false);
        }
        if (Math.abs(this.baseX.enemy - cx) < 120) this.enemyHp = Math.max(0, this.enemyHp - dmg * 0.5);
      } else if (id === "clone") {
        const live = this.units.filter((u) => u.alive && u.team === "player").slice(0, 4);
        live.forEach((u, i) => {
          const c = this.spawn(u.type, "player", u.x - 12 - i * 6);
          if (c) { c.hp = Math.max(1, Math.round(c.maxHp * 0.6)); c.maxHp = c.hp; }
        });
      }
      return true;
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
      Draw.drawBaseWithHp(ctx, this.baseX.player, this.laneY - 4, "player", this.playerHp, this.playerMax, 118, 140, {
        shield: this.shield, shieldMax: this.shieldMax, turretLevel: this.turretLevel
      });
      Draw.drawBaseWithHp(ctx, this.baseX.enemy, this.laneY - 4, "enemy", this.enemyHp, this.enemyMax, 118, 140, {});

      const list = this.units.slice().sort((a, b) => a.y - b.y);
      for (const u of list) {
        ctx.save();
        ctx.translate(u.x, u.y);
        if (u.frozen > 0) ctx.filter = "saturate(0.6) brightness(1.15)";
        Draw.drawUnit(ctx, {
          era: u.era, type: u.type, team: u.team, look: u.look, skin: this.skin,
          scale: u.type === 2 ? 1.18 : 1.08, facing: u.facing,
          t: this.time + u.phase, hpRatio: u.alive ? u.hp / u.maxHp : 0,
          walking: !!u.walking && u.alive, attack: u.attackT || 0, hit: u.hitT || 0,
          deadT: u.alive ? 0 : (u.deadT || 0)
        });
        ctx.filter = "none";
        ctx.restore();
      }
      for (const p of this.projectiles) Draw.drawProjectile(ctx, p);
      for (const f of this.fx) Draw.drawFx(ctx, f);
    }
  }

  global.LW_Battle = Battle;
})(window);
