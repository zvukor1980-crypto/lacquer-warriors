/**
 * v17.2 layout check — Playwright WebKit with iPhone emulation.
 * Run: node tests/layout-iphone.mjs
 * Asserts documentElement.scrollWidth <= innerWidth and every visible box
 * stays inside innerWidth. Screenshots land in /opt/cursor/artifacts/v17.2/.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";

const playwrightRoot = [
  join(process.cwd(), "package.json"),
  "/tmp/pw-layout/package.json"
].find(file => existsSync(file) && existsSync(join(file, "..", "node_modules", "playwright")));
if (!playwrightRoot) throw new Error("Install playwright (npm install playwright) before running tests/layout-iphone.mjs");
const { webkit, devices } = createRequire(playwrightRoot)("playwright");

const ROOT = join(process.cwd(), "imperiya-voitel-nic");
const OUT = "/opt/cursor/artifacts/v17.2";
mkdirSync(OUT, { recursive: true });

const TYPES = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "text/javascript;charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".json": "application/json"
};

const VIEWPORTS = [
  { name: "390x844", width: 390, height: 844, safe: null },
  { name: "390x730", width: 390, height: 730, safe: null },
  { name: "390x664", width: 390, height: 664, safe: null },
  { name: "375x667", width: 375, height: 667, safe: null },
  { name: "430x932", width: 430, height: 932, safe: null },
  { name: "360x740", width: 360, height: 740, safe: null },
  { name: "390x664-large-text", width: 390, height: 664, safe: null, largeText: true }
];

const SHOTS = new Set(["390x664", "390x844"]);
const SCREENS = ["menu", "battle", "heroes", "shop", "upgrades", "goals", "transfer"];

function serve() {
  return new Promise(resolve => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      let path = decodeURIComponent(url.pathname);
      if (path.endsWith("/")) path += "index.html";
      const file = normalize(join(ROOT, path));
      if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
      try {
        const body = await readFile(file);
        res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream", "cache-control": "no-store" });
        res.end(body);
      } catch {
        res.writeHead(404); res.end();
      }
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const SAVE = {
  coins: 12840, gems: 860, era: 0, stage: 3, timeline: 1, first: false,
  food: 2, base: 1, attack: 1, vital: 0, income: 0, auto: false, skin: 0, relic: 0,
  magic: [0, 1, 2], loadout: [0, 1, 2], units: [1, 1, 0], hero: 0, heroes: [0, 1, 2],
  wins: 4, losses: 1, kills: 20, deployed: 6, claimed: "", sound: true, music: false, fx: false,
  musicVolume: .68, fxVolume: .72, cards: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], deck: [0, 1, 2],
  dungeonFloor: 1, purchases: 1, streak: 1, bestStreak: 1, heroXP: Array(18).fill(40),
  freeKitClaimed: false
};

function auditScript(expectBattle) {
  return `(() => {
    const vw = window.innerWidth;
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const offenders = [];
    const nodes = document.body.querySelectorAll("*");
    for (const el of nodes) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 && r.height < 1) continue;
      const overR = r.right - vw;
      const overL = -r.left;
      if (overR > 0.5 || overL > 0.5) {
        const id = el.id ? "#" + el.id : "";
        const cls = el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\\s+/).slice(0, 2).join(".") : "";
        offenders.push({ box: id || cls || el.tagName, left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), text: (el.innerText || "").trim().slice(0, 40) });
        if (offenders.length > 14) break;
      }
    }
    const se = document.scrollingElement;
    const app = document.getElementById("app");
    const ar = app.getBoundingClientRect();
    const wallet = document.querySelector(".wallet");
    const wr = wallet.getBoundingClientRect();
    const walletClipped = [...document.querySelectorAll(".wallet div")].some(el => el.scrollWidth > el.clientWidth + 1);
    const header = document.getElementById("gameHeader");
    const hs = getComputedStyle(header);
    const frame = document.querySelector(".battleframe");
    const frRaw = frame ? frame.getBoundingClientRect() : null;
    const fr = frRaw && frRaw.width > 20 && frRaw.height > 20 ? frRaw : null;
    const dockBtn = document.querySelector("#battleQuick .quick-button");
    const dr = dockBtn ? dockBtn.getBoundingClientRect() : null;
    const lastBtn = document.querySelector("#battleQuick .rock-dock-grid .quick-button:last-child");
    const lr = lastBtn ? lastBtn.getBoundingClientRect() : null;
    const controls = [...document.querySelectorAll("#battleQuick .quick-button, #fightaction button, nav button, .wallet, #toast.show")];
    const toast = document.getElementById("toast");
    const tr = toast && toast.classList.contains("show") ? toast.getBoundingClientRect() : null;
    let toastHits = false;
    if (tr && tr.height > 0) {
      for (const el of document.querySelectorAll("#battleQuick .quick-button, #fightaction button, nav button, .wallet div")) {
        const b = el.getBoundingClientRect();
        if (b.width < 1 || b.height < 1) continue;
        const hit = tr.left < b.right - 2 && tr.right > b.left + 2 && tr.top < b.bottom - 2 && tr.bottom > b.top + 2;
        if (hit) { toastHits = true; break; }
      }
    }
    const battle = document.body.classList.contains("game-cockpit");
    const controlsOutside = [];
    if (battle) {
      for (const el of document.querySelectorAll(".wallet div, #battleQuick .quick-button, #fightaction button, header")) {
        const b = el.getBoundingClientRect();
        if (b.height < 1) continue;
        if (b.top < -1 || b.bottom > vh + 1 || b.left < -1 || b.right > vw + 1) {
          controlsOutside.push((el.id || el.className || el.tagName).toString().slice(0, 40));
        }
      }
    }
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      vw, vh,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: se.scrollHeight,
      clientHeight: se.clientHeight,
      offenders,
      app: { top: Math.round(ar.top), bottom: Math.round(ar.bottom), left: Math.round(ar.left), right: Math.round(ar.right), h: Math.round(ar.height) },
      wallet: { right: Math.round(wr.right), clipped: walletClipped },
      headerPad: [hs.paddingLeft, hs.paddingRight],
      frameInset: fr ? [Math.round(fr.left - ar.left), Math.round(ar.right - fr.right)] : null,
      dockInset: dr && lr && fr ? [Math.round(dr.left), Math.round(lr.right), Math.round(fr.left), Math.round(fr.right)] : null,
      frameH: fr ? Math.round(fr.height) : 0,
      battle,
      controlsOutside,
      toastHits,
      vvh: rootStyle.getPropertyValue("--vvh").trim(),
      safeT: rootStyle.getPropertyValue("--safe-t").trim(),
      safeB: rootStyle.getPropertyValue("--safe-b").trim(),
      appPadTop: parseFloat(getComputedStyle(app).paddingTop) || 0,
      dockPadBottom: document.getElementById("battleQuick") ? parseFloat(getComputedStyle(document.getElementById("battleQuick")).paddingBottom) || 0 : 0,
      navPadBottom: document.querySelector("nav") ? parseFloat(getComputedStyle(document.querySelector("nav")).paddingBottom) || 0 : 0,
      lowestControl: (() => {
        const nodes = battle
          ? document.querySelectorAll("#battleQuick .quick-button")
          : document.querySelectorAll("nav button");
        let bottom = 0;
        nodes.forEach(el => { const b = el.getBoundingClientRect(); if (b.height > 1) bottom = Math.max(bottom, b.bottom); });
        return Math.round(bottom);
      })(),
      dockFit: (() => {
        const buttons = [...document.querySelectorAll("#battleQuick .rock-dock-grid .quick-button")].filter(el => el.getBoundingClientRect().height > 1);
        if (buttons.length < 5) return null;
        return buttons.every(el => {
          const r = el.getBoundingClientRect();
          return r.left >= -0.5 && r.right <= vw + 0.5 && r.width >= 32;
        });
      })(),
      viewport: document.querySelector('meta[name="viewport"]').content,
      expectBattle: ${expectBattle ? "true" : "false"}
    };
  })()`;
}

function problems(name, screen, data, safe) {
  const issues = [];
  if (data.scrollWidth > data.innerWidth + 0.5) issues.push("document scrollWidth " + data.scrollWidth + " > innerWidth " + data.innerWidth);
  if (data.offenders.length) issues.push("horizontal overflow: " + JSON.stringify(data.offenders.slice(0, 6)));
  if (data.wallet.clipped) issues.push("wallet text clipped");
  if (data.wallet.right > data.vw + 1) issues.push("wallet past the right edge");
  if (data.headerPad[0] !== data.headerPad[1]) issues.push("header padding not symmetric " + data.headerPad.join("/"));
  if (data.frameInset && Math.abs(data.frameInset[0] - data.frameInset[1]) > 1) issues.push("battlefield insets " + data.frameInset.join("/"));
  if (data.dockInset) {
    const [bl, br, fl, fr] = data.dockInset;
    if (Math.abs(bl - fl) > 3 || Math.abs(br - fr) > 3) issues.push("dock not aligned with battlefield " + data.dockInset.join(","));
  }
  if (!/width\s*=\s*device-width/.test(data.viewport) || !/initial-scale\s*=\s*1/.test(data.viewport) || !data.viewport.includes("viewport-fit=cover")) issues.push("viewport meta: " + data.viewport);
  if (/shrink-to-fit\s*=\s*no/i.test(data.viewport) || /maximum-scale\s*=\s*1/.test(data.viewport)) issues.push("viewport locks scale and clips a wide page: " + data.viewport);
  if (data.dockFit === false) issues.push("dock is not five columns inside the viewport");
  const vvh = parseFloat(data.vvh);
  if (Math.abs(vvh - data.vh) > 1) issues.push("--vvh " + data.vvh + " != visualViewport " + data.vh);
  if (data.expectBattle || data.battle) {
    if (data.scrollHeight > data.clientHeight + 1) issues.push("battle document scrolls vertically " + data.scrollHeight + ">" + data.clientHeight);
    if (data.app.bottom > data.vh + 1 || data.app.top < -1) issues.push("cockpit outside viewport " + JSON.stringify(data.app));
    if (Math.abs(data.app.h - data.vh) > 2) issues.push("cockpit height " + data.app.h + " != " + data.vh);
    if (data.frameH < 120) issues.push("battlefield only " + data.frameH + "px");
    if (data.controlsOutside.length) issues.push("controls outside viewport: " + data.controlsOutside.join(", "));
  }
  if (data.toastHits) issues.push("toast covers a control");
  if (safe) {
    const top = parseFloat(data.safeT);
    const bottom = parseFloat(data.safeB);
    if (Math.abs(top - safe.top) > 0.5 || Math.abs(bottom - safe.bottom) > 0.5) issues.push("safe area vars " + data.safeT + "/" + data.safeB);
    if (Math.abs(data.appPadTop - safe.top) > 1) issues.push("app padding-top " + data.appPadTop + " != safe " + safe.top);
    if (data.battle && data.dockPadBottom < safe.bottom) issues.push("dock padding-bottom " + data.dockPadBottom + " < safe " + safe.bottom);
    if (!data.battle && data.navPadBottom < safe.bottom - 0.5) issues.push("nav padding-bottom " + data.navPadBottom + " < safe " + safe.bottom);
    if (data.lowestControl && data.lowestControl > data.vh - safe.bottom + 1) issues.push("control bottom " + data.lowestControl + " enters the home-indicator inset");
  }
  return issues.map(item => name + " " + screen + ": " + item);
}

async function show(page, screen) {
  await page.evaluate(target => {
    const click = sel => { const el = document.querySelector(sel); if (el) el.click(); };
    document.getElementById("modal").hidden = true;
    if (target === "menu") click('[data-tab="battle"]');
    else if (target === "battle") {
      click('[data-tab="battle"]');
      if (!document.querySelector("#fightaction .battletools")) click('[data-a="start"]');
    } else if (target === "heroes") click('[data-tab="heroes"]');
    else if (target === "shop") click('[data-tab="shop"]');
    else if (target === "upgrades") click('[data-tab="army"]');
    else if (target === "goals") click('[data-tab="other"]');
    else if (target === "transfer") {
      click('[data-tab="battle"]');
      const btn = document.querySelector('[data-a="transfer"]');
      if (btn) btn.click();
    }
  }, screen);
  if (screen === "battle") {
    await page.waitForTimeout(250);
    const summon = page.locator("#battleQuick .quick-button.troop").first();
    if (await summon.count()) await summon.click();
    await page.waitForTimeout(350);
  } else {
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => {
    if (window.toast) return;
  });
  await page.evaluate(() => {
    const node = document.getElementById("toast");
    node.textContent = "Бой начался — магию примени, когда выйдут враги";
    node.classList.add("show");
  });
  await page.waitForTimeout(60);
}

async function main() {
  const server = await serve();
  const port = server.address().port;
  const base = "http://127.0.0.1:" + port + "/index.html";
  const iphone = devices["iPhone 13"];
  const browser = await webkit.launch();
  const failures = [];
  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        ...iphone,
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        locale: "ru-RU",
        hasTouch: true,
        isMobile: true
      });
      await context.addInitScript(save => {
        localStorage.setItem("queen_empire_offline_v2", JSON.stringify(save));
      }, SAVE);
      const page = await context.newPage();
      const logs = [];
      page.on("pageerror", err => logs.push(String(err)));
      await page.goto(base, { waitUntil: "load" });
      await page.waitForSelector("#battleQuick .quick-button");
      const textAdjust = await page.evaluate(async () => {
        const href = document.querySelector('link[rel="stylesheet"]').href;
        const text = await (await fetch(href)).text();
        return /-webkit-text-size-adjust\s*:\s*100%/.test(text) && /(?:^|[\s;{])text-size-adjust\s*:\s*100%/.test(text);
      });
      if (!textAdjust) failures.push(vp.name + ": stylesheet is missing -webkit-text-size-adjust:100%");
      if (vp.safe) {
        await page.addStyleTag({ content: ":root{--safe-t:" + vp.safe.top + "px !important;--safe-b:" + vp.safe.bottom + "px !important}" });
        await page.waitForTimeout(50);
      }
      if (vp.largeText) {
        await page.addStyleTag({ content: "html,body,#app,#app *{font-size:17px !important;-webkit-text-size-adjust:140% !important;text-size-adjust:140% !important}" });
        await page.waitForTimeout(50);
      }
      for (const screen of SCREENS) {
        await show(page, screen);
        const battleish = screen === "menu" || screen === "battle";
        const data = await page.evaluate(source => (0, eval)(source), auditScript(battleish));
        const found = problems(vp.name, screen, data, vp.safe);
        if (logs.length) found.push(vp.name + " " + screen + " pageerror: " + logs.splice(0).join(" | "));
        failures.push(...found);
        if (SHOTS.has(vp.name) && (screen === "menu" || screen === "battle")) {
          await page.evaluate(() => document.getElementById("toast").classList.remove("show"));
          await page.screenshot({ path: join(OUT, vp.name + "-" + screen + ".png") });
        }
        if (found.length) console.log(found.join("\n"));
        else console.log("ok " + vp.name + " " + screen + " frame=" + data.frameH);
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  if (failures.length) {
    console.error("\nLAYOUT FAILURES " + failures.length);
    for (const line of failures) console.error(line);
    process.exit(1);
  }
  console.log("\nAll layout checks passed");
}

main().catch(err => { console.error(err); process.exit(1); });
