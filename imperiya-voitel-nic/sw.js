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
  "./manifest.webmanifest",
  "./heroines/0.webp","./heroines/1.webp","./heroines/2.webp","./heroines/3.webp",
  "./heroines/4.webp","./heroines/5.webp","./heroines/6.webp","./heroines/7.webp",
  "./heroines/8.webp","./heroines/9.webp","./heroines/10.webp","./heroines/11.webp",
  "./heroines/12.webp","./heroines/13.webp","./heroines/14.webp","./heroines/15.webp",
  "./heroines/16.webp","./heroines/17.webp",
  "./heroines/full/0.webp","./heroines/full/0_atk.webp",
  "./heroines/full/1.webp","./heroines/full/1_atk.webp",
  "./heroines/full/2.webp","./heroines/full/2_atk.webp",
  "./heroines/full/3.webp","./heroines/full/3_atk.webp",
  "./heroines/full/4.webp","./heroines/full/4_atk.webp",
  "./heroines/full/5.webp","./heroines/full/5_atk.webp",
  "./heroines/full/6.webp","./heroines/full/6_atk.webp",
  "./heroines/full/7.webp","./heroines/full/7_atk.webp",
  "./heroines/full/8.webp","./heroines/full/8_atk.webp",
  "./heroines/full/9.webp","./heroines/full/9_atk.webp",
  "./heroines/full/10.webp","./heroines/full/10_atk.webp",
  "./heroines/full/11.webp","./heroines/full/11_atk.webp",
  "./heroines/full/12.webp","./heroines/full/12_atk.webp",
  "./heroines/full/13.webp","./heroines/full/13_atk.webp",
  "./heroines/full/14.webp","./heroines/full/14_atk.webp",
  "./heroines/full/15.webp","./heroines/full/15_atk.webp",
  "./heroines/full/16.webp","./heroines/full/16_atk.webp",
  "./heroines/full/17.webp","./heroines/full/17_atk.webp",
  "./enemies/0_knight.webp","./enemies/0_knight_atk.webp","./enemies/0_shade.webp","./enemies/0_shade_atk.webp","./enemies/0_marksman.webp","./enemies/0_marksman_atk.webp","./enemies/0_brute.webp","./enemies/0_brute_atk.webp","./enemies/0_boss.webp","./enemies/0_boss_atk.webp",
  "./enemies/1_knight.webp","./enemies/1_knight_atk.webp","./enemies/1_shade.webp","./enemies/1_shade_atk.webp","./enemies/1_marksman.webp","./enemies/1_marksman_atk.webp","./enemies/1_brute.webp","./enemies/1_brute_atk.webp","./enemies/1_boss.webp","./enemies/1_boss_atk.webp",
  "./enemies/2_knight.webp","./enemies/2_knight_atk.webp","./enemies/2_shade.webp","./enemies/2_shade_atk.webp","./enemies/2_marksman.webp","./enemies/2_marksman_atk.webp","./enemies/2_brute.webp","./enemies/2_brute_atk.webp","./enemies/2_boss.webp","./enemies/2_boss_atk.webp",
  "./enemies/3_knight.webp","./enemies/3_knight_atk.webp","./enemies/3_shade.webp","./enemies/3_shade_atk.webp","./enemies/3_marksman.webp","./enemies/3_marksman_atk.webp","./enemies/3_brute.webp","./enemies/3_brute_atk.webp","./enemies/3_boss.webp","./enemies/3_boss_atk.webp",
  "./enemies/4_knight.webp","./enemies/4_knight_atk.webp","./enemies/4_shade.webp","./enemies/4_shade_atk.webp","./enemies/4_marksman.webp","./enemies/4_marksman_atk.webp","./enemies/4_brute.webp","./enemies/4_brute_atk.webp","./enemies/4_boss.webp","./enemies/4_boss_atk.webp",
  "./enemies/5_knight.webp","./enemies/5_knight_atk.webp","./enemies/5_shade.webp","./enemies/5_shade_atk.webp","./enemies/5_marksman.webp","./enemies/5_marksman_atk.webp","./enemies/5_brute.webp","./enemies/5_brute_atk.webp","./enemies/5_boss.webp","./enemies/5_boss_atk.webp",
  "./enemies/6_knight.webp","./enemies/6_knight_atk.webp","./enemies/6_shade.webp","./enemies/6_shade_atk.webp","./enemies/6_marksman.webp","./enemies/6_marksman_atk.webp","./enemies/6_brute.webp","./enemies/6_brute_atk.webp","./enemies/6_boss.webp","./enemies/6_boss_atk.webp"
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
