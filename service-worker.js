const CACHE="ern-offline-v1";
const OFFLINE="/offline.html";
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add(OFFLINE)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&key.startsWith("ern-offline-")).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
  if(event.request.mode!=="navigate")return;
  event.respondWith(fetch(event.request).catch(async()=>{const cached=await caches.match(OFFLINE);return cached||new Response("Earth Right Now is offline. Reconnect to see current Earth views.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}})}));
});
