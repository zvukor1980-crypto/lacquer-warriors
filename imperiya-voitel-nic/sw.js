/* Crown Quest v17 · relative offline cache for GitHub Pages subpaths */
const CACHE="imperiya-voitel-nic-v17";
const FILES=[
  "./",
  "./index.html",
  "./rock-v17.css?v=17",
  "./audio-v8.js?v=17",
  "./battle-v9.js?v=17",
  "./storybook.js?v=17",
  "./art.js?v=17",
  "./app.js?v=17",
  "./icon.svg",
  "./manifest.webmanifest"
];
self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await Promise.all(FILES.map(file=>cache.add(new Request(file,{cache:"reload"})).catch(()=>{})));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith("imperiya-voitel-nic-")&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==="navigate"){
    event.respondWith(fetch(req).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",copy)).catch(()=>{});}
      return res;
    }).catch(()=>caches.match("./index.html").then(cached=>cached||caches.match("./"))));
    return;
  }
  event.respondWith(caches.match(req).then(hit=>{
    if(hit)return hit;
    return fetch(req).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{});}
      return res;
    });
  }));
});
