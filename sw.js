const CACHE = 'riverturn-shell-v1';
const ASSETS = ['./index.html', './style.css', './app.js', './logo.svg', './hero.svg', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('riverturn-shell-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const {request} = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => (await caches.open(CACHE)).match('./index.html')));
    return;
  }
  const bundled = ASSETS.some(asset => new URL(asset, self.registration.scope).href === request.url);
  if (bundled) event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(request)) || fetch(request)));
});
