const CACHE = "lacquer-warriors-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./app.css",
  "./data.js",
  "./draw.js",
  "./battle.js",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./fonts/Fredoka-Regular.ttf",
  "./fonts/Fredoka-SemiBold.ttf",
  "./img/bg/battle.webp",
  "./img/bg/map.webp",
  "./img/bg/menu.webp",
  "./img/heroes/daliya.webp",
  "./img/heroes/miri.webp",
  "./img/heroes/noa.webp",
  "./img/heroes/yael.webp",
  "./img/israel/farm-0.webp",
  "./img/israel/farm-1.webp",
  "./img/israel/farm-2.webp",
  "./img/israel/modern-0.webp",
  "./img/israel/modern-1.webp",
  "./img/israel/modern-2.webp",
  "./img/israel/ren-0.webp",
  "./img/israel/ren-1.webp",
  "./img/israel/ren-2.webp",
  "./img/israel/space-0.webp",
  "./img/israel/space-1.webp",
  "./img/israel/space-2.webp",
  "./img/israel/sparta-0.webp",
  "./img/israel/sparta-1.webp",
  "./img/israel/sparta-2.webp",
  "./img/israel/stone-0.webp",
  "./img/israel/stone-1.webp",
  "./img/israel/stone-2.webp",
  "./img/legion/farm.webp",
  "./img/legion/modern.webp",
  "./img/legion/ren.webp",
  "./img/legion/space.webp",
  "./img/legion/sparta.webp",
  "./img/legion/stone.webp",
  "./img/sprites/israel/farm-0.webp",
  "./img/sprites/israel/farm-1.webp",
  "./img/sprites/israel/farm-2.webp",
  "./img/sprites/israel/modern-0.webp",
  "./img/sprites/israel/modern-1.webp",
  "./img/sprites/israel/modern-2.webp",
  "./img/sprites/israel/ren-0.webp",
  "./img/sprites/israel/ren-1.webp",
  "./img/sprites/israel/ren-2.webp",
  "./img/sprites/israel/space-0.webp",
  "./img/sprites/israel/space-1.webp",
  "./img/sprites/israel/space-2.webp",
  "./img/sprites/israel/sparta-0.webp",
  "./img/sprites/israel/sparta-1.webp",
  "./img/sprites/israel/sparta-2.webp",
  "./img/sprites/israel/stone-0.webp",
  "./img/sprites/israel/stone-1.webp",
  "./img/sprites/israel/stone-2.webp",
  "./img/sprites/legion/farm.webp",
  "./img/sprites/legion/modern-2.webp",
  "./img/sprites/legion/modern.webp",
  "./img/sprites/legion/ren-2.webp",
  "./img/sprites/legion/ren.webp",
  "./img/sprites/legion/space-2.webp",
  "./img/sprites/legion/space.webp",
  "./img/sprites/legion/sparta.webp",
  "./img/sprites/legion/stone.webp",
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        const copy = res.clone();
        if (res.ok && new URL(event.request.url).origin === location.origin) {
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
