const CACHE_NAME = 'cafe-tin-recovery-20260824-v2';
const CORE = ['./', './index.html', './manifest.json', './favicon.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE).catch(()=>{})).then(()=>self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => { if(event.request.method!=='GET') return; event.respondWith(fetch(event.request).then(r=>{const c=r.clone(); caches.open(CACHE_NAME).then(x=>x.put(event.request,c)).catch(()=>{}); return r;}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html')))); });
