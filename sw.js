// Kernel service worker — precaches the app shell so launches are instant
// and the app works offline. Bump VERSION whenever shipped files change.
const VERSION = 'kernel-v1';

const SHELL = [
  './',
  './index.html',
  './assets/app.css',
  './assets/app.js',
  './assets/data.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/mark.svg',
  './icons/icon-192.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

// Stale-while-revalidate for same-origin GETs: respond from cache immediately,
// refresh the cache in the background. Navigations fall back to the app shell.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(VERSION);
      const isNav = request.mode === 'navigate';
      const cached = isNav
        ? (await cache.match('./index.html')) || (await cache.match('./'))
        : await cache.match(request, { ignoreSearch: true });

      const network = fetch(request)
        .then((response) => {
          if (response.ok && response.type === 'basic') {
            cache.put(isNav ? './index.html' : request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(network);
        return cached;
      }
      const fresh = await network;
      return fresh || new Response('Offline', { status: 503, statusText: 'Offline' });
    })(),
  );
});
