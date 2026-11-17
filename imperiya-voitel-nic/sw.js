/* Crown Quest v16 · versioned offline-first assets and network-first updates */
const CACHE="imperiya-voitel-nic-v16",FILES=["./","./index.html","./rock-v16.css?v=16","./audio-v8.js?v=13","./battle-v9.js","./storybook.js?v=11","./art.js","./app.js?v=16","./icon.svg","./manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("imperiya-voitel-nic-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 const req=e.request;if(req.method!=="GET")return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(req.mode==="navigate"){
  e.respondWith(fetch(req).then(res=>{
   if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",copy)).catch(()=>{});}
   return res;
  }).catch(()=>caches.match("./index.html").then(cached=>cached||caches.match("./"))));
  return;
 }
 e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
  if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}
  return res;
 })));
});
