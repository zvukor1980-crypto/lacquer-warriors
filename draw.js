/* Отрисовка воительниц: мультяшный светлый стиль, лаковая броня */
(function (global) {
  const ENEMY = {
    armor: "#c9a0e8",
    armorDk: "#9b6ec4",
    accent: "#f3e9ff",
    metal: "#e8d4ff",
    hair: "#5a3a78",
    skin: "#f7c8a8",
    blush: "#f19aaa",
    trim: "#8e6bb8"
  };

  const PAL = [
    { // stone
      armor: "#8d5a3a", armorDk: "#6a4028", accent: "#f0e0c0", metal: "#d9c29a",
      hair: "#4a2c18", skin: "#f0c8a0", blush: "#e89a8a", trim: "#c4a878",
      mount: "#7aaa4a", mountDk: "#5a8838"
    },
    { // farm
      armor: "#6b8e3d", armorDk: "#4e6a2a", accent: "#f3e58a", metal: "#d4c878",
      hair: "#5c3a18", skin: "#f2c9a2", blush: "#e8a090", trim: "#c9a84a",
      mount: "#c4a05a"
    },
    { // sparta
      armor: "#c41e3a", armorDk: "#8e1528", accent: "#f5e6c8", metal: "#e0c25a",
      hair: "#3a2418", skin: "#f0c4a0", blush: "#e88890", trim: "#e0c25a"
    },
    { // renaissance
      armor: "#e86a9a", armorDk: "#c44e7a", accent: "#ffe6f0", metal: "#e8c86a",
      hair: "#6b3a28", skin: "#f3cbb0", blush: "#ef9aa8", trim: "#f0d08a"
    },
    { // modern
      armor: "#e8f6f2", armorDk: "#b8d4cc", accent: "#7ed4b8", metal: "#9ee0d0",
      hair: "#6b3a28", skin: "#f2c8a4", blush: "#e8a0a0", trim: "#4aa", visor: "#4ec4d4"
    },
    { // space
      armor: "#d8c4f8", armorDk: "#a890d8", accent: "#f4ecff", metal: "#c8f0ff",
      hair: "#7b5ea7", skin: "#f0c8b0", blush: "#e8a0c0", trim: "#e8b8ff", glow: "#b8f0ff"
    }
  ];

  function pal(era, team) {
    return team === "enemy" ? Object.assign({}, PAL[era] || PAL[0], ENEMY) : (PAL[era] || PAL[0]);
  }

  function rr(ctx, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  function gloss(ctx, x, y, w, h) {
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.ellipse(x + w * 0.8, y + h * 0.6, w * 0.35, h * 0.3, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function plate(ctx, x, y, w, h, r, color, dk) {
    rr(ctx, x, y, w, h, r);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.fillStyle = dk;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(x, y + h * 0.55, w, h * 0.5);
    ctx.restore();
    ctx.strokeStyle = dk;
    ctx.lineWidth = 1.2;
    rr(ctx, x, y, w, h, r);
    ctx.stroke();
    gloss(ctx, x + w * 0.32, y + h * 0.28, w * 0.28, h * 0.18);
  }

  function skinTone(p) { return p.skin; }

  function drawHead(ctx, p, opt) {
    const s = opt.scale || 1;
    const blink = opt.blink ? 0.15 : 1;
    // hair back
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.ellipse(0, -22 * s, 15 * s, 16 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    if (opt.hair === "pony") {
      ctx.beginPath();
      ctx.ellipse(12 * s, -18 * s, 6 * s, 14 * s, 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (opt.hair === "bun") {
      ctx.beginPath();
      ctx.ellipse(0, -34 * s, 7 * s, 6 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (opt.hair === "long") {
      ctx.beginPath();
      ctx.ellipse(-13 * s, -10 * s, 5 * s, 16 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(13 * s, -10 * s, 5 * s, 16 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // head
    ctx.fillStyle = skinTone(p);
    ctx.beginPath();
    ctx.ellipse(0, -18 * s, 13 * s, 13.5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(80,40,30,.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    // bangs
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.ellipse(-7 * s, -26 * s, 8 * s, 6 * s, -0.4, 0, Math.PI * 2);
    ctx.ellipse(6 * s, -26.5 * s, 8 * s, 6 * s, 0.35, 0, Math.PI * 2);
    ctx.fill();
    // blush
    ctx.fillStyle = p.blush;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.ellipse(-8 * s, -15 * s, 3.2 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.ellipse(8 * s, -15 * s, 3.2 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    // eyes
    const ey = -19 * s;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-5 * s, ey, 3.4 * s, 4.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(5 * s, ey, 3.4 * s, 4.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3a2018";
    ctx.beginPath();
    ctx.ellipse(-4.6 * s, ey, 2.1 * s, 2.8 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(5.4 * s, ey, 2.1 * s, 2.8 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-3.6 * s, ey - 1.2 * s, 1 * s, 1.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(6.4 * s, ey - 1.2 * s, 1 * s, 1.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    // lashes
    ctx.strokeStyle = "#3a2018";
    ctx.lineWidth = 1.1 * s;
    ctx.beginPath();
    ctx.moveTo(-8.2 * s, ey - 3 * s * blink);
    ctx.lineTo(-6 * s, ey - 5 * s * blink);
    ctx.moveTo(8.2 * s, ey - 3 * s * blink);
    ctx.lineTo(6 * s, ey - 5 * s * blink);
    ctx.stroke();
    // smile
    ctx.strokeStyle = "#c06060";
    ctx.lineWidth = 1.2 * s;
    ctx.beginPath();
    ctx.arc(0, -14.5 * s, 3.2 * s, 0.15, Math.PI - 0.15);
    ctx.stroke();
  }

  function drawHelmet(ctx, p, era, s) {
    if (era === 0) {
      // bone headband
      ctx.fillStyle = p.accent;
      rr(ctx, -12 * s, -28 * s, 24 * s, 6 * s, 3 * s);
      ctx.fill();
      ctx.fillStyle = p.metal;
      ctx.beginPath();
      ctx.arc(-8 * s, -31 * s, 3 * s, 0, Math.PI * 2);
      ctx.arc(8 * s, -31 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
    } else if (era === 2) {
      // spartan helmet
      plate(ctx, -14 * s, -34 * s, 28 * s, 16 * s, 8 * s, p.metal, p.trim);
      // crest
      ctx.fillStyle = p.armor;
      ctx.beginPath();
      ctx.moveTo(0, -48 * s);
      ctx.quadraticCurveTo(8 * s, -40 * s, 3 * s, -30 * s);
      ctx.lineTo(-3 * s, -30 * s);
      ctx.quadraticCurveTo(-8 * s, -40 * s, 0, -48 * s);
      ctx.fill();
      ctx.strokeStyle = p.armorDk;
      ctx.stroke();
    } else if (era === 3) {
      // musketeer hat
      ctx.fillStyle = "#f4a0c0";
      ctx.beginPath();
      ctx.ellipse(0, -30 * s, 18 * s, 6 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.armor;
      ctx.beginPath();
      ctx.ellipse(0, -34 * s, 10 * s, 8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(10 * s, -38 * s, 5 * s, 3 * s, 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (era === 4) {
      // visor headset
      ctx.fillStyle = p.visor || p.trim;
      rr(ctx, -13 * s, -24 * s, 26 * s, 7 * s, 3 * s);
      ctx.fill();
      gloss(ctx, -4 * s, -22 * s, 6 * s, 2 * s);
      ctx.fillStyle = p.armorDk;
      ctx.beginPath();
      ctx.arc(-14 * s, -18 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
    } else if (era === 5) {
      plate(ctx, -13 * s, -34 * s, 26 * s, 18 * s, 9 * s, p.armor, p.armorDk);
      ctx.fillStyle = p.glow || "#c8f0ff";
      ctx.globalAlpha = 0.7;
      rr(ctx, -7 * s, -24 * s, 14 * s, 5 * s, 2 * s);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (era === 1) {
      // small straw/leaf
      ctx.fillStyle = p.accent;
      ctx.beginPath();
      ctx.ellipse(0, -30 * s, 14 * s, 5 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.armor;
      ctx.beginPath();
      ctx.ellipse(8 * s, -34 * s, 4 * s, 3 * s, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawLegs(ctx, p, s, stance) {
    const gap = stance === "ride" ? 6 : 5;
    plate(ctx, -gap * s - 5 * s, 16 * s, 8 * s, 14 * s, 3 * s, p.armor, p.armorDk);
    plate(ctx, gap * s - 3 * s, 16 * s, 8 * s, 14 * s, 3 * s, p.armor, p.armorDk);
    // boots
    ctx.fillStyle = p.armorDk;
    rr(ctx, -gap * s - 6 * s, 27 * s, 10 * s, 5 * s, 2 * s);
    ctx.fill();
    rr(ctx, gap * s - 4 * s, 27 * s, 10 * s, 5 * s, 2 * s);
    ctx.fill();
  }

  function drawBody(ctx, p, s, wide) {
    const w = (wide ? 26 : 22) * s;
    plate(ctx, -w / 2, -6 * s, w, 24 * s, 8 * s, p.armor, p.armorDk);
    // trim belt
    ctx.fillStyle = p.trim;
    rr(ctx, -w / 2 + 2, 8 * s, w - 4, 4 * s, 2 * s);
    ctx.fill();
    gloss(ctx, -w * 0.15, -1 * s, w * 0.22, 5 * s);
  }

  function club(ctx, s, color) {
    ctx.save();
    ctx.translate(16 * s, 2 * s);
    ctx.rotate(0.5);
    ctx.fillStyle = color;
    rr(ctx, 0, -3 * s, 18 * s, 7 * s, 3 * s);
    ctx.fill();
    ctx.fillStyle = "#6a4a30";
    rr(ctx, -8 * s, -2 * s, 10 * s, 4 * s, 2 * s);
    ctx.fill();
    ctx.restore();
  }

  function spear(ctx, s, shaft, tip) {
    ctx.save();
    ctx.strokeStyle = shaft;
    ctx.lineWidth = 2.2 * s;
    ctx.beginPath();
    ctx.moveTo(10 * s, 8 * s);
    ctx.lineTo(14 * s, -36 * s);
    ctx.stroke();
    ctx.fillStyle = tip;
    ctx.beginPath();
    ctx.moveTo(14 * s, -44 * s);
    ctx.lineTo(18 * s, -34 * s);
    ctx.lineTo(10 * s, -34 * s);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function bow(ctx, s, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2 * s;
    ctx.beginPath();
    ctx.arc(16 * s, -4 * s, 14 * s, -1.1, 1.1);
    ctx.stroke();
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(16 * s, -17 * s);
    ctx.lineTo(16 * s, 9 * s);
    ctx.stroke();
    ctx.restore();
  }

  function sword(ctx, s, blade, hilt) {
    ctx.save();
    ctx.translate(15 * s, 4 * s);
    ctx.rotate(0.3);
    ctx.fillStyle = blade;
    rr(ctx, 0, -22 * s, 5 * s, 24 * s, 2 * s);
    ctx.fill();
    gloss(ctx, 2 * s, -14 * s, 1.5 * s, 6 * s);
    ctx.fillStyle = hilt;
    rr(ctx, -4 * s, 0, 13 * s, 3 * s, 1 * s);
    ctx.fill();
    ctx.restore();
  }

  function gun(ctx, s, color, long) {
    ctx.save();
    ctx.translate(12 * s, 0);
    ctx.fillStyle = color;
    rr(ctx, 0, -3 * s, (long ? 22 : 14) * s, 5 * s, 2 * s);
    ctx.fill();
    ctx.fillStyle = "#5a4030";
    rr(ctx, -4 * s, 0, 7 * s, 6 * s, 2 * s);
    ctx.fill();
    ctx.restore();
  }

  function shield(ctx, p, s) {
    ctx.save();
    ctx.translate(-16 * s, 2 * s);
    plate(ctx, -9 * s, -12 * s, 18 * s, 24 * s, 8 * s, p.metal, p.trim);
    ctx.fillStyle = p.armor;
    ctx.beginPath();
    ctx.arc(0, 0, 5 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawHorse(ctx, p, s) {
    // body
    plate(ctx, -22 * s, 6 * s, 40 * s, 20 * s, 10 * s, "#f4efe4", "#c8bca8");
    // legs
    ctx.fillStyle = "#d8c8b0";
    rr(ctx, -18 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, -8 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 6 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 16 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    // head
    plate(ctx, 14 * s, -10 * s, 16 * s, 14 * s, 6 * s, "#f4efe4", "#c8bca8");
    ctx.fillStyle = "#3a2a20";
    ctx.beginPath();
    ctx.ellipse(28 * s, -8 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = p.armor;
    rr(ctx, -16 * s, 8 * s, 30 * s, 8 * s, 3 * s);
    ctx.fill();
    gloss(ctx, -8 * s, 10 * s, 8 * s, 3 * s);
  }

  function drawDino(ctx, p, s) {
    plate(ctx, -24 * s, 8 * s, 42 * s, 22 * s, 12 * s, p.mount || "#7aaa4a", p.mountDk || "#5a8838");
    // head
    plate(ctx, 10 * s, -6 * s, 22 * s, 16 * s, 8 * s, p.mount || "#7aaa4a", p.mountDk || "#5a8838");
    ctx.fillStyle = "#2a2018";
    ctx.beginPath();
    ctx.arc(28 * s, -2 * s, 2.2 * s, 0, Math.PI * 2);
    ctx.fill();
    // legs
    ctx.fillStyle = p.mountDk || "#5a8838";
    rr(ctx, -18 * s, 24 * s, 8 * s, 12 * s, 3 * s); ctx.fill();
    rr(ctx, 6 * s, 24 * s, 8 * s, 12 * s, 3 * s); ctx.fill();
    // tail
    ctx.beginPath();
    ctx.moveTo(-22 * s, 16 * s);
    ctx.quadraticCurveTo(-40 * s, 8 * s, -36 * s, 22 * s);
    ctx.quadraticCurveTo(-28 * s, 18 * s, -22 * s, 20 * s);
    ctx.fillStyle = p.mount || "#7aaa4a";
    ctx.fill();
  }

  function drawCannon(ctx, p, s) {
    ctx.fillStyle = "#6a5a48";
    rr(ctx, -8 * s, 18 * s, 8 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 10 * s, 18 * s, 8 * s, 14 * s, 2 * s); ctx.fill();
    plate(ctx, -6 * s, 0, 36 * s, 16 * s, 7 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.armorDk;
    ctx.beginPath();
    ctx.ellipse(32 * s, 8 * s, 6 * s, 6 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTank(ctx, p, s) {
    plate(ctx, -24 * s, 8 * s, 48 * s, 18 * s, 6 * s, p.accent || "#8aaa90", p.armorDk);
    plate(ctx, -14 * s, -4 * s, 28 * s, 16 * s, 6 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.trim;
    rr(ctx, 10 * s, -6 * s, 22 * s, 5 * s, 2 * s);
    ctx.fill();
    // treads
    ctx.fillStyle = "#5a5a58";
    rr(ctx, -26 * s, 22 * s, 52 * s, 8 * s, 3 * s);
    ctx.fill();
  }

  function drawShip(ctx, p, s) {
    plate(ctx, -26 * s, 0, 52 * s, 22 * s, 12 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.glow || "#b8f0ff";
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.ellipse(0, 24 * s, 14 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = p.metal;
    rr(ctx, -8 * s, -8 * s, 16 * s, 10 * s, 4 * s);
    ctx.fill();
  }

  /**
   * Рисует юнит в локальных координатах (ноги в y≈30).
   * opt: {era, type, team, scale, facing, t, blink, hpRatio}
   */
  function drawUnit(ctx, opt) {
    const era = opt.era | 0;
    const type = opt.type | 0;
    const team = opt.team || "player";
    const s = opt.scale || 1;
    const p = pal(era, team);
    const t = opt.t || 0;
    const bob = Math.sin(t * 6 + (opt.phase || 0)) * 1.2 * s;

    ctx.save();
    if (opt.facing === -1) ctx.scale(-1, 1);
    ctx.translate(0, bob);

    // mounts first
    if (type === 2 && era === 0) drawDino(ctx, p, s);
    if (type === 2 && era === 2) drawHorse(ctx, p, s);
    if (type === 2 && era === 3) drawCannon(ctx, p, s);
    if (type === 2 && era === 4) drawTank(ctx, p, s);
    if (type === 2 && era === 5) drawShip(ctx, p, s);

    const ride = type === 2 && (era === 0 || era === 2 || era === 4 || era === 5 || era === 3);
    const rs = ride ? s * 0.78 : s;
    if (ride) ctx.translate(era === 3 ? -8 * s : -2 * s, era === 4 || era === 5 ? -8 * s : -16 * s);

    if (!ride) drawLegs(ctx, p, rs, "walk");
    else drawLegs(ctx, p, rs, "ride");

    // back weapon
    if (type === 1) {
      if (era === 0 || era === 1) {
        // sling stone ready
      } else if (era !== 4 && era !== 3 && era !== 5) bow(ctx, rs, p.trim);
    }

    drawBody(ctx, p, rs, type === 2);
    drawHead(ctx, p, { scale: rs, hair: era === 1 || era === 4 ? "pony" : era === 3 ? "long" : era === 0 ? "bun" : "pony", blink: opt.blink });
    drawHelmet(ctx, p, era, rs);

    // front weapons / arms
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.ellipse(12 * rs, 4 * rs, 4 * rs, 4 * rs, 0, 0, Math.PI * 2);
    ctx.fill();

    if (type === 0) {
      if (era === 0) club(ctx, rs, p.trim);
      else if (era === 1) spear(ctx, rs, "#8a6a30", p.accent); // pitchfork-like
      else if (era === 2) { spear(ctx, rs, p.trim, p.metal); shield(ctx, p, rs); }
      else if (era === 3) sword(ctx, rs, p.metal, p.trim);
      else if (era === 4) club(ctx, rs, p.accent); // baton
      else sword(ctx, rs, p.glow || p.metal, p.trim);
    } else if (type === 1) {
      if (era === 0) {
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.arc(18 * rs, -8 * rs, 4 * rs, 0, Math.PI * 2);
        ctx.fill();
      } else if (era === 1) {
        ctx.fillStyle = p.trim;
        ctx.beginPath();
        ctx.arc(18 * rs, -6 * rs, 3.5 * rs, 0, Math.PI * 2);
        ctx.fill();
      } else if (era === 2) bow(ctx, rs, p.trim);
      else if (era === 3 || era === 4) gun(ctx, rs, era === 4 ? p.visor || "#6a7" : "#5a4030", true);
      else gun(ctx, rs, p.glow || p.metal, true);
    } else {
      if (era === 1) {
        // scythe
        ctx.save();
        ctx.strokeStyle = "#8a6a30";
        ctx.lineWidth = 2.2 * rs;
        ctx.beginPath();
        ctx.moveTo(8 * rs, 8 * rs);
        ctx.lineTo(16 * rs, -28 * rs);
        ctx.stroke();
        ctx.strokeStyle = p.metal;
        ctx.lineWidth = 3 * rs;
        ctx.beginPath();
        ctx.arc(16 * rs, -22 * rs, 10 * rs, -1.2, 0.4);
        ctx.stroke();
        ctx.restore();
      } else if (era === 0) spear(ctx, rs, p.trim, p.metal);
      else if (era === 2) spear(ctx, rs, p.trim, p.metal);
    }

    ctx.restore();

    // hp bar
    if (opt.hpRatio != null && opt.hpRatio < 1) {
      const w = 28 * s, h = 4 * s;
      ctx.fillStyle = "rgba(0,0,0,.35)";
      rr(ctx, -w / 2, -50 * s, w, h, 2);
      ctx.fill();
      ctx.fillStyle = opt.hpRatio > 0.4 ? "#6bc96a" : "#e85d4c";
      rr(ctx, -w / 2, -50 * s, w * Math.max(0, opt.hpRatio), h, 2);
      ctx.fill();
    }
  }

  function drawBase(ctx, x, y, side, hpRatio, w, h) {
    ctx.save();
    ctx.translate(x, y);
    if (side === "enemy") ctx.scale(-1, 1);
    const isE = side === "enemy";
    const wall = isE ? "#f0c0de" : "#f28a8a";
    const wallDk = isE ? "#d48ab8" : "#d45a5a";
    const roof = isE ? "#f4a0d0" : "#e85060";
    const door = isE ? "#e88ab8" : "#c46a3a";
    // mound
    ctx.fillStyle = "rgba(80,140,50,.35)";
    ctx.beginPath();
    ctx.ellipse(0, h * 0.42, w * 0.55, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // body
    plate(ctx, -w * 0.42, -h * 0.15, w * 0.84, h * 0.55, 16, wall, wallDk);
    // battlements / dome
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.18, w * 0.4, h * 0.22, 0, Math.PI, 0, true);
    ctx.fill();
    gloss(ctx, -w * 0.12, -h * 0.28, w * 0.16, h * 0.08);
    // heart emblem
    ctx.fillStyle = isE ? "#e878b8" : "#ffd24a";
    ctx.beginPath();
    const hx = 0, hy = h * 0.08, hs = 8;
    ctx.moveTo(hx, hy + hs * 0.3);
    ctx.bezierCurveTo(hx - hs, hy - hs * 0.4, hx - hs * 0.3, hy - hs, hx, hy - hs * 0.35);
    ctx.bezierCurveTo(hx + hs * 0.3, hy - hs, hx + hs, hy - hs * 0.4, hx, hy + hs * 0.3);
    ctx.fill();
    // door
    ctx.fillStyle = door;
    rr(ctx, -12, h * 0.12, 24, h * 0.28, 10);
    ctx.fill();
    ctx.restore();

    // hp bar above
    const bw = 70, bh = 10;
    const bx = x - bw / 2, by = y - h * 0.48;
    ctx.fillStyle = "rgba(0,0,0,.35)";
    rr(ctx, bx, by, bw, bh, 5);
    ctx.fill();
    ctx.fillStyle = hpRatio > 0.35 ? "#e85d4c" : "#c03030";
    rr(ctx, bx + 1, by + 1, (bw - 2) * Math.max(0, hpRatio), bh - 2, 4);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 9px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,.4)";
    ctx.shadowBlur = 2;
    ctx.fillText(Math.max(0, Math.ceil((optHpText(hpRatio)))), x, by + bh / 2);
    ctx.shadowBlur = 0;
  }

  function optHpText(ratio) {
    // filled later from caller — this helper is unused; drawBase gets numbers separately
    return "";
  }

  function drawBaseWithHp(ctx, x, y, side, hp, maxHp, w, h) {
    const ratio = maxHp > 0 ? hp / maxHp : 0;
    ctx.save();
    ctx.translate(x, y);
    if (side === "enemy") ctx.scale(-1, 1);
    const isE = side === "enemy";
    const wall = isE ? "#f0c0de" : "#f28a8a";
    const wallDk = isE ? "#d48ab8" : "#d45a5a";
    const roof = isE ? "#f4a0d0" : "#e85060";
    const door = isE ? "#c86898" : "#b45a30";
    ctx.fillStyle = "rgba(80,140,50,.3)";
    ctx.beginPath();
    ctx.ellipse(0, h * 0.42, w * 0.55, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    plate(ctx, -w * 0.42, -h * 0.12, w * 0.84, h * 0.54, 18, wall, wallDk);
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.16, w * 0.42, h * 0.24, 0, Math.PI, 0, true);
    ctx.fill();
    ctx.fillStyle = isE ? "#fff" : "#ffd24a";
    ctx.beginPath();
    ctx.arc(0, h * 0.08, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isE ? "#e878b8" : "#e85060";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.08 + 6);
    ctx.bezierCurveTo(-8, h * 0.08 - 2, -3, h * 0.08 - 8, 0, h * 0.08 - 2);
    ctx.bezierCurveTo(3, h * 0.08 - 8, 8, h * 0.08 - 2, 0, h * 0.08 + 6);
    ctx.fill();
    ctx.fillStyle = door;
    rr(ctx, -13, h * 0.14, 26, h * 0.28, 12);
    ctx.fill();
    ctx.restore();

    const bw = 74, bh = 12;
    const bx = x - bw / 2, by = y - h * 0.52;
    ctx.fillStyle = "rgba(40,20,20,.4)";
    rr(ctx, bx, by, bw, bh, 6);
    ctx.fill();
    ctx.fillStyle = "#e85d4c";
    rr(ctx, bx + 2, by + 2, (bw - 4) * Math.max(0, Math.min(1, ratio)), bh - 4, 4);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "600 10px Fredoka, Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(Math.max(0, Math.ceil(hp))), x, by + bh / 2);
  }

  function drawBackground(ctx, W, H, laneY) {
    // sky
    const g = ctx.createLinearGradient(0, 0, 0, laneY - 40);
    g.addColorStop(0, "#8fd6ff");
    g.addColorStop(1, "#d8f0ff");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // sun
    ctx.fillStyle = "#ffe27a";
    ctx.beginPath();
    ctx.arc(W * 0.72, 36, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,240,160,.35)";
    ctx.beginPath();
    ctx.arc(W * 0.72, 36, 36, 0, Math.PI * 2);
    ctx.fill();
    // clouds
    ctx.fillStyle = "rgba(255,255,255,.85)";
    cloud(ctx, 50, 40, 1);
    cloud(ctx, W * 0.45, 28, 0.8);
    cloud(ctx, W * 0.85, 58, 0.7);
    // far hills
    ctx.fillStyle = "#9fe08a";
    ctx.beginPath();
    ctx.ellipse(W * 0.2, laneY - 10, 120, 50, 0, 0, Math.PI * 2);
    ctx.ellipse(W * 0.7, laneY - 6, 140, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    // grass top
    ctx.fillStyle = "#8ed96a";
    ctx.fillRect(0, laneY - 70, W, H);
    // flowers
    for (let i = 0; i < 12; i++) {
      const fx = (i * 97 + 30) % W;
      const fy = laneY - 58 + (i % 3) * 10;
      if (Math.abs(fy - (laneY)) < 8) continue;
      ctx.fillStyle = i % 2 ? "#fff" : "#ff8fb3";
      ctx.beginPath();
      ctx.arc(fx, fy, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // path
    ctx.fillStyle = "#e8c99a";
    ctx.fillRect(0, laneY - 28, W, 58);
    ctx.fillStyle = "#d4b07a";
    ctx.fillRect(0, laneY - 28, W, 3);
    ctx.fillRect(0, laneY + 27, W, 3);
    // grass bottom
    ctx.fillStyle = "#7bc85c";
    ctx.fillRect(0, laneY + 30, W, H);
    // trees
    tree(ctx, 70, laneY - 88, 1);
    tree(ctx, 160, laneY - 80, 0.85);
    tree(ctx, W - 64, laneY - 90, 1.05);
    tree(ctx, W - 150, laneY - 76, 0.75);
    tree(ctx, 48, laneY + 110, 0.9);
    tree(ctx, W - 70, laneY + 120, 1);
    tree(ctx, W * 0.35, laneY + 150, 0.7);
    // tufts
    ctx.strokeStyle = "#5aaa40";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 18; i++) {
      const tx = (i * 73 + 20) % W;
      const ty = laneY + 48 + (i % 4) * 14;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.quadraticCurveTo(tx + 4, ty - 8, tx + 2, ty - 14);
      ctx.stroke();
    }
  }

  function tree(ctx, x, y, sc) {
    ctx.save();
    ctx.fillStyle = "#c48a4a";
    ctx.fillRect(x - 5 * sc, y - 8 * sc, 10 * sc, 22 * sc);
    ctx.fillStyle = "#6fce55";
    ctx.beginPath();
    ctx.arc(x, y - 22 * sc, 18 * sc, 0, Math.PI * 2);
    ctx.arc(x - 14 * sc, y - 12 * sc, 14 * sc, 0, Math.PI * 2);
    ctx.arc(x + 14 * sc, y - 12 * sc, 14 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.beginPath();
    ctx.arc(x - 6 * sc, y - 26 * sc, 6 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function cloud(ctx, x, y, sc) {
    ctx.beginPath();
    ctx.arc(x, y, 16 * sc, 0, Math.PI * 2);
    ctx.arc(x + 18 * sc, y - 4 * sc, 20 * sc, 0, Math.PI * 2);
    ctx.arc(x + 36 * sc, y, 16 * sc, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawProjectile(ctx, pr) {
    ctx.save();
    ctx.translate(pr.x, pr.y);
    ctx.fillStyle = pr.color || "#888";
    ctx.beginPath();
    ctx.arc(0, 0, pr.r || 4, 0, Math.PI * 2);
    ctx.fill();
    if (pr.glow) {
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = pr.glow;
      ctx.beginPath();
      ctx.arc(0, 0, (pr.r || 4) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  global.LW_DRAW = {
    pal, drawUnit, drawBaseWithHp, drawBackground, drawProjectile, plate, gloss
  };
})(window);
