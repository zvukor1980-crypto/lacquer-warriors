/* Отрисовка: стиль A, Израиль vs Тёмный легион, разные воительницы, эффекты */
(function (global) {
  const SKIN_TINT = {
    israel: null,
    gold:    { armor: "#e8c44a", armorDk: "#b89220", accent: "#fff4c8", metal: "#ffe27a", trim: "#fff0b0" },
    teal:    { armor: "#2aa8a0", armorDk: "#1a7a74", accent: "#e8fffb", metal: "#8ee8e0", trim: "#c8fff8" },
    scarlet: { armor: "#e03a4a", armorDk: "#a81e2c", accent: "#ffe4e8", metal: "#f0c0c4", trim: "#ffd0d4" },
    opal:    { armor: "#d8c8f0", armorDk: "#9a88c4", accent: "#fff8ff", metal: "#c8f0ff", trim: "#ffe8ff" }
  };

  // База игрока: бело-голубые оттенки, разные на каждый тип/эпоху
  const PLAYER_LOOKS = [
    // stone
    [
      { hair: "#3a2a18", hairStyle: "bun", skin: "#f0c8a0", armor: "#3d7ad6", armorDk: "#2458a8", accent: "#ffffff", metal: "#d8e8ff", trim: "#ffffff", eyes: "#3a2818", blush: "#e89a8a", brow: "soft" },
      { hair: "#6b3a18", hairStyle: "pony", skin: "#e8b888", armor: "#5aa0ea", armorDk: "#2e6fbc", accent: "#ffffff", metal: "#e8f0ff", trim: "#c8dcff", eyes: "#2a3048", blush: "#e8a090", brow: "arch" },
      { hair: "#4a2810", hairStyle: "short", skin: "#d4a070", armor: "#1e4fa0", armorDk: "#163878", accent: "#ffffff", metal: "#f0f6ff", trim: "#ffd24a", eyes: "#402818", blush: "#d88880", brow: "strong" }
    ],
    // farm
    [
      { hair: "#5c3010", hairStyle: "braid", skin: "#f2c9a2", armor: "#4a90e0", armorDk: "#2c68b4", accent: "#fff8e0", metal: "#e0ecff", trim: "#ffffff", eyes: "#3a2818", blush: "#e8a090", brow: "soft" },
      { hair: "#c4a060", hairStyle: "bob", skin: "#f5d0b0", armor: "#7ec0f8", armorDk: "#3d88c8", accent: "#ffffff", metal: "#fff4c8", trim: "#ffe27a", eyes: "#486028", blush: "#f0b0a0", brow: "round" },
      { hair: "#2c1810", hairStyle: "bun", skin: "#c48858", armor: "#2458a0", armorDk: "#163870", accent: "#e8f4ff", metal: "#d0e0f8", trim: "#ffffff", eyes: "#201810", blush: "#c87870", brow: "strong" }
    ],
    // sparta
    [
      { hair: "#3a2010", hairStyle: "long", skin: "#f0c4a0", armor: "#1a4aad", armorDk: "#0e2e78", accent: "#ffffff", metal: "#e0c25a", trim: "#ffffff", eyes: "#3a2018", blush: "#e88890", brow: "arch", helmet: "sparta" },
      { hair: "#6a2810", hairStyle: "pony", skin: "#e8b890", armor: "#3d7ad6", armorDk: "#1e4fa0", accent: "#ffffff", metal: "#f0f4ff", trim: "#c8dcff", eyes: "#283050", blush: "#e89890", brow: "soft" },
      { hair: "#1a1008", hairStyle: "braid", skin: "#d8a878", armor: "#0d2d6e", armorDk: "#081c48", accent: "#e8f0ff", metal: "#e0c25a", trim: "#ffffff", eyes: "#201810", blush: "#d08078", brow: "strong", helmet: "sparta" }
    ],
    // renaissance
    [
      { hair: "#6b3a28", hairStyle: "long", skin: "#f3cbb0", armor: "#3a6fd0", armorDk: "#1e4aa0", accent: "#ffffff", metal: "#e8c86a", trim: "#ffffff", eyes: "#402820", blush: "#ef9aa8", brow: "arch", hat: "feather" },
      { hair: "#8a4a28", hairStyle: "bob", skin: "#f6d4b8", armor: "#5b8fe8", armorDk: "#2a5cb4", accent: "#fff0f4", metal: "#5a4030", trim: "#ffffff", eyes: "#304060", blush: "#f0a8a8", brow: "round", hat: "musketeer" },
      { hair: "#3a2018", hairStyle: "bun", skin: "#e0b090", armor: "#163878", armorDk: "#0c2458", accent: "#e8f0ff", metal: "#c0c8d8", trim: "#ffd24a", eyes: "#2a2018", blush: "#d88880", brow: "strong" }
    ],
    // modern
    [
      { hair: "#2a1a10", hairStyle: "short", skin: "#e8c0a0", armor: "#e8f2ff", armorDk: "#8ab0d8", accent: "#2a6ad4", metal: "#c8dcf0", trim: "#3d7ad6", eyes: "#2a3040", blush: "#e8a0a0", brow: "strong", visor: "#3d8ae6" },
      { hair: "#5c3a18", hairStyle: "pony", skin: "#f2c8a4", armor: "#d0e4f8", armorDk: "#6a98c8", accent: "#ffffff", metal: "#4ec4d4", trim: "#1e4fa0", eyes: "#283848", blush: "#e8a0a0", brow: "soft", visor: "#4ec4d4" },
      { hair: "#1a1010", hairStyle: "bob", skin: "#c49068", armor: "#f4f8ff", armorDk: "#90a8c4", accent: "#1a4aad", metal: "#d0dce8", trim: "#0e2e78", eyes: "#201810", blush: "#c87870", brow: "arch" }
    ],
    // space
    [
      { hair: "#e8eef8", hairStyle: "short", skin: "#f0c8b0", armor: "#3d7ad6", armorDk: "#1e4fa0", accent: "#ffffff", metal: "#c8f0ff", trim: "#ffffff", eyes: "#204060", blush: "#e8a0c0", brow: "arch", glow: "#b8e0ff", helmet: "space" },
      { hair: "#4a70c0", hairStyle: "pony", skin: "#e8b898", armor: "#7eb4f0", armorDk: "#3d7ad6", accent: "#ffffff", metal: "#e0f4ff", trim: "#fff", eyes: "#283858", blush: "#e8a0b0", brow: "soft", glow: "#d0f0ff", helmet: "space" },
      { hair: "#d0d8f0", hairStyle: "bun", skin: "#d4a888", armor: "#0e2e78", armorDk: "#081c50", accent: "#c8f0ff", metal: "#a8e0ff", trim: "#ffffff", eyes: "#102038", blush: "#d08090", brow: "strong", glow: "#80e0ff", helmet: "space" }
    ]
  ];

  const ENEMY_LOOKS = [
    [
      { hair: "#1a0a18", hairStyle: "short", skin: "#c89070", armor: "#4a2068", armorDk: "#2a1040", accent: "#c9a0e8", metal: "#2a1020", trim: "#8e4ec0", eyes: "#2a1020", blush: "#a06070", brow: "strong" },
      { hair: "#3a1848", hairStyle: "twin", skin: "#e0b090", armor: "#6a38a0", armorDk: "#3c1868", accent: "#e8d0ff", metal: "#1a0818", trim: "#c080ff", eyes: "#301040", blush: "#b07080", brow: "arch" },
      { hair: "#100810", hairStyle: "bun", skin: "#a87858", armor: "#2a1038", armorDk: "#14081c", accent: "#b080d8", metal: "#3a2048", trim: "#e0c25a", eyes: "#180c10", blush: "#8a5058", brow: "strong" }
    ],
    [
      { hair: "#2a1020", hairStyle: "braid", skin: "#d4a07a", armor: "#5a2878", armorDk: "#34104c", accent: "#d8b8f0", metal: "#2a1828", trim: "#a060d0", eyes: "#201018", blush: "#a86870", brow: "soft" },
      { hair: "#4a1860", hairStyle: "bob", skin: "#f0c4a0", armor: "#7a48b0", armorDk: "#4a2478", accent: "#f0e0ff", metal: "#201018", trim: "#e8b8ff", eyes: "#401860", blush: "#c08090", brow: "round" },
      { hair: "#140810", hairStyle: "pony", skin: "#8a6048", armor: "#301040", armorDk: "#180820", accent: "#b898d8", metal: "#281828", trim: "#c9a0e8", eyes: "#100808", blush: "#805058", brow: "strong" }
    ],
    [
      { hair: "#1a0810", hairStyle: "long", skin: "#c89878", armor: "#3c1460", armorDk: "#200838", accent: "#c9a0e8", metal: "#2a1020", trim: "#e0c25a", eyes: "#200818", blush: "#a06070", brow: "strong", helmet: "horn" },
      { hair: "#301040", hairStyle: "pony", skin: "#e8b898", armor: "#6828a0", armorDk: "#3c1468", accent: "#f0d8ff", metal: "#1a0818", trim: "#d0a0ff", eyes: "#301040", blush: "#b07080", brow: "arch" },
      { hair: "#0c040c", hairStyle: "braid", skin: "#b08060", armor: "#240830", armorDk: "#100410", accent: "#a070c8", metal: "#3a1830", trim: "#e0c25a", eyes: "#140810", blush: "#8a5058", brow: "strong", helmet: "horn" }
    ],
    [
      { hair: "#2a1018", hairStyle: "long", skin: "#e0b090", armor: "#501870", armorDk: "#300848", accent: "#e8d0f8", metal: "#c0a040", trim: "#c9a0e8", eyes: "#201018", blush: "#b07080", brow: "arch", hat: "feather-dark" },
      { hair: "#401828", hairStyle: "bob", skin: "#f0c8a8", armor: "#7830a8", armorDk: "#4a1878", accent: "#fff0ff", metal: "#2a1020", trim: "#e8b0ff", eyes: "#381828", blush: "#c88898", brow: "round", hat: "musketeer-dark" },
      { hair: "#140810", hairStyle: "bun", skin: "#a87858", armor: "#280830", armorDk: "#100410", accent: "#c0a0d8", metal: "#3a2030", trim: "#e0c25a", eyes: "#140810", blush: "#8a5058", brow: "strong" }
    ],
    [
      { hair: "#1a1014", hairStyle: "short", skin: "#c89880", armor: "#3a2048", armorDk: "#1c1018", accent: "#a070d0", metal: "#2a1830", trim: "#8e4ec0", eyes: "#201018", blush: "#a06070", brow: "strong", visor: "#c060e0" },
      { hair: "#4a2060", hairStyle: "pony", skin: "#e8b8a0", armor: "#5a3080", armorDk: "#2c1438", accent: "#e0c0f8", metal: "#201020", trim: "#d080ff", eyes: "#301838", blush: "#b07080", brow: "soft", visor: "#e080ff" },
      { hair: "#0c080c", hairStyle: "bob", skin: "#8a6050", armor: "#1a0c18", armorDk: "#0c060c", accent: "#8050b0", metal: "#2a1a28", trim: "#a060d0", eyes: "#100808", blush: "#805058", brow: "arch", visor: "#9040c0" }
    ],
    [
      { hair: "#c8a0e8", hairStyle: "short", skin: "#d4a090", armor: "#3a1860", armorDk: "#1a0830", accent: "#e0b0ff", metal: "#80e0ff", trim: "#c080ff", eyes: "#201040", blush: "#c080a0", brow: "arch", glow: "#e0a0ff", helmet: "space-dark" },
      { hair: "#8040c0", hairStyle: "pony", skin: "#e8b8a8", armor: "#6828a8", armorDk: "#3c1470", accent: "#f8e0ff", metal: "#b0f0ff", trim: "#ffd0ff", eyes: "#301050", blush: "#d090b0", brow: "soft", glow: "#f0c0ff", helmet: "space-dark" },
      { hair: "#e8d0ff", hairStyle: "bun", skin: "#b88878", armor: "#180820", armorDk: "#0c0410", accent: "#a060d0", metal: "#60d0e8", trim: "#c080ff", eyes: "#100820", blush: "#a06070", brow: "strong", glow: "#c060ff", helmet: "space-dark" }
    ]
  ];

  function applySkin(look, skinId) {
    const t = SKIN_TINT[skinId];
    if (!t) return look;
    return Object.assign({}, look, t);
  }

  function lookFor(era, type, team, skinId) {
    era = Math.max(0, Math.min(5, era | 0));
    type = Math.max(0, Math.min(2, type | 0));
    if (team === "enemy") return Object.assign({}, ENEMY_LOOKS[era][type]);
    return applySkin(Object.assign({}, PLAYER_LOOKS[era][type]), skinId || "israel");
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
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.28;
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

  function drawHead(ctx, p, opt) {
    const s = opt.scale || 1;
    const blink = opt.blink ? 0.15 : 1;
    const hs = p.hairStyle || "pony";
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.ellipse(0, -22 * s, 15 * s, 16 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    if (hs === "pony") {
      ctx.beginPath(); ctx.ellipse(12 * s, -16 * s, 6 * s, 15 * s, 0.5, 0, Math.PI * 2); ctx.fill();
    } else if (hs === "bun") {
      ctx.beginPath(); ctx.ellipse(0, -35 * s, 7 * s, 6.5 * s, 0, 0, Math.PI * 2); ctx.fill();
    } else if (hs === "long") {
      ctx.beginPath();
      ctx.ellipse(-13 * s, -8 * s, 5.5 * s, 18 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(13 * s, -8 * s, 5.5 * s, 18 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "braid") {
      ctx.beginPath();
      ctx.ellipse(12 * s, -10 * s, 4 * s, 16 * s, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.accent || "#fff";
      ctx.beginPath(); ctx.arc(14 * s, 6 * s, 2 * s, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = p.hair;
    } else if (hs === "twin") {
      ctx.beginPath();
      ctx.ellipse(-13 * s, -14 * s, 5 * s, 10 * s, -0.4, 0, Math.PI * 2);
      ctx.ellipse(13 * s, -14 * s, 5 * s, 10 * s, 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "bob") {
      ctx.beginPath();
      ctx.ellipse(-12 * s, -16 * s, 6 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(12 * s, -16 * s, 6 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // head
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.ellipse(0, -18 * s, 13 * s, 13.5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(80,40,30,.25)";
    ctx.lineWidth = 1; ctx.stroke();
    // bangs
    ctx.fillStyle = p.hair;
    ctx.beginPath();
    ctx.ellipse(-7 * s, -26 * s, 8 * s, 6 * s, -0.4, 0, Math.PI * 2);
    ctx.ellipse(6 * s, -26.5 * s, 8 * s, 6 * s, 0.35, 0, Math.PI * 2);
    ctx.fill();
    // blush
    ctx.fillStyle = p.blush || "#e89a8a";
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.ellipse(-8 * s, -15 * s, 3.2 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.ellipse(8 * s, -15 * s, 3.2 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    // freckles for round brow
    if (p.brow === "round") {
      ctx.fillStyle = "rgba(140,80,50,.35)";
      ctx.beginPath();
      ctx.arc(-6 * s, -13 * s, 0.7 * s, 0, Math.PI * 2);
      ctx.arc(-4 * s, -12 * s, 0.6 * s, 0, Math.PI * 2);
      ctx.arc(5 * s, -13 * s, 0.7 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    const ey = -19 * s;
    const eyeC = p.eyes || "#3a2018";
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-5 * s, ey, 3.4 * s, 4.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(5 * s, ey, 3.4 * s, 4.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = eyeC;
    ctx.beginPath();
    ctx.ellipse(-4.6 * s, ey, 2.1 * s, 2.8 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(5.4 * s, ey, 2.1 * s, 2.8 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-3.6 * s, ey - 1.2 * s, 1 * s, 1.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(6.4 * s, ey - 1.2 * s, 1 * s, 1.2 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = eyeC;
    ctx.lineWidth = 1.2 * s;
    ctx.beginPath();
    if (p.brow === "strong") {
      ctx.moveTo(-8.5 * s, ey - 5.2 * s * blink); ctx.lineTo(-3 * s, ey - 4.2 * s * blink);
      ctx.moveTo(8.5 * s, ey - 5.2 * s * blink); ctx.lineTo(3 * s, ey - 4.2 * s * blink);
    } else if (p.brow === "arch") {
      ctx.moveTo(-8.2 * s, ey - 4 * s * blink); ctx.quadraticCurveTo(-5 * s, ey - 6.5 * s * blink, -2.5 * s, ey - 4 * s * blink);
      ctx.moveTo(8.2 * s, ey - 4 * s * blink); ctx.quadraticCurveTo(5 * s, ey - 6.5 * s * blink, 2.5 * s, ey - 4 * s * blink);
    } else {
      ctx.moveTo(-8.2 * s, ey - 3 * s * blink); ctx.lineTo(-6 * s, ey - 5 * s * blink);
      ctx.moveTo(8.2 * s, ey - 3 * s * blink); ctx.lineTo(6 * s, ey - 5 * s * blink);
    }
    ctx.stroke();
    ctx.strokeStyle = "#c06060";
    ctx.lineWidth = 1.2 * s;
    ctx.beginPath();
    ctx.arc(0, -14.5 * s, 3.2 * s, 0.15, Math.PI - 0.15);
    ctx.stroke();
  }

  function drawHelmet(ctx, p, s) {
    const h = p.helmet || p.hat;
    if (!h) {
      if (p.visor) {
        ctx.fillStyle = p.visor;
        rr(ctx, -13 * s, -24 * s, 26 * s, 7 * s, 3 * s);
        ctx.fill();
        gloss(ctx, -4 * s, -22 * s, 6 * s, 2 * s);
        return;
      }
      return;
    }
    if (h === "sparta" || h === "horn") {
      plate(ctx, -14 * s, -34 * s, 28 * s, 16 * s, 8 * s, p.metal, p.trim);
      ctx.fillStyle = h === "horn" ? p.armor : p.accent;
      ctx.beginPath();
      ctx.moveTo(0, -50 * s);
      ctx.quadraticCurveTo(8 * s, -40 * s, 3 * s, -30 * s);
      ctx.lineTo(-3 * s, -30 * s);
      ctx.quadraticCurveTo(-8 * s, -40 * s, 0, -50 * s);
      ctx.fill();
      if (h === "horn") {
        ctx.fillStyle = p.metal;
        ctx.beginPath();
        ctx.moveTo(-14 * s, -30 * s); ctx.lineTo(-22 * s, -42 * s); ctx.lineTo(-10 * s, -32 * s);
        ctx.moveTo(14 * s, -30 * s); ctx.lineTo(22 * s, -42 * s); ctx.lineTo(10 * s, -32 * s);
        ctx.fill();
      }
    } else if (h === "musketeer" || h === "musketeer-dark" || h === "feather" || h === "feather-dark") {
      ctx.fillStyle = p.armor;
      ctx.beginPath();
      ctx.ellipse(0, -30 * s, 18 * s, 6 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.armorDk;
      ctx.beginPath();
      ctx.ellipse(0, -34 * s, 10 * s, 8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = h.indexOf("dark") >= 0 ? "#e8b0ff" : "#fff";
      ctx.beginPath();
      ctx.ellipse(10 * s, -38 * s, 5 * s, 3 * s, 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (h === "space" || h === "space-dark") {
      plate(ctx, -13 * s, -34 * s, 26 * s, 18 * s, 9 * s, p.armor, p.armorDk);
      ctx.fillStyle = p.glow || "#c8f0ff";
      ctx.globalAlpha = 0.75;
      rr(ctx, -7 * s, -24 * s, 14 * s, 5 * s, 2 * s);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawLegs(ctx, p, s) {
    plate(ctx, -10 * s, 16 * s, 8 * s, 14 * s, 3 * s, p.armor, p.armorDk);
    plate(ctx, 2 * s, 16 * s, 8 * s, 14 * s, 3 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.armorDk;
    rr(ctx, -11 * s, 27 * s, 10 * s, 5 * s, 2 * s); ctx.fill();
    rr(ctx, 1 * s, 27 * s, 10 * s, 5 * s, 2 * s); ctx.fill();
  }

  function drawBody(ctx, p, s, wide) {
    const w = (wide ? 26 : 22) * s;
    plate(ctx, -w / 2, -6 * s, w, 24 * s, 8 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.trim;
    rr(ctx, -w / 2 + 2, 8 * s, w - 4, 4 * s, 2 * s);
    ctx.fill();
    // Israeli-style thin stripe on chest for player looks (white or blue accent)
    ctx.fillStyle = p.accent;
    rr(ctx, -w * 0.2, -2 * s, w * 0.4, 3 * s, 1 * s);
    ctx.fill();
    gloss(ctx, -w * 0.15, -1 * s, w * 0.22, 5 * s);
  }

  function club(ctx, s, color) {
    ctx.save(); ctx.translate(16 * s, 2 * s); ctx.rotate(0.5);
    ctx.fillStyle = color; rr(ctx, 0, -3 * s, 18 * s, 7 * s, 3 * s); ctx.fill();
    ctx.fillStyle = "#6a4a30"; rr(ctx, -8 * s, -2 * s, 10 * s, 4 * s, 2 * s); ctx.fill();
    ctx.restore();
  }
  function spear(ctx, s, shaft, tip) {
    ctx.save();
    ctx.strokeStyle = shaft; ctx.lineWidth = 2.2 * s;
    ctx.beginPath(); ctx.moveTo(10 * s, 8 * s); ctx.lineTo(14 * s, -36 * s); ctx.stroke();
    ctx.fillStyle = tip;
    ctx.beginPath(); ctx.moveTo(14 * s, -44 * s); ctx.lineTo(18 * s, -34 * s); ctx.lineTo(10 * s, -34 * s); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  function bow(ctx, s, color) {
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = 2.2 * s;
    ctx.beginPath(); ctx.arc(16 * s, -4 * s, 14 * s, -1.1, 1.1); ctx.stroke();
    ctx.strokeStyle = "#eee"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(16 * s, -17 * s); ctx.lineTo(16 * s, 9 * s); ctx.stroke();
    ctx.restore();
  }
  function sword(ctx, s, blade, hilt) {
    ctx.save(); ctx.translate(15 * s, 4 * s); ctx.rotate(0.3);
    ctx.fillStyle = blade; rr(ctx, 0, -22 * s, 5 * s, 24 * s, 2 * s); ctx.fill();
    gloss(ctx, 2 * s, -14 * s, 1.5 * s, 6 * s);
    ctx.fillStyle = hilt; rr(ctx, -4 * s, 0, 13 * s, 3 * s, 1 * s); ctx.fill();
    ctx.restore();
  }
  function gun(ctx, s, color, long) {
    ctx.save(); ctx.translate(12 * s, 0);
    ctx.fillStyle = color; rr(ctx, 0, -3 * s, (long ? 22 : 14) * s, 5 * s, 2 * s); ctx.fill();
    ctx.fillStyle = "#5a4030"; rr(ctx, -4 * s, 0, 7 * s, 6 * s, 2 * s); ctx.fill();
    ctx.restore();
  }
  function shield(ctx, p, s) {
    ctx.save(); ctx.translate(-16 * s, 2 * s);
    plate(ctx, -9 * s, -12 * s, 18 * s, 24 * s, 8 * s, p.metal, p.trim);
    // mini star or emblem
    ctx.fillStyle = p.accent;
    ctx.beginPath(); ctx.arc(0, 0, 5 * s, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  function drawHorse(ctx, p, s) {
    plate(ctx, -22 * s, 6 * s, 40 * s, 20 * s, 10 * s, p.accent || "#f4efe4", p.armorDk);
    ctx.fillStyle = p.armorDk;
    rr(ctx, -18 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, -8 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 6 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 16 * s, 22 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    plate(ctx, 14 * s, -10 * s, 16 * s, 14 * s, 6 * s, p.accent || "#f4efe4", p.armorDk);
    ctx.fillStyle = "#3a2a20";
    ctx.beginPath(); ctx.ellipse(28 * s, -8 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = p.armor;
    rr(ctx, -16 * s, 8 * s, 30 * s, 8 * s, 3 * s); ctx.fill();
  }
  function drawDino(ctx, p, s) {
    const m = p.accent || "#7aaa4a", md = p.armorDk;
    plate(ctx, -24 * s, 8 * s, 42 * s, 22 * s, 12 * s, m, md);
    plate(ctx, 10 * s, -6 * s, 22 * s, 16 * s, 8 * s, m, md);
    ctx.fillStyle = "#2a2018";
    ctx.beginPath(); ctx.arc(28 * s, -2 * s, 2.2 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = md;
    rr(ctx, -18 * s, 24 * s, 8 * s, 12 * s, 3 * s); ctx.fill();
    rr(ctx, 6 * s, 24 * s, 8 * s, 12 * s, 3 * s); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-22 * s, 16 * s);
    ctx.quadraticCurveTo(-40 * s, 8 * s, -36 * s, 22 * s);
    ctx.quadraticCurveTo(-28 * s, 18 * s, -22 * s, 20 * s);
    ctx.fillStyle = m; ctx.fill();
  }
  function drawCannon(ctx, p, s) {
    ctx.fillStyle = p.armorDk;
    rr(ctx, -8 * s, 18 * s, 8 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 10 * s, 18 * s, 8 * s, 14 * s, 2 * s); ctx.fill();
    plate(ctx, -6 * s, 0, 36 * s, 16 * s, 7 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.armorDk;
    ctx.beginPath(); ctx.ellipse(32 * s, 8 * s, 6 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
  }
  function drawTank(ctx, p, s) {
    plate(ctx, -24 * s, 8 * s, 48 * s, 18 * s, 6 * s, p.accent || p.armor, p.armorDk);
    plate(ctx, -14 * s, -4 * s, 28 * s, 16 * s, 6 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.trim;
    rr(ctx, 10 * s, -6 * s, 22 * s, 5 * s, 2 * s); ctx.fill();
    ctx.fillStyle = "#5a5a58";
    rr(ctx, -26 * s, 22 * s, 52 * s, 8 * s, 3 * s); ctx.fill();
  }
  function drawShip(ctx, p, s) {
    plate(ctx, -26 * s, 0, 52 * s, 22 * s, 12 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.glow || "#b8f0ff";
    ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.ellipse(0, 24 * s, 14 * s, 5 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = p.metal;
    rr(ctx, -8 * s, -8 * s, 16 * s, 10 * s, 4 * s); ctx.fill();
  }

  function drawUnit(ctx, opt) {
    const era = opt.era | 0, type = opt.type | 0;
    const team = opt.team || "player";
    const s = opt.scale || 1;
    const p = opt.look || lookFor(era, type, team, opt.skin);
    const t = opt.t || 0;
    const bob = Math.sin(t * 6 + (opt.phase || 0)) * 1.2 * s;
    ctx.save();
    if (opt.facing === -1) ctx.scale(-1, 1);
    ctx.translate(0, bob);

    if (type === 2 && era === 0) drawDino(ctx, p, s);
    if (type === 2 && era === 2) drawHorse(ctx, p, s);
    if (type === 2 && era === 3) drawCannon(ctx, p, s);
    if (type === 2 && era === 4) drawTank(ctx, p, s);
    if (type === 2 && era === 5) drawShip(ctx, p, s);

    const ride = type === 2 && (era === 0 || era === 2 || era === 3 || era === 4 || era === 5);
    const rs = ride ? s * 0.78 : s;
    if (ride) ctx.translate(era === 3 ? -8 * s : -2 * s, (era === 4 || era === 5) ? -8 * s : -16 * s);

    drawLegs(ctx, p, rs);
    if (type === 1 && era === 2) bow(ctx, rs, p.trim);
    drawBody(ctx, p, rs, type === 2);
    drawHead(ctx, p, { scale: rs, blink: opt.blink });
    drawHelmet(ctx, p, rs);

    ctx.fillStyle = p.skin;
    ctx.beginPath(); ctx.ellipse(12 * rs, 4 * rs, 4 * rs, 4 * rs, 0, 0, Math.PI * 2); ctx.fill();

    if (type === 0) {
      if (era === 0) club(ctx, rs, p.trim);
      else if (era === 1) spear(ctx, rs, "#8a6a30", p.accent);
      else if (era === 2) { spear(ctx, rs, p.trim, p.metal); shield(ctx, p, rs); }
      else if (era === 3) sword(ctx, rs, p.metal, p.trim);
      else if (era === 4) club(ctx, rs, p.accent);
      else sword(ctx, rs, p.glow || p.metal, p.trim);
    } else if (type === 1) {
      if (era === 0 || era === 1) {
        ctx.fillStyle = era === 0 ? "#888" : p.trim;
        ctx.beginPath(); ctx.arc(18 * rs, -8 * rs, 4 * rs, 0, Math.PI * 2); ctx.fill();
      } else if (era === 2) bow(ctx, rs, p.trim);
      else if (era === 3 || era === 4) gun(ctx, rs, era === 4 ? (p.visor || "#6a7") : "#5a4030", true);
      else gun(ctx, rs, p.glow || p.metal, true);
    } else if (era === 1) {
      ctx.save();
      ctx.strokeStyle = "#8a6a30"; ctx.lineWidth = 2.2 * rs;
      ctx.beginPath(); ctx.moveTo(8 * rs, 8 * rs); ctx.lineTo(16 * rs, -28 * rs); ctx.stroke();
      ctx.strokeStyle = p.metal; ctx.lineWidth = 3 * rs;
      ctx.beginPath(); ctx.arc(16 * rs, -22 * rs, 10 * rs, -1.2, 0.4); ctx.stroke();
      ctx.restore();
    } else if (era === 0 || era === 2) spear(ctx, rs, p.trim, p.metal);

    ctx.restore();

    if (opt.hpRatio != null && opt.hpRatio < 1) {
      const w = 28 * s, h = 4 * s;
      ctx.fillStyle = "rgba(0,0,0,.35)";
      rr(ctx, -w / 2, -50 * s, w, h, 2); ctx.fill();
      ctx.fillStyle = opt.hpRatio > 0.4 ? "#6bc96a" : "#e85d4c";
      rr(ctx, -w / 2, -50 * s, w * Math.max(0, opt.hpRatio), h, 2); ctx.fill();
    }
  }

  function drawStarOfDavid(ctx, x, y, r, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 3);
      const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x1, y1); else ctx.lineTo(x1, y1);
    }
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = Math.PI / 2 + i * (Math.PI * 2 / 3);
      const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x1, y1); else ctx.lineTo(x1, y1);
    }
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function drawIsraelFlag(ctx, x, y, w, h) {
    ctx.save();
    rr(ctx, x, y, w, h, 3);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.fillStyle = "#0038b8";
    ctx.fillRect(x, y + h * 0.12, w, h * 0.16);
    ctx.fillRect(x, y + h * 0.72, w, h * 0.16);
    drawStarOfDavid(ctx, x + w / 2, y + h / 2, h * 0.22, "#0038b8");
    ctx.restore();
  }

  function drawLegionEmblem(ctx, x, y, r) {
    // вымышленная «Печать Легиона»: кольцо и трёхпалая звезда-коготь
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#c080ff";
    ctx.lineWidth = Math.max(2, r * 0.18);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#1a0818";
    ctx.beginPath(); ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#e0b0ff";
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 3);
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-r * 0.18, -r * 0.15);
      ctx.lineTo(0, -r * 0.75);
      ctx.lineTo(r * 0.18, -r * 0.15);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = "#8e4ec0";
    ctx.beginPath(); ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawTurret(ctx, x, y, level, facing) {
    if (level <= 0) return;
    ctx.save();
    ctx.translate(x, y);
    if (facing < 0) ctx.scale(-1, 1);
    plate(ctx, -10, -8, 20, 16, 4, "#e8f2ff", "#5b8fe8");
    ctx.fillStyle = "#3d7ad6";
    rr(ctx, 4, -5, 16 + level * 3, 6, 2); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "600 9px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Lv" + level, 0, -12);
    ctx.restore();
  }

  function drawBaseWithHp(ctx, x, y, side, hp, maxHp, w, h, extra) {
    extra = extra || {};
    const ratio = maxHp > 0 ? hp / maxHp : 0;
    ctx.save();
    ctx.translate(x, y);
    const isE = side === "enemy";
    const wall = isE ? "#3a1848" : "#d8e8ff";
    const wallDk = isE ? "#1a0818" : "#7aa4d8";
    const roof = isE ? "#5a2878" : "#3d7ad6";
    const door = isE ? "#2a1020" : "#1e4fa0";
    ctx.fillStyle = "rgba(80,140,50,.3)";
    ctx.beginPath(); ctx.ellipse(0, h * 0.42, w * 0.55, 12, 0, 0, Math.PI * 2); ctx.fill();
    plate(ctx, -w * 0.42, -h * 0.12, w * 0.84, h * 0.54, 18, wall, wallDk);
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.16, w * 0.42, h * 0.24, 0, Math.PI, 0, true);
    ctx.fill();
    if (isE) drawLegionEmblem(ctx, 0, h * 0.06, 14);
    else drawIsraelFlag(ctx, -16, h * 0.0, 32, 20);
    ctx.fillStyle = door;
    rr(ctx, -13, h * 0.2, 26, h * 0.22, 10); ctx.fill();
    // shield dome
    if (extra.shield > 0 && !isE) {
      ctx.strokeStyle = "rgba(80,180,255,.85)";
      ctx.fillStyle = "rgba(80,180,255,.18)";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, h * 0.05, w * 0.55, Math.PI, 0); ctx.fill(); ctx.stroke();
    }
    ctx.restore();

    if (extra.turretLevel && !isE) {
      drawTurret(ctx, x + 28, y - 8, extra.turretLevel, 1);
    }

    const bw = 74, bh = 12;
    const bx = x - bw / 2, by = y - h * 0.52;
    ctx.fillStyle = "rgba(40,20,20,.4)";
    rr(ctx, bx, by, bw, bh, 6); ctx.fill();
    ctx.fillStyle = isE ? "#b060e0" : "#3d7ad6";
    rr(ctx, bx + 2, by + 2, (bw - 4) * Math.max(0, Math.min(1, ratio)), bh - 4, 4); ctx.fill();
    if (extra.shield > 0 && !isE) {
      ctx.strokeStyle = "#7ec8f0";
      ctx.lineWidth = 2;
      rr(ctx, bx, by - 3, bw * Math.min(1, extra.shield / (extra.shieldMax || extra.shield)), 3, 1);
      ctx.stroke();
    }
    ctx.fillStyle = "#fff";
    ctx.font = "600 10px Fredoka, Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(Math.max(0, Math.ceil(hp))), x, by + bh / 2);

    // faction label
    ctx.font = "600 11px Fredoka, Trebuchet MS, sans-serif";
    ctx.fillStyle = isE ? "#e0b0ff" : "#0038b8";
    ctx.textBaseline = "top";
    ctx.fillText(isE ? "Тёмный легион" : "Израиль", x, by + bh + 3);
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
    ctx.beginPath(); ctx.arc(x - 6 * sc, y - 26 * sc, 6 * sc, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  function cloud(ctx, x, y, sc) {
    ctx.beginPath();
    ctx.arc(x, y, 16 * sc, 0, Math.PI * 2);
    ctx.arc(x + 18 * sc, y - 4 * sc, 20 * sc, 0, Math.PI * 2);
    ctx.arc(x + 36 * sc, y, 16 * sc, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawBackground(ctx, W, H, laneY) {
    const g = ctx.createLinearGradient(0, 0, 0, laneY - 40);
    g.addColorStop(0, "#8fd6ff");
    g.addColorStop(1, "#d8f0ff");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#ffe27a";
    ctx.beginPath(); ctx.arc(W * 0.72, 36, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,240,160,.35)";
    ctx.beginPath(); ctx.arc(W * 0.72, 36, 36, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.85)";
    cloud(ctx, 50, 40, 1);
    cloud(ctx, W * 0.45, 28, 0.8);
    cloud(ctx, W * 0.85, 58, 0.7);
    ctx.fillStyle = "#9fe08a";
    ctx.beginPath();
    ctx.ellipse(W * 0.2, laneY - 10, 120, 50, 0, 0, Math.PI * 2);
    ctx.ellipse(W * 0.7, laneY - 6, 140, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8ed96a";
    ctx.fillRect(0, laneY - 70, W, H);
    ctx.fillStyle = "#e8c99a";
    ctx.fillRect(0, laneY - 28, W, 58);
    ctx.fillStyle = "#d4b07a";
    ctx.fillRect(0, laneY - 28, W, 3);
    ctx.fillRect(0, laneY + 27, W, 3);
    ctx.fillStyle = "#7bc85c";
    ctx.fillRect(0, laneY + 30, W, H);
    tree(ctx, 70, laneY - 88, 1);
    tree(ctx, 160, laneY - 80, 0.85);
    tree(ctx, W - 64, laneY - 90, 1.05);
    tree(ctx, W - 150, laneY - 76, 0.75);
    tree(ctx, 48, laneY + 110, 0.9);
    tree(ctx, W - 70, laneY + 120, 1);
  }

  function drawProjectile(ctx, pr) {
    ctx.save();
    ctx.translate(pr.x, pr.y);
    const rot = Math.atan2(pr.vy || 0, pr.vx || 1);
    ctx.rotate(rot);
    const kind = pr.kind || "bullet";
    if (kind === "arrow") {
      ctx.fillStyle = pr.color || "#6a4a20";
      ctx.beginPath();
      ctx.moveTo(10, 0); ctx.lineTo(-8, -3); ctx.lineTo(-8, 3); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#c41e3a";
      ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(5, -3.5); ctx.lineTo(5, 3.5); ctx.closePath(); ctx.fill();
    } else if (kind === "stone") {
      ctx.fillStyle = pr.color || "#888";
      ctx.beginPath(); ctx.arc(0, 0, pr.r || 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.35)";
      ctx.beginPath(); ctx.arc(-1.5, -1.5, 1.5, 0, Math.PI * 2); ctx.fill();
    } else if (kind === "cannon") {
      ctx.fillStyle = "#3a3028";
      ctx.beginPath(); ctx.arc(0, 0, pr.r || 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,200,80,.4)";
      ctx.beginPath(); ctx.arc(-2, -2, 3, 0, Math.PI * 2); ctx.fill();
    } else if (kind === "laser") {
      ctx.strokeStyle = pr.color || "#80e0ff";
      ctx.shadowColor = pr.glow || "#80e0ff";
      ctx.shadowBlur = 8;
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(22, 0); ctx.stroke();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke();
    } else {
      // bullet streak — bright, with dark outline so it reads on grass
      ctx.fillStyle = "#5a3a10";
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 3.6, 0, 0, Math.PI * 2); ctx.fill();
      const grd = ctx.createLinearGradient(-16, 0, 12, 0);
      grd.addColorStop(0, "rgba(255,220,80,0)");
      grd.addColorStop(0.45, "#ffe27a");
      grd.addColorStop(1, "#fff8d0");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.ellipse(0, 0, 14, 2.6, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  function drawFx(ctx, f) {
    const a = Math.max(0, 1 - f.t / f.life);
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(f.x, f.y);
    if (f.kind === "txt" || f.kind === "coin") {
      ctx.fillStyle = f.color || (f.kind === "coin" ? "#d4a017" : "#c44");
      ctx.font = "700 " + (f.crit ? 20 : 16) + "px Fredoka, Trebuchet MS, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(f.text, 0, -f.t * 28);
    } else if (f.kind === "flash") {
      ctx.fillStyle = "#fff8c8";
      ctx.beginPath(); ctx.arc(0, 0, 14 * (1 + f.t * 5), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffd24a";
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
    } else if (f.kind === "slash") {
      ctx.strokeStyle = f.color || "#fff";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 22, -0.9 + (f.facing < 0 ? Math.PI : 0), 0.6 + (f.facing < 0 ? Math.PI : 0));
      ctx.stroke();
    } else if (f.kind === "spark") {
      ctx.fillStyle = f.color || "#ffe27a";
      for (let i = 0; i < 5; i++) {
        const an = i * 1.26 + f.t * 8;
        const rr = 4 + f.t * 20;
        ctx.beginPath(); ctx.arc(Math.cos(an) * rr, Math.sin(an) * rr, 2, 0, Math.PI * 2); ctx.fill();
      }
    } else if (f.kind === "poof") {
      ctx.fillStyle = f.color || "rgba(200,180,220,.8)";
      for (let i = 0; i < 6; i++) {
        const an = i * Math.PI / 3;
        const rr = f.t * 28;
        ctx.beginPath(); ctx.arc(Math.cos(an) * rr, Math.sin(an) * rr - f.t * 10, 7 * a, 0, Math.PI * 2); ctx.fill();
      }
    } else if (f.kind === "meteor") {
      ctx.fillStyle = "#e85d4c";
      ctx.beginPath(); ctx.arc(0, 0, 16 + f.t * 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffe27a";
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
    } else if (f.kind === "heal") {
      ctx.strokeStyle = "#7bc96a";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, 12 + f.t * 30, 0, Math.PI * 2); ctx.stroke();
    } else if (f.kind === "ice") {
      ctx.strokeStyle = "#b8e8ff";
      ctx.lineWidth = 2;
      ctx.strokeRect(-6, -6, 12, 12);
    }
    ctx.restore();
  }

  global.LW_DRAW = {
    lookFor, drawUnit, drawBaseWithHp, drawBackground, drawProjectile, drawFx,
    drawIsraelFlag, drawLegionEmblem, plate, gloss
  };
})(window);
