/* Отрисовка: полуреалистичные пропорции, лак и кожа, Израиль vs Тёмный легион */
(function (global) {
  const SKIN_TINT = {
    israel: null,
    gold:    { armor: "#e8c44a", armorDk: "#b89220", accent: "#fff4c8", metal: "#ffe27a", trim: "#fff0b0" },
    teal:    { armor: "#2aa8a0", armorDk: "#1a7a74", accent: "#e8fffb", metal: "#8ee8e0", trim: "#c8fff8" },
    scarlet: { armor: "#e03a4a", armorDk: "#a81e2c", accent: "#ffe4e8", metal: "#f0c0c4", trim: "#ffd0d4" },
    opal:    { armor: "#d8c8f0", armorDk: "#9a88c4", accent: "#fff8ff", metal: "#c8f0ff", trim: "#ffe8ff" }
  };

  // Игрок: бело-голубой лак + натуральная кожа, разные тела/лица/волосы
  const PLAYER_LOOKS = [
    [ // stone
      { hair: "#2a1810", hairStyle: "wavy", skin: "#c47a50", armor: "#3d7ad6", armorDk: "#2458a8", accent: "#ffffff", metal: "#d8e8ff", trim: "#ffffff", eyes: "#3a2818", blush: "#c87870", brow: "strong", leather: "#8a5a32", leatherDk: "#5a381c", build: "sturdy", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#b06058" },
      { hair: "#6b3a18", hairStyle: "pony", skin: "#e8b888", armor: "#5aa0ea", armorDk: "#2e6fbc", accent: "#ffffff", metal: "#e8f0ff", trim: "#c8dcff", eyes: "#2a3048", blush: "#e8a090", brow: "arch", leather: "#a07040", leatherDk: "#6a4824", build: "lean", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#c07070" },
      { hair: "#4a2810", hairStyle: "short", skin: "#d4a070", armor: "#1e4fa0", armorDk: "#163878", accent: "#ffffff", metal: "#f0f6ff", trim: "#ffd24a", eyes: "#402818", blush: "#d88880", brow: "strong", leather: "#7a4e2a", leatherDk: "#4a2e18", build: "compact", torsoMat: "mix", legMat: "leather", armMat: "lacquer", lip: "#a05850" }
    ],
    [ // farm
      { hair: "#c4a060", hairStyle: "braid", skin: "#f2c9a2", armor: "#4a90e0", armorDk: "#2c68b4", accent: "#fff8e0", metal: "#e0ecff", trim: "#ffffff", eyes: "#3a2818", blush: "#e8a090", brow: "soft", leather: "#8a5e38", leatherDk: "#5a3c22", build: "athletic", torsoMat: "leather", legMat: "leather", armMat: "lacquer", lip: "#c87870" },
      { hair: "#b88840", hairStyle: "bob", skin: "#f5d0b0", armor: "#7ec0f8", armorDk: "#3d88c8", accent: "#ffffff", metal: "#fff4c8", trim: "#ffe27a", eyes: "#486028", blush: "#f0b0a0", brow: "round", leather: "#b08a50", leatherDk: "#7a5a30", build: "lean", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#d08078" },
      { hair: "#2c1810", hairStyle: "bun", skin: "#8d5a38", armor: "#2458a0", armorDk: "#163870", accent: "#e8f4ff", metal: "#d0e0f8", trim: "#ffffff", eyes: "#201810", blush: "#a06058", brow: "strong", leather: "#6a4224", leatherDk: "#3e2614", build: "sturdy", torsoMat: "mix", legMat: "leather", armMat: "leather", lip: "#8a4844" }
    ],
    [ // sparta
      { hair: "#6a3a18", hairStyle: "coils", skin: "#e8b890", armor: "#1a4aad", armorDk: "#0e2e78", accent: "#ffffff", metal: "#e0c25a", trim: "#ffffff", eyes: "#3a2018", blush: "#e88890", brow: "arch", helmet: "sparta", leather: "#7a4a28", leatherDk: "#4a2c18", build: "athletic", torsoMat: "lacquer", legMat: "lacquer", armMat: "lacquer", lip: "#b06060" },
      { hair: "#6a2810", hairStyle: "pony", skin: "#e0b080", armor: "#3d7ad6", armorDk: "#1e4fa0", accent: "#ffffff", metal: "#f0f4ff", trim: "#c8dcff", eyes: "#283050", blush: "#e89890", brow: "soft", leather: "#8a5a32", leatherDk: "#5a381c", build: "lean", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#c07068" },
      { hair: "#1a1008", hairStyle: "braid", skin: "#c49060", armor: "#0d2d6e", armorDk: "#081c48", accent: "#e8f0ff", metal: "#e0c25a", trim: "#ffffff", eyes: "#201810", blush: "#d08078", brow: "strong", helmet: "sparta", leather: "#6a4020", leatherDk: "#3e2610", build: "tall", torsoMat: "lacquer", legMat: "leather", armMat: "lacquer", lip: "#a05850" }
    ],
    [ // renaissance
      { hair: "#6b3a28", hairStyle: "long", skin: "#f3cbb0", armor: "#3a6fd0", armorDk: "#1e4aa0", accent: "#ffffff", metal: "#e8c86a", trim: "#ffffff", eyes: "#402820", blush: "#ef9aa8", brow: "arch", hat: "feather", leather: "#6a4a30", leatherDk: "#3e2c1c", build: "athletic", torsoMat: "mix", legMat: "leather", armMat: "leather", lip: "#c07070" },
      { hair: "#8a4a28", hairStyle: "bun", skin: "#f6d4b8", armor: "#5b8fe8", armorDk: "#2a5cb4", accent: "#fff0f4", metal: "#5a4030", trim: "#ffffff", eyes: "#304060", blush: "#f0a8a8", brow: "round", hat: "musketeer", leather: "#5a3c28", leatherDk: "#3a2618", build: "compact", torsoMat: "lacquer", legMat: "leather", armMat: "leather", lip: "#d08080" },
      { hair: "#3a2018", hairStyle: "wavy", skin: "#e0b090", armor: "#163878", armorDk: "#0c2458", accent: "#e8f0ff", metal: "#c0c8d8", trim: "#ffd24a", eyes: "#2a2018", blush: "#d88880", brow: "strong", leather: "#4a3424", leatherDk: "#2a1c14", build: "sturdy", torsoMat: "leather", legMat: "leather", armMat: "lacquer", lip: "#a05850" }
    ],
    [ // modern
      { hair: "#2a1a10", hairStyle: "coils", skin: "#7a4a30", armor: "#e8f2ff", armorDk: "#8ab0d8", accent: "#2a6ad4", metal: "#c8dcf0", trim: "#3d7ad6", eyes: "#2a3040", blush: "#a06058", brow: "strong", visor: "#3d8ae6", leather: "#2a3038", leatherDk: "#16181c", build: "athletic", torsoMat: "leather", legMat: "leather", armMat: "lacquer", lip: "#8a4844" },
      { hair: "#5c3a18", hairStyle: "pony", skin: "#f2c8a4", armor: "#d0e4f8", armorDk: "#6a98c8", accent: "#ffffff", metal: "#4ec4d4", trim: "#1e4fa0", eyes: "#283848", blush: "#e8a0a0", brow: "soft", visor: "#4ec4d4", leather: "#3a4048", leatherDk: "#1c2024", build: "lean", torsoMat: "mix", legMat: "leather", armMat: "leather", lip: "#c07070" },
      { hair: "#1a1010", hairStyle: "undercut", skin: "#c49068", armor: "#f4f8ff", armorDk: "#90a8c4", accent: "#1a4aad", metal: "#d0dce8", trim: "#0e2e78", eyes: "#201810", blush: "#c87870", brow: "arch", leather: "#2c3034", leatherDk: "#141618", build: "sturdy", torsoMat: "lacquer", legMat: "leather", armMat: "lacquer", lip: "#a05850" }
    ],
    [ // space
      { hair: "#e8eef8", hairStyle: "undercut", skin: "#f0c8b0", armor: "#3d7ad6", armorDk: "#1e4fa0", accent: "#ffffff", metal: "#c8f0ff", trim: "#ffffff", eyes: "#204060", blush: "#e8a0c0", brow: "arch", glow: "#b8e0ff", helmet: "space", leather: "#1a2430", leatherDk: "#0c1218", build: "tall", torsoMat: "lacquer", legMat: "lacquer", armMat: "lacquer", lip: "#c08080" },
      { hair: "#4a70c0", hairStyle: "pony", skin: "#e8b898", armor: "#7eb4f0", armorDk: "#3d7ad6", accent: "#ffffff", metal: "#e0f4ff", trim: "#fff", eyes: "#283858", blush: "#e8a0b0", brow: "soft", glow: "#d0f0ff", helmet: "space", leather: "#243040", leatherDk: "#121820", build: "athletic", torsoMat: "mix", legMat: "leather", armMat: "lacquer", lip: "#c07070" },
      { hair: "#d0d8f0", hairStyle: "bun", skin: "#d4a888", armor: "#0e2e78", armorDk: "#081c50", accent: "#c8f0ff", metal: "#a8e0ff", trim: "#ffffff", eyes: "#102038", blush: "#d08090", brow: "strong", glow: "#80e0ff", helmet: "space", leather: "#101820", leatherDk: "#080c10", build: "compact", torsoMat: "lacquer", legMat: "lacquer", armMat: "lacquer", lip: "#a05858" }
    ]
  ];

  const ENEMY_LOOKS = [
    [ // stone
      { hair: "#1a0a18", hairStyle: "undercut", skin: "#6a3a28", armor: "#4a2068", armorDk: "#2a1040", accent: "#c9a0e8", metal: "#2a1020", trim: "#8e4ec0", eyes: "#2a1020", blush: "#8a5058", brow: "strong", leather: "#2a1818", leatherDk: "#140c0c", build: "sturdy", torsoMat: "mix", legMat: "leather", armMat: "lacquer", lip: "#7a3840" },
      { hair: "#3a1848", hairStyle: "wavy", skin: "#e0b090", armor: "#6a38a0", armorDk: "#3c1868", accent: "#e8d0ff", metal: "#1a0818", trim: "#c080ff", eyes: "#301040", blush: "#b07080", brow: "arch", leather: "#2c1a24", leatherDk: "#160e14", build: "lean", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#a05058" },
      { hair: "#100810", hairStyle: "bun", skin: "#a87858", armor: "#2a1038", armorDk: "#14081c", accent: "#b080d8", metal: "#3a2048", trim: "#e0c25a", eyes: "#180c10", blush: "#8a5058", brow: "strong", leather: "#201418", leatherDk: "#10080c", build: "compact", torsoMat: "lacquer", legMat: "leather", armMat: "leather", lip: "#7a4040" }
    ],
    [ // farm
      { hair: "#2a1020", hairStyle: "braid", skin: "#d4a07a", armor: "#5a2878", armorDk: "#34104c", accent: "#d8b8f0", metal: "#2a1828", trim: "#a060d0", eyes: "#201018", blush: "#a86870", brow: "soft", leather: "#2a1c18", leatherDk: "#16100c", build: "athletic", torsoMat: "leather", legMat: "leather", armMat: "lacquer", lip: "#9a5858" },
      { hair: "#4a1860", hairStyle: "bob", skin: "#f0c4a0", armor: "#7a48b0", armorDk: "#4a2478", accent: "#f0e0ff", metal: "#201018", trim: "#e8b8ff", eyes: "#401860", blush: "#c08090", brow: "round", leather: "#3a2430", leatherDk: "#1c1418", build: "lean", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#c07080" },
      { hair: "#140810", hairStyle: "pony", skin: "#6a4030", armor: "#301040", armorDk: "#180820", accent: "#b898d8", metal: "#281828", trim: "#c9a0e8", eyes: "#100808", blush: "#805058", brow: "strong", leather: "#1c1014", leatherDk: "#0c0808", build: "sturdy", torsoMat: "mix", legMat: "leather", armMat: "leather", lip: "#6a3838" }
    ],
    [ // sparta
      { hair: "#2a1028", hairStyle: "braid", skin: "#c89878", armor: "#3c1460", armorDk: "#200838", accent: "#c9a0e8", metal: "#2a1020", trim: "#e0c25a", eyes: "#200818", blush: "#a06070", brow: "strong", helmet: "horn", leather: "#24141c", leatherDk: "#12080c", build: "tall", torsoMat: "lacquer", legMat: "leather", armMat: "lacquer", lip: "#8a4850" },
      { hair: "#301040", hairStyle: "pony", skin: "#e8b898", armor: "#6828a0", armorDk: "#3c1468", accent: "#f0d8ff", metal: "#1a0818", trim: "#d0a0ff", eyes: "#301040", blush: "#b07080", brow: "arch", leather: "#2a1820", leatherDk: "#140c10", build: "lean", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#a05860" },
      { hair: "#0c040c", hairStyle: "coils", skin: "#8a5840", armor: "#240830", armorDk: "#100410", accent: "#a070c8", metal: "#3a1830", trim: "#e0c25a", eyes: "#140810", blush: "#8a5058", brow: "strong", helmet: "horn", leather: "#1a1014", leatherDk: "#0c0808", build: "sturdy", torsoMat: "lacquer", legMat: "leather", armMat: "lacquer", lip: "#7a4048" }
    ],
    [ // renaissance
      { hair: "#6a1830", hairStyle: "long", skin: "#e0b090", armor: "#501870", armorDk: "#300848", accent: "#e8d0f8", metal: "#c0a040", trim: "#c9a0e8", eyes: "#201018", blush: "#b07080", brow: "arch", hat: "feather-dark", leather: "#1c1018", leatherDk: "#0c080c", build: "athletic", torsoMat: "leather", legMat: "leather", armMat: "leather", lip: "#a05058" },
      { hair: "#401828", hairStyle: "bob", skin: "#f0c8a8", armor: "#7830a8", armorDk: "#4a1878", accent: "#fff0ff", metal: "#2a1020", trim: "#e8b0ff", eyes: "#381828", blush: "#c88898", brow: "round", hat: "musketeer-dark", leather: "#24141c", leatherDk: "#12080c", build: "compact", torsoMat: "lacquer", legMat: "leather", armMat: "leather", lip: "#c07080" },
      { hair: "#140810", hairStyle: "bun", skin: "#a87858", armor: "#280830", armorDk: "#100410", accent: "#c0a0d8", metal: "#3a2030", trim: "#e0c25a", eyes: "#140810", blush: "#8a5058", brow: "strong", leather: "#1a1014", leatherDk: "#0c0608", build: "sturdy", torsoMat: "mix", legMat: "leather", armMat: "lacquer", lip: "#7a4040" }
    ],
    [ // modern
      { hair: "#1a1014", hairStyle: "mohawk", skin: "#5a3228", armor: "#3a2048", armorDk: "#1c1018", accent: "#a070d0", metal: "#2a1830", trim: "#8e4ec0", eyes: "#201018", blush: "#8a5058", brow: "strong", visor: "#c060e0", leather: "#1a1418", leatherDk: "#0c0a0c", build: "athletic", torsoMat: "leather", legMat: "leather", armMat: "lacquer", lip: "#6a3838" },
      { hair: "#4a2060", hairStyle: "pony", skin: "#e8b8a0", armor: "#5a3080", armorDk: "#2c1438", accent: "#e0c0f8", metal: "#201020", trim: "#d080ff", eyes: "#301838", blush: "#b07080", brow: "soft", visor: "#e080ff", leather: "#22181c", leatherDk: "#120c10", build: "lean", torsoMat: "mix", legMat: "leather", armMat: "leather", lip: "#a05860" },
      { hair: "#0c080c", hairStyle: "undercut", skin: "#8a6050", armor: "#1a0c18", armorDk: "#0c060c", accent: "#8050b0", metal: "#2a1a28", trim: "#a060d0", eyes: "#100808", blush: "#805058", brow: "arch", visor: "#9040c0", leather: "#161012", leatherDk: "#0a0808", build: "sturdy", torsoMat: "lacquer", legMat: "leather", armMat: "lacquer", lip: "#7a4048" }
    ],
    [ // space
      { hair: "#c8a0e8", hairStyle: "undercut", skin: "#d4a090", armor: "#3a1860", armorDk: "#1a0830", accent: "#e0b0ff", metal: "#80e0ff", trim: "#c080ff", eyes: "#201040", blush: "#c080a0", brow: "arch", glow: "#e0a0ff", helmet: "space-dark", leather: "#140c18", leatherDk: "#08040c", build: "tall", torsoMat: "lacquer", legMat: "lacquer", armMat: "lacquer", lip: "#a06070" },
      { hair: "#e8e8f0", hairStyle: "bob", skin: "#c89070", armor: "#6828a8", armorDk: "#3c1470", accent: "#f8e0ff", metal: "#b0f0ff", trim: "#ffd0ff", eyes: "#301050", blush: "#d090b0", brow: "soft", glow: "#f0c0ff", helmet: "space-dark", leather: "#1a1018", leatherDk: "#0c0810", build: "athletic", torsoMat: "mix", legMat: "leather", armMat: "lacquer", lip: "#b07080" },
      { hair: "#e8d0ff", hairStyle: "bun", skin: "#8a5850", armor: "#180820", armorDk: "#0c0410", accent: "#a060d0", metal: "#60d0e8", trim: "#c080ff", eyes: "#100820", blush: "#a06070", brow: "strong", glow: "#c060ff", helmet: "space-dark", leather: "#100810", leatherDk: "#080408", build: "compact", torsoMat: "lacquer", legMat: "lacquer", armMat: "lacquer", lip: "#8a4850" }
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
    if (w < 0) { x += w; w = -w; }
    if (h < 0) { y += h; h = -h; }
    const rad = Math.max(0, Math.min(Math.max(0, r || 0), w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  function hexToRgb(hex) {
    let h = String(hex || "#888").replace("#", "");
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    const n = parseInt(h, 16);
    if (isNaN(n)) return { r: 120, g: 120, b: 120 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function shade(hex, amt) {
    const c = hexToRgb(hex);
    const k = (v) => Math.max(0, Math.min(255, Math.round(v + 255 * amt)));
    return "rgb(" + k(c.r) + "," + k(c.g) + "," + k(c.b) + ")";
  }

  function gloss(ctx, x, y, w, h) {
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(x + w * 0.85, y + h * 0.7, w * 0.32, h * 0.28, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function lacquer(ctx, x, y, w, h, r, color, dk) {
    rr(ctx, x, y, w, h, r);
    const g = ctx.createLinearGradient(x, y, x + w * 0.15, y + h);
    g.addColorStop(0, shade(color, 0.22));
    g.addColorStop(0.45, color);
    g.addColorStop(1, dk || shade(color, -0.28));
    ctx.fillStyle = g;
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.fillStyle = dk || shade(color, -0.3);
    ctx.globalAlpha = 0.28;
    ctx.fillRect(x, y + h * 0.58, w, h * 0.5);
    ctx.restore();
    ctx.strokeStyle = shade(dk || color, -0.2);
    ctx.lineWidth = 1.15;
    rr(ctx, x, y, w, h, r);
    ctx.stroke();
    gloss(ctx, x + w * 0.34, y + h * 0.24, w * 0.3, h * 0.16);
  }

  function leather(ctx, x, y, w, h, r, color, dk) {
    rr(ctx, x, y, w, h, r);
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, shade(color, 0.08));
    g.addColorStop(0.55, color);
    g.addColorStop(1, dk || shade(color, -0.2));
    ctx.fillStyle = g;
    ctx.fill();
    ctx.save();
    ctx.clip();
    // dull wrap, no hard shine
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.08;
    ctx.beginPath();
    ctx.ellipse(x + w * 0.35, y + h * 0.28, w * 0.35, h * 0.18, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    if (w > 6 && h > 6) {
      ctx.strokeStyle = shade(dk || color, -0.15);
      ctx.lineWidth = 0.8;
      ctx.setLineDash([1.6, 1.8]);
      const inset = Math.min(1.4, w * 0.18, h * 0.18);
      rr(ctx, x + inset, y + inset, w - inset * 2, h - inset * 2, Math.max(0, r - inset));
      ctx.stroke();
      ctx.setLineDash([]);
    }
    // a seam
    if (h > 10 && w > 8) {
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y + 2);
      ctx.lineTo(x + w * 0.5, y + h - 2);
      ctx.strokeStyle = shade(dk || color, -0.12);
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = dk || shade(color, -0.25);
    ctx.lineWidth = 1.1;
    rr(ctx, x, y, w, h, r);
    ctx.stroke();
  }

  function panel(ctx, mat, x, y, w, h, r, p) {
    if (mat === "leather") leather(ctx, x, y, w, h, r, p.leather || "#6a4a30", p.leatherDk || "#3e2c1c");
    else lacquer(ctx, x, y, w, h, r, p.armor, p.armorDk);
  }

  function plate(ctx, x, y, w, h, r, color, dk) {
    lacquer(ctx, x, y, w, h, r, color, dk);
  }

  function buildDims(p, s, wide) {
    const b = p.build || "athletic";
    let sh = 23, wa = 19, hip = 21, leg = 6.2, hMul = 1;
    if (b === "sturdy") { sh = 27; wa = 23; hip = 25; leg = 7.4; hMul = 0.96; }
    else if (b === "lean") { sh = 21; wa = 16.5; hip = 19; leg = 5.4; hMul = 1.05; }
    else if (b === "tall") { sh = 23; wa = 17.5; hip = 20; leg = 5.8; hMul = 1.1; }
    else if (b === "compact") { sh = 24.5; wa = 21; hip = 23; leg = 6.8; hMul = 0.93; }
    if (wide) { sh *= 1.1; wa *= 1.08; hip *= 1.08; }
    return {
      sh: sh * s, wa: wa * s, hip: hip * s, leg: leg * s, hMul: hMul,
      headR: 8.5 * s, headY: -40.5 * s * hMul
    };
  }

  function drawNeck(ctx, p, s, d) {
    const top = d.headY + d.headR * 0.72;
    const bot = -28 * s * d.hMul;
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.moveTo(-3.2 * s, top);
    ctx.lineTo(3.2 * s, top);
    ctx.lineTo(4.2 * s, bot);
    ctx.lineTo(-4.2 * s, bot);
    ctx.closePath();
    ctx.fill();
  }

  function drawHairBack(ctx, p, s, d) {
    const hy = d.headY, hr = d.headR;
    const hs = p.hairStyle || "pony";
    ctx.fillStyle = p.hair;
    // skull volume
    ctx.beginPath();
    ctx.ellipse(0, hy - hr * 0.15, hr * 1.18, hr * 1.22, 0, 0, Math.PI * 2);
    ctx.fill();
    if (hs === "pony") {
      ctx.beginPath(); ctx.ellipse(hr * 1.15, hy + hr * 0.55, hr * 0.48, hr * 1.7, 0.35, 0, Math.PI * 2); ctx.fill();
    } else if (hs === "bun") {
      ctx.beginPath(); ctx.ellipse(0, hy - hr * 1.45, hr * 0.62, hr * 0.55, 0, 0, Math.PI * 2); ctx.fill();
    } else if (hs === "long" || hs === "loose" || hs === "wavy") {
      ctx.beginPath();
      ctx.ellipse(-hr * 1.15, hy + hr * 0.9, hr * 0.55, hr * 2.1, -0.05, 0, Math.PI * 2);
      ctx.ellipse(hr * 1.15, hy + hr * 0.9, hr * 0.55, hr * 2.1, 0.05, 0, Math.PI * 2);
      ctx.fill();
      if (hs === "wavy") {
        ctx.beginPath();
        ctx.ellipse(-hr * 1.35, hy + hr * 1.6, hr * 0.4, hr * 0.7, -0.4, 0, Math.PI * 2);
        ctx.ellipse(hr * 1.35, hy + hr * 1.8, hr * 0.38, hr * 0.65, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (hs === "braid") {
      ctx.beginPath(); ctx.ellipse(hr * 1.1, hy + hr * 0.7, hr * 0.38, hr * 1.85, 0.25, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = shade(p.hair, -0.12);
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.arc(hr * 1.2, hy + hr * 0.15 + i * hr * 0.7, hr * 0.28, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = p.accent || "#fff";
      ctx.beginPath(); ctx.arc(hr * 1.25, hy + hr * 2.6, 1.6 * s, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = p.hair;
    } else if (hs === "twin") {
      ctx.beginPath();
      ctx.ellipse(-hr * 1.2, hy + hr * 0.3, hr * 0.42, hr * 1.15, -0.35, 0, Math.PI * 2);
      ctx.ellipse(hr * 1.2, hy + hr * 0.3, hr * 0.42, hr * 1.15, 0.35, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "bob") {
      ctx.beginPath();
      ctx.ellipse(-hr * 1.05, hy + hr * 0.35, hr * 0.55, hr * 1.05, 0, 0, Math.PI * 2);
      ctx.ellipse(hr * 1.05, hy + hr * 0.35, hr * 0.55, hr * 1.05, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "coils") {
      for (let i = 0; i < 8; i++) {
        const a = -0.4 + i * 0.35;
        ctx.beginPath();
        ctx.arc(Math.sin(a) * hr * 1.05, hy - hr * 0.2 - Math.cos(a) * hr * 0.7, hr * 0.32, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.ellipse(-hr * 1.05, hy + hr * 0.5, hr * 0.45, hr * 0.8, 0, 0, Math.PI * 2);
      ctx.ellipse(hr * 1.05, hy + hr * 0.5, hr * 0.45, hr * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "undercut") {
      ctx.beginPath();
      ctx.ellipse(0, hy - hr * 0.35, hr * 1.05, hr * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(hr * 0.7, hy - hr * 0.1, hr * 0.45, hr * 0.9, 0.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "mohawk") {
      ctx.fillStyle = shade(p.hair, 0.08);
      ctx.beginPath();
      ctx.moveTo(-hr * 0.28, hy - hr * 0.2);
      ctx.lineTo(0, hy - hr * 2.15);
      ctx.lineTo(hr * 0.28, hy - hr * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = p.hair;
      ctx.beginPath();
      ctx.ellipse(0, hy - hr * 0.2, hr * 0.95, hr * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (hs === "short") {
      ctx.beginPath();
      ctx.ellipse(0, hy - hr * 0.2, hr * 1.12, hr * 1.05, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawHairFront(ctx, p, s, d) {
    const hy = d.headY, hr = d.headR;
    const hs = p.hairStyle || "pony";
    ctx.fillStyle = p.hair;
    if (hs === "mohawk") return;
    if (hs === "undercut") {
      ctx.beginPath();
      ctx.ellipse(-hr * 0.15, hy - hr * 0.75, hr * 0.85, hr * 0.42, -0.2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (hs === "coils") {
      ctx.beginPath();
      ctx.arc(-hr * 0.55, hy - hr * 0.7, hr * 0.32, 0, Math.PI * 2);
      ctx.arc(hr * 0.15, hy - hr * 0.85, hr * 0.3, 0, Math.PI * 2);
      ctx.arc(hr * 0.7, hy - hr * 0.65, hr * 0.28, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    // bangs
    ctx.beginPath();
    ctx.ellipse(-hr * 0.55, hy - hr * 0.72, hr * 0.7, hr * 0.42, -0.45, 0, Math.PI * 2);
    ctx.ellipse(hr * 0.45, hy - hr * 0.78, hr * 0.68, hr * 0.4, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawHead(ctx, p, opt, d) {
    const s = opt.scale || 1;
    const blink = opt.blink ? 0.18 : 1;
    const hy = d.headY, hr = d.headR;
    drawHairBack(ctx, p, s, d);
    drawNeck(ctx, p, s, d);
    // ear
    ctx.fillStyle = shade(p.skin, -0.08);
    ctx.beginPath();
    ctx.ellipse(-hr * 0.98, hy + hr * 0.1, hr * 0.22, hr * 0.32, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // head — slightly longer oval, adult jaw
    ctx.fillStyle = p.skin;
    ctx.beginPath();
    ctx.ellipse(0, hy + hr * 0.06, hr * 0.98, hr * 1.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(80,40,30,.22)";
    ctx.lineWidth = 0.9;
    ctx.stroke();
    // soft jaw shadow
    ctx.fillStyle = "rgba(80,40,30,.08)";
    ctx.beginPath();
    ctx.ellipse(0, hy + hr * 0.62, hr * 0.7, hr * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    // nose
    ctx.strokeStyle = "rgba(80,40,30,.35)";
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.moveTo(0.4 * s, hy + hr * 0.05);
    ctx.lineTo(1.1 * s, hy + hr * 0.38);
    ctx.quadraticCurveTo(0.2 * s, hy + hr * 0.46, -1.2 * s, hy + hr * 0.34);
    ctx.stroke();
    // blush, modest
    ctx.fillStyle = p.blush || "#e89a8a";
    ctx.globalAlpha = 0.28;
    ctx.beginPath();
    ctx.ellipse(-hr * 0.55, hy + hr * 0.32, hr * 0.28, hr * 0.16, 0, 0, Math.PI * 2);
    ctx.ellipse(hr * 0.55, hy + hr * 0.32, hr * 0.28, hr * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    if (p.brow === "round") {
      ctx.fillStyle = "rgba(140,80,50,.4)";
      ctx.beginPath();
      ctx.arc(-hr * 0.4, hy + hr * 0.42, 0.55 * s, 0, Math.PI * 2);
      ctx.arc(-hr * 0.22, hy + hr * 0.5, 0.45 * s, 0, Math.PI * 2);
      ctx.arc(hr * 0.35, hy + hr * 0.44, 0.55 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    const ey = hy - hr * 0.08;
    const ex = hr * 0.38;
    const ew = hr * 0.22, eh = hr * 0.26 * blink;
    const eyeC = p.eyes || "#3a2018";
    ctx.fillStyle = "#f8f6f2";
    ctx.beginPath();
    ctx.ellipse(-ex, ey, ew, eh, 0, 0, Math.PI * 2);
    ctx.ellipse(ex, ey, ew, eh, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = eyeC;
    ctx.beginPath();
    ctx.ellipse(-ex + 0.3 * s, ey, ew * 0.58, eh * 0.7, 0, 0, Math.PI * 2);
    ctx.ellipse(ex + 0.3 * s, ey, ew * 0.58, eh * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.ellipse(-ex + 0.3 * s, ey, ew * 0.28, eh * 0.38, 0, 0, Math.PI * 2);
    ctx.ellipse(ex + 0.3 * s, ey, ew * 0.28, eh * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-ex - 0.3 * s, ey - 0.7 * s, 0.7 * s, 0.7 * s * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(ex - 0.3 * s, ey - 0.7 * s, 0.7 * s, 0.7 * s * blink, 0, 0, Math.PI * 2);
    ctx.fill();
    // lids
    ctx.strokeStyle = "rgba(60,30,25,.45)";
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.ellipse(-ex, ey, ew, eh, 0, Math.PI, 0);
    ctx.ellipse(ex, ey, ew, eh, 0, Math.PI, 0);
    ctx.stroke();
    // brows
    ctx.strokeStyle = shade(p.hair, -0.15);
    ctx.lineWidth = (p.brow === "strong" ? 1.6 : 1.2) * s;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (p.brow === "strong") {
      ctx.moveTo(-ex - ew, ey - eh - 1.6 * s); ctx.lineTo(-ex + ew * 0.7, ey - eh - 1.1 * s);
      ctx.moveTo(ex + ew, ey - eh - 1.6 * s); ctx.lineTo(ex - ew * 0.7, ey - eh - 1.1 * s);
    } else if (p.brow === "arch") {
      ctx.moveTo(-ex - ew, ey - eh - 1.1 * s);
      ctx.quadraticCurveTo(-ex, ey - eh - 3.1 * s, -ex + ew * 0.8, ey - eh - 1.1 * s);
      ctx.moveTo(ex + ew, ey - eh - 1.1 * s);
      ctx.quadraticCurveTo(ex, ey - eh - 3.1 * s, ex - ew * 0.8, ey - eh - 1.1 * s);
    } else {
      ctx.moveTo(-ex - ew, ey - eh - 1.2 * s); ctx.lineTo(-ex + ew * 0.6, ey - eh - 1.8 * s);
      ctx.moveTo(ex + ew, ey - eh - 1.2 * s); ctx.lineTo(ex - ew * 0.6, ey - eh - 1.8 * s);
    }
    ctx.stroke();
    ctx.lineCap = "butt";
    // mouth — modest, not pouty
    ctx.strokeStyle = p.lip || "#b06058";
    ctx.lineWidth = 1.15 * s;
    ctx.beginPath();
    if (p.brow === "soft") {
      ctx.arc(0, hy + hr * 0.62, hr * 0.28, 0.15, Math.PI - 0.15);
    } else if (p.brow === "strong") {
      ctx.moveTo(-hr * 0.22, hy + hr * 0.66);
      ctx.lineTo(hr * 0.22, hy + hr * 0.66);
    } else {
      ctx.moveTo(-hr * 0.2, hy + hr * 0.64);
      ctx.quadraticCurveTo(0, hy + hr * 0.74, hr * 0.2, hy + hr * 0.64);
    }
    ctx.stroke();
    drawHairFront(ctx, p, s, d);
  }

  function drawHelmet(ctx, p, s, d) {
    const h = p.helmet || p.hat;
    const hy = d.headY, hr = d.headR;
    if (!h) {
      if (p.visor) {
        lacquer(ctx, -hr * 1.15, hy - hr * 0.45, hr * 2.3, hr * 0.7, 2 * s, p.visor, shade(p.visor, -0.3));
        gloss(ctx, -hr * 0.3, hy - hr * 0.3, hr * 0.5, hr * 0.18);
        return;
      }
      return;
    }
    if (h === "sparta" || h === "horn") {
      lacquer(ctx, -hr * 1.25, hy - hr * 1.15, hr * 2.5, hr * 1.35, hr * 0.6, p.metal, p.trim);
      ctx.fillStyle = h === "horn" ? p.armor : p.accent;
      ctx.beginPath();
      ctx.moveTo(0, hy - hr * 2.7);
      ctx.quadraticCurveTo(hr * 0.7, hy - hr * 1.8, hr * 0.22, hy - hr * 1.05);
      ctx.lineTo(-hr * 0.22, hy - hr * 1.05);
      ctx.quadraticCurveTo(-hr * 0.7, hy - hr * 1.8, 0, hy - hr * 2.7);
      ctx.fill();
      if (h === "horn") {
        ctx.fillStyle = p.metal;
        ctx.beginPath();
        ctx.moveTo(-hr * 1.1, hy - hr * 0.6); ctx.lineTo(-hr * 2.0, hy - hr * 1.8); ctx.lineTo(-hr * 0.7, hy - hr * 0.8);
        ctx.moveTo(hr * 1.1, hy - hr * 0.6); ctx.lineTo(hr * 2.0, hy - hr * 1.8); ctx.lineTo(hr * 0.7, hy - hr * 0.8);
        ctx.fill();
      }
    } else if (h === "musketeer" || h === "musketeer-dark" || h === "feather" || h === "feather-dark") {
      ctx.fillStyle = p.armorDk;
      ctx.beginPath();
      ctx.ellipse(0, hy - hr * 0.85, hr * 1.85, hr * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      lacquer(ctx, -hr * 0.95, hy - hr * 1.55, hr * 1.9, hr * 0.95, hr * 0.5, p.armor, p.armorDk);
      ctx.fillStyle = h.indexOf("dark") >= 0 ? "#e8b0ff" : "#fff";
      ctx.beginPath();
      ctx.ellipse(hr * 0.95, hy - hr * 1.55, hr * 0.45, hr * 0.28, 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (h === "space" || h === "space-dark") {
      lacquer(ctx, -hr * 1.2, hy - hr * 1.25, hr * 2.4, hr * 2.15, hr * 0.85, p.armor, p.armorDk);
      ctx.fillStyle = p.glow || "#c8f0ff";
      ctx.globalAlpha = 0.72;
      rr(ctx, -hr * 0.7, hy - hr * 0.15, hr * 1.4, hr * 0.45, 2 * s);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawLegs(ctx, p, s, d) {
    const mat = p.legMat || "leather";
    const hipY = 4 * s;
    const knee = 18 * s;
    const foot = 33 * s;
    const lw = d.leg;
    // thighs
    panel(ctx, mat, -d.hip * 0.42 - lw * 0.15, hipY, lw * 1.15, knee - hipY + 2 * s, 3 * s, p);
    panel(ctx, mat, d.hip * 0.42 - lw, hipY + 1 * s, lw * 1.15, knee - hipY + 2 * s, 3 * s, p);
    // shins / boots — often leather even if thighs lacquer
    const bootMat = (p.legMat === "lacquer" && (p.helmet === "space" || p.helmet === "space-dark")) ? "lacquer" : "leather";
    panel(ctx, bootMat, -d.hip * 0.4 - lw * 0.05, knee, lw * 1.1, foot - knee, 2.5 * s, p);
    panel(ctx, bootMat, d.hip * 0.4 - lw * 0.95, knee + 0.8 * s, lw * 1.1, foot - knee, 2.5 * s, p);
    // soles
    ctx.fillStyle = p.leatherDk || p.armorDk;
    rr(ctx, -d.hip * 0.42 - lw * 0.15, foot - 1 * s, lw * 1.25, 3.2 * s, 1.2 * s); ctx.fill();
    rr(ctx, d.hip * 0.4 - lw, foot - 0.2 * s, lw * 1.25, 3.2 * s, 1.2 * s); ctx.fill();
  }

  function drawTorso(ctx, p, s, d) {
    const top = -27 * s * d.hMul;
    const mid = -8 * s * d.hMul;
    const bot = 5 * s;
    const tmat = p.torsoMat === "mix" ? "lacquer" : (p.torsoMat || "lacquer");
    // leather undershirt / hip wrap always peeking (practical coverage, no bust shapes)
    leather(ctx, -d.hip * 0.52, mid + 4 * s, d.hip * 1.04, bot - mid + 4 * s, 5 * s, p.leather || "#6a4a30", p.leatherDk || "#3e2c1c");
    // main cuirass / vest: shoulder-to-waist trapezoid, modest taper, flat front
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-d.sh * 0.5, top + 2 * s);
    ctx.lineTo(d.sh * 0.5, top + 2 * s);
    ctx.lineTo(d.wa * 0.5, mid + 6 * s);
    ctx.lineTo(d.hip * 0.46, bot);
    ctx.lineTo(-d.hip * 0.46, bot);
    ctx.lineTo(-d.wa * 0.5, mid + 6 * s);
    ctx.closePath();
    if (tmat === "leather" || p.torsoMat === "leather") {
      const g = ctx.createLinearGradient(0, top, 0, bot);
      const c = p.leather || "#6a4a30", dk = p.leatherDk || "#3e2c1c";
      g.addColorStop(0, shade(c, 0.08)); g.addColorStop(1, dk);
      ctx.fillStyle = g; ctx.fill();
      ctx.clip();
      ctx.strokeStyle = shade(dk, -0.1);
      ctx.lineWidth = 0.8;
      ctx.setLineDash([1.5, 1.7]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(0, top + 4 * s); ctx.lineTo(0, bot - 2 * s); ctx.stroke();
    } else {
      const g = ctx.createLinearGradient(-d.sh * 0.2, top, d.sh * 0.2, bot);
      g.addColorStop(0, shade(p.armor, 0.2));
      g.addColorStop(0.45, p.armor);
      g.addColorStop(1, p.armorDk);
      ctx.fillStyle = g; ctx.fill();
      ctx.save();
      ctx.clip();
      gloss(ctx, -d.sh * 0.08, top + 8 * s, d.sh * 0.22, 5 * s);
      ctx.restore();
      ctx.strokeStyle = p.armorDk;
      ctx.lineWidth = 1.15;
      ctx.stroke();
    }
    ctx.restore();
    // if mix: leather belly / belt panel under lacquer chest
    if (p.torsoMat === "mix") {
      leather(ctx, -d.wa * 0.48, mid + 2 * s, d.wa * 0.96, 10 * s, 3 * s, p.leather || "#6a4a30", p.leatherDk || "#3e2c1c");
    }
    // belt
    ctx.fillStyle = p.leatherDk || p.armorDk;
    rr(ctx, -d.hip * 0.48, bot - 3.2 * s, d.hip * 0.96, 3.6 * s, 1.2 * s);
    ctx.fill();
    ctx.fillStyle = p.trim || p.metal;
    ctx.beginPath(); ctx.arc(0, bot - 1.4 * s, 1.8 * s, 0, Math.PI * 2); ctx.fill();
    // shoulder plates
    const smat = (p.armMat === "leather" && p.torsoMat === "leather") ? "leather" : "lacquer";
    panel(ctx, smat, -d.sh * 0.62, top - 1 * s, d.sh * 0.42, 8 * s, 3 * s, p);
    panel(ctx, smat, d.sh * 0.2, top - 1 * s, d.sh * 0.42, 8 * s, 3 * s, p);
    // collar / gorget — high neck, practical, no cleavage
    panel(ctx, tmat === "leather" ? "leather" : "lacquer", -6 * s, top - 1.5 * s, 12 * s, 5 * s, 2 * s, p);
    // thin faction stripe on chest (flat, not shaping the bust)
    ctx.fillStyle = p.accent;
    rr(ctx, -d.wa * 0.22, top + 8 * s, d.wa * 0.44, 2.2 * s, 1 * s);
    ctx.fill();
  }

  function drawArm(ctx, p, s, d, side, pose) {
    // side: -1 back/left (shield), 1 front/right (weapon)
    const mat = p.armMat || "lacquer";
    const x0 = side * d.sh * 0.52;
    const y0 = -24 * s * d.hMul;
    ctx.save();
    ctx.translate(x0, y0);
    if (pose === "shield") ctx.rotate(-0.85);
    else if (pose === "weapon") ctx.rotate(0.55);
    else ctx.rotate(side * 0.35);
    // upper arm
    panel(ctx, mat, -2.6 * s, 0, 5.2 * s, 12 * s, 2.2 * s, p);
    // forearm
    panel(ctx, mat === "lacquer" ? "leather" : mat, -2.3 * s, 11 * s, 4.6 * s, 11 * s, 2 * s, p);
    // hand
    ctx.fillStyle = p.skin;
    ctx.beginPath(); ctx.ellipse(0, 24 * s, 2.4 * s, 2.6 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function club(ctx, s, color) {
    ctx.save(); ctx.translate(16 * s, -6 * s); ctx.rotate(0.55);
    leather(ctx, 0, -3 * s, 20 * s, 7 * s, 3 * s, color, shade(color, -0.25));
    ctx.fillStyle = "#6a4a30"; rr(ctx, -8 * s, -2 * s, 10 * s, 4 * s, 2 * s); ctx.fill();
    ctx.restore();
  }
  function spear(ctx, s, shaft, tip) {
    ctx.save();
    ctx.strokeStyle = shaft; ctx.lineWidth = 2.2 * s; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(10 * s, 10 * s); ctx.lineTo(13 * s, -44 * s); ctx.stroke();
    ctx.fillStyle = tip;
    ctx.beginPath(); ctx.moveTo(13 * s, -54 * s); ctx.lineTo(17 * s, -42 * s); ctx.lineTo(9 * s, -42 * s); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  function bow(ctx, s, color) {
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = 2.3 * s;
    ctx.beginPath(); ctx.arc(16 * s, -8 * s, 16 * s, -1.15, 1.15); ctx.stroke();
    ctx.strokeStyle = "#eee8dc"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(16 * s, -23 * s); ctx.lineTo(16 * s, 7 * s); ctx.stroke();
    ctx.restore();
  }
  function sword(ctx, s, blade, hilt) {
    ctx.save(); ctx.translate(14 * s, -4 * s); ctx.rotate(0.28);
    const g = ctx.createLinearGradient(0, -28 * s, 5 * s, 0);
    g.addColorStop(0, "#f4f6fa"); g.addColorStop(1, blade);
    ctx.fillStyle = g; rr(ctx, 0, -28 * s, 4.6 * s, 30 * s, 1.6 * s); ctx.fill();
    gloss(ctx, 1.6 * s, -18 * s, 1.2 * s, 7 * s);
    ctx.fillStyle = hilt; rr(ctx, -4 * s, 0, 13 * s, 3 * s, 1 * s); ctx.fill();
    ctx.restore();
  }
  function gun(ctx, s, color, long) {
    ctx.save(); ctx.translate(12 * s, -10 * s);
    ctx.fillStyle = color; rr(ctx, 0, -2.5 * s, (long ? 24 : 15) * s, 5 * s, 2 * s); ctx.fill();
    leather(ctx, -5 * s, 0, 8 * s, 6.5 * s, 2 * s, "#5a4030", "#3a2818");
    ctx.fillStyle = shade(color, -0.2);
    rr(ctx, (long ? 18 : 10) * s, -3.5 * s, 6 * s, 3 * s, 1 * s); ctx.fill();
    ctx.restore();
  }
  function shield(ctx, p, s) {
    ctx.save(); ctx.translate(-16 * s, -6 * s);
    lacquer(ctx, -10 * s, -14 * s, 20 * s, 28 * s, 10 * s, p.metal, p.trim);
    ctx.fillStyle = p.accent;
    ctx.beginPath(); ctx.arc(0, 0, 5.5 * s, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  function drawHorse(ctx, p, s) {
    leather(ctx, -24 * s, 8 * s, 44 * s, 20 * s, 10 * s, p.leather || "#c8b090", p.leatherDk || p.armorDk);
    ctx.fillStyle = p.leatherDk || p.armorDk;
    rr(ctx, -18 * s, 24 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, -8 * s, 24 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 6 * s, 24 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 16 * s, 24 * s, 6 * s, 14 * s, 2 * s); ctx.fill();
    leather(ctx, 14 * s, -8 * s, 18 * s, 15 * s, 6 * s, p.leather || "#c8b090", p.leatherDk || p.armorDk);
    ctx.fillStyle = "#3a2a20";
    ctx.beginPath(); ctx.ellipse(30 * s, -5 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2); ctx.fill();
    panel(ctx, "lacquer", -16 * s, 10 * s, 30 * s, 8 * s, 3 * s, p);
  }
  function drawDino(ctx, p, s) {
    const m = p.leather || "#7aaa4a", md = p.leatherDk || p.armorDk;
    leather(ctx, -24 * s, 10 * s, 42 * s, 22 * s, 12 * s, m, md);
    leather(ctx, 10 * s, -4 * s, 22 * s, 16 * s, 8 * s, m, md);
    ctx.fillStyle = "#2a2018";
    ctx.beginPath(); ctx.arc(28 * s, 0, 2.2 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = md;
    rr(ctx, -18 * s, 26 * s, 8 * s, 12 * s, 3 * s); ctx.fill();
    rr(ctx, 6 * s, 26 * s, 8 * s, 12 * s, 3 * s); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-22 * s, 18 * s);
    ctx.quadraticCurveTo(-40 * s, 10 * s, -36 * s, 24 * s);
    ctx.quadraticCurveTo(-28 * s, 20 * s, -22 * s, 22 * s);
    ctx.fillStyle = m; ctx.fill();
  }
  function drawCannon(ctx, p, s) {
    ctx.fillStyle = p.leatherDk || p.armorDk;
    rr(ctx, -8 * s, 20 * s, 8 * s, 14 * s, 2 * s); ctx.fill();
    rr(ctx, 10 * s, 20 * s, 8 * s, 14 * s, 2 * s); ctx.fill();
    lacquer(ctx, -6 * s, 2 * s, 36 * s, 16 * s, 7 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.armorDk;
    ctx.beginPath(); ctx.ellipse(32 * s, 10 * s, 6 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
  }
  function drawTank(ctx, p, s) {
    lacquer(ctx, -24 * s, 10 * s, 48 * s, 18 * s, 6 * s, p.accent || p.armor, p.armorDk);
    lacquer(ctx, -14 * s, -2 * s, 28 * s, 16 * s, 6 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.trim;
    rr(ctx, 10 * s, -4 * s, 22 * s, 5 * s, 2 * s); ctx.fill();
    ctx.fillStyle = "#5a5a58";
    rr(ctx, -26 * s, 24 * s, 52 * s, 8 * s, 3 * s); ctx.fill();
  }
  function drawShip(ctx, p, s) {
    lacquer(ctx, -26 * s, 2 * s, 52 * s, 22 * s, 12 * s, p.armor, p.armorDk);
    ctx.fillStyle = p.glow || "#b8f0ff";
    ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.ellipse(0, 26 * s, 14 * s, 5 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = p.metal;
    rr(ctx, -8 * s, -6 * s, 16 * s, 10 * s, 4 * s); ctx.fill();
  }


  const ERA_IDS = ["stone", "farm", "sparta", "ren", "modern", "space"];
  const imgs = {};
  const SKIN_RING = { israel: "#3d7ad6", gold: "#e8c44a", teal: "#2aa8a0", scarlet: "#e03a4a", opal: "#c9a0e8" };

  function portraitSrc(team, era, type, hero) {
    if (hero) return "img/heroes/" + hero + ".webp";
    era = Math.max(0, Math.min(5, era | 0));
    const id = ERA_IDS[era];
    if ((team || "player") === "enemy") return "img/legion/" + id + ".webp";
    return "img/israel/" + id + "-" + (type | 0) + ".webp";
  }

  function preloadImages(base) {
    base = base || "./";
    const list = [];
    ERA_IDS.forEach((id) => {
      for (let t = 0; t < 3; t++) {
        list.push("img/israel/" + id + "-" + t + ".webp");
        list.push("img/sprites/israel/" + id + "-" + t + ".webp");
      }
      list.push("img/legion/" + id + ".webp");
      list.push("img/sprites/legion/" + id + ".webp");
      list.push("img/sprites/legion/" + id + "-2.webp");
    });
    ["daliya", "noa", "yael", "miri"].forEach((h) => list.push("img/heroes/" + h + ".webp"));
    list.push("img/bg/battle.webp", "img/bg/menu.webp", "img/bg/map.webp");
    return Promise.all(list.map((src) => new Promise((res) => {
      const im = new Image();
      im.onload = () => { imgs[src] = im; res(im); };
      im.onerror = () => res(null);
      im.src = base + src;
    })));
  }

  function getImg(src) { return imgs[src] || null; }

  function spriteSrc(team, era, type) {
    era = Math.max(0, Math.min(5, era | 0));
    const id = ERA_IDS[era];
    if ((team || "player") === "enemy") {
      if ((type | 0) === 2) return "img/sprites/legion/" + id + "-2.webp";
      return "img/sprites/legion/" + id + ".webp";
    }
    return "img/sprites/israel/" + id + "-" + (type | 0) + ".webp";
  }

  function getSprite(team, era, type) {
    let im = getImg(spriteSrc(team, era, type));
    if (!im && (team || "player") === "enemy" && (type | 0) === 2) {
      im = getImg("img/sprites/legion/" + ERA_IDS[Math.max(0, Math.min(5, era | 0))] + ".webp");
    }
    return im || null;
  }

  function spriteDrawSize(opt, img) {
    const s = opt.scale || 1;
    const era = opt.era | 0, type = opt.type | 0;
    const isVeh = type === 2 && era !== 1;
    const iw = img.naturalWidth || img.width || 1;
    const ih = img.naturalHeight || img.height || 1;
    let h = (isVeh ? 88 : 96) * s;
    let w = h * (iw / ih);
    const maxW = (isVeh ? 108 : 72) * s;
    if (w > maxW) { w = maxW; h = w * (ih / iw); }
    return { w, h, isVeh };
  }

  function muzzleOffset(opt, img) {
    const s = opt.scale || 1;
    const era = opt.era | 0, type = opt.type | 0;
    const facing = opt.facing == null ? 1 : opt.facing;
    let w, h;
    if (img) {
      const d = spriteDrawSize(opt, img);
      w = d.w; h = d.h;
    } else {
      w = (type === 2 ? 96 : 56) * s;
      h = (type === 2 ? 80 : 96) * s;
    }
    let lx, ly;
    if (type === 2 && (era === 3 || era === 4 || era === 5)) {
      lx = w * 0.48; ly = -h * (era === 5 ? 0.40 : 0.55);
    } else if (type === 2) {
      lx = w * 0.30; ly = -h * 0.70;
    } else if (type === 1) {
      lx = w * 0.46; ly = -h * 0.62;
    } else {
      lx = w * 0.40; ly = -h * 0.52;
    }
    return { x: facing * lx, y: ly };
  }

  function drawUnitSprite(ctx, opt, img) {
    const s = opt.scale || 1;
    const team = opt.team || "player";
    const { w, h } = spriteDrawSize(opt, img);
    const t = opt.t || 0;
    const walking = !!opt.walking;
    const attack = Math.max(0, opt.attack || 0);
    const hit = Math.max(0, opt.hit || 0);
    const dead = Math.max(0, opt.deadT || 0);

    ctx.save();
    if (opt.facing === -1) ctx.scale(-1, 1);

    if (dead > 0) {
      const k = Math.min(1, dead / 0.75);
      ctx.globalAlpha *= Math.max(0, 1 - k);
      ctx.translate(-k * 6 * s, k * 16 * s);
      ctx.rotate(-k * 1.2);
    }

    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.beginPath();
    ctx.ellipse(0, 2 * s, Math.max(10, w * 0.28), Math.max(3, h * 0.045), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    let bob = 0, skew = 0, lunge = 0;
    if (walking && dead <= 0) {
      const ph = t * 8.2;
      bob = Math.sin(ph) * 2.3 * s;
      skew = Math.sin(ph) * 0.085;
    }
    if (attack > 0 && dead <= 0) {
      const a = 1 - Math.min(1, attack);
      if (a < 0.32) lunge = (a / 0.32) * 11 * s;
      else lunge = (1 - (a - 0.32) / 0.68) * 5 * s - ((a - 0.32) / 0.68) * 4 * s;
    }
    ctx.translate(lunge, bob);
    if (skew) ctx.transform(1, 0, skew, 1, 0, 0);

    const dx = -w / 2, dy = -h;
    ctx.drawImage(img, dx, dy, w, h);
    if (hit > 0) {
      ctx.save();
      ctx.globalAlpha *= Math.min(0.85, hit * 5);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(img, dx, dy, w, h);
      ctx.restore();
    }
    ctx.restore();

    if (opt.hpRatio != null && opt.hpRatio < 1 && dead <= 0) {
      const bw = Math.max(22, w * 0.7), bh = 4 * s;
      const barY = -h - 8 * s;
      rr(ctx, -bw / 2, barY, bw, bh, 2); ctx.fillStyle = "rgba(0,0,0,.4)"; ctx.fill();
      ctx.fillStyle = opt.hpRatio > 0.4 ? "#6bc96a" : "#e85d4c";
      rr(ctx, -bw / 2, barY, bw * Math.max(0, opt.hpRatio), bh, 2); ctx.fill();
    }
  }

  function drawUnitToken(ctx, opt, img) {
    const s = opt.scale || 1;
    const r = ((opt.type === 2) ? 31 : 26) * s;
    const team = opt.team || "player";
    ctx.save();
    if (opt.facing === -1) ctx.scale(-1, 1);
    ctx.fillStyle = "rgba(0,0,0,.28)";
    ctx.beginPath();
    ctx.ellipse(0, 7 * s, r * 0.9, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    const cy = -r * 0.2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, cy, r, 0, Math.PI * 2);
    ctx.clip();
    const iw = img.width, ih = img.height;
    const side = Math.min(iw, Math.round(ih * 0.7));
    const sx = (iw - side) / 2;
    const sy = Math.round(ih * 0.05);
    ctx.drawImage(img, sx, sy, side, side, -r, cy - r, r * 2, r * 2);
    ctx.restore();
    const ring = team === "enemy" ? "#5a2a78" : (SKIN_RING[opt.skin] || "#3d7ad6");
    ctx.strokeStyle = ring;
    ctx.lineWidth = 3 * s;
    ctx.beginPath(); ctx.arc(0, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = team === "enemy" ? "#e0c8ff" : "#fff";
    ctx.lineWidth = 1.15 * s;
    ctx.beginPath(); ctx.arc(0, cy, r - 2.2 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    if (opt.hpRatio != null && opt.hpRatio < 1) {
      const w = r * 1.7, h = 4 * s;
      const barY = cy - r - 8 * s;
      rr(ctx, -w / 2, barY, w, h, 2); ctx.fillStyle = "rgba(0,0,0,.4)"; ctx.fill();
      ctx.fillStyle = opt.hpRatio > 0.4 ? "#6bc96a" : "#e85d4c";
      rr(ctx, -w / 2, barY, w * Math.max(0, opt.hpRatio), h, 2); ctx.fill();
    }
  }

  function drawUnit(ctx, opt) {
    const era = opt.era | 0, type = opt.type | 0;
    const team = opt.team || "player";
    const s = opt.scale || 1;
    const sprite = getSprite(team, era, type);
    if (sprite) { drawUnitSprite(ctx, opt, sprite); return; }
    const p = opt.look || lookFor(era, type, team, opt.skin);
    const t = opt.t || 0;
    const bob = Math.sin(t * 6 + (opt.phase || 0)) * 1.1 * s;
    const wide = type === 2;
    const d = buildDims(p, s, wide);
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
    const rd = ride ? buildDims(p, rs, false) : d;
    if (ride) ctx.translate(era === 3 ? -8 * s : -2 * s, (era === 4 || era === 5) ? -12 * s : -22 * s);

    drawArm(ctx, p, rs, rd, -1, (type === 0 && era === 2) ? "shield" : "down");
    drawLegs(ctx, p, rs, rd);
    drawTorso(ctx, p, rs, rd);
    drawHead(ctx, p, { scale: rs, blink: opt.blink }, rd);
    drawHelmet(ctx, p, rs, rd);
    drawArm(ctx, p, rs, rd, 1, "weapon");

    if (type === 0) {
      if (era === 0) club(ctx, rs, p.leather || p.trim);
      else if (era === 1) spear(ctx, rs, "#8a6a30", p.accent);
      else if (era === 2) { spear(ctx, rs, p.trim, p.metal); shield(ctx, p, rs); }
      else if (era === 3) sword(ctx, rs, p.metal, p.trim);
      else if (era === 4) club(ctx, rs, p.accent);
      else sword(ctx, rs, p.glow || p.metal, p.trim);
    } else if (type === 1) {
      if (era === 0 || era === 1) {
        ctx.fillStyle = era === 0 ? "#888" : p.trim;
        ctx.beginPath(); ctx.arc(18 * rs, -14 * rs, 4 * rs, 0, Math.PI * 2); ctx.fill();
      } else if (era === 2) bow(ctx, rs, p.trim);
      else if (era === 3 || era === 4) gun(ctx, rs, era === 4 ? (p.visor || "#6a7") : "#5a4030", true);
      else gun(ctx, rs, p.glow || p.metal, true);
    } else if (era === 1) {
      ctx.save();
      ctx.strokeStyle = "#8a6a30"; ctx.lineWidth = 2.2 * rs;
      ctx.beginPath(); ctx.moveTo(8 * rs, 8 * rs); ctx.lineTo(16 * rs, -32 * rs); ctx.stroke();
      ctx.strokeStyle = p.metal; ctx.lineWidth = 3 * rs;
      ctx.beginPath(); ctx.arc(16 * rs, -26 * rs, 10 * rs, -1.2, 0.4); ctx.stroke();
      ctx.restore();
    } else if (era === 0 || era === 2) spear(ctx, rs, p.trim, p.metal);

    ctx.restore();

    if (opt.hpRatio != null && opt.hpRatio < 1) {
      const w = 28 * s, h = 4 * s;
      const barY = (d.headY - d.headR * 2.9) - 4 * s;
      ctx.fillStyle = "rgba(0,0,0,.35)";
      rr(ctx, -w / 2, barY, w, h, 2); ctx.fill();
      ctx.fillStyle = opt.hpRatio > 0.4 ? "#6bc96a" : "#e85d4c";
      rr(ctx, -w / 2, barY, w * Math.max(0, opt.hpRatio), h, 2); ctx.fill();
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
    const photo = getImg("img/bg/battle.webp");
    if (photo) {
      const sc = Math.max(W / photo.width, H / photo.height);
      const dw = photo.width * sc, dh = photo.height * sc;
      ctx.drawImage(photo, (W - dw) / 2, (H - dh) / 2, dw, dh);
      // soft bottom fade so dock meets the grass
      const vg = ctx.createLinearGradient(0, H * 0.75, 0, H);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(20,30,10,.18)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
      return;
    }
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
    drawIsraelFlag, drawLegionEmblem, plate, gloss,
    portraitSrc, spriteSrc, getSprite, muzzleOffset, preloadImages, getImg, ERA_IDS
  };
})(window);
