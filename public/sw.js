const CACHE_NAME = 'wojna-v3.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalacja Service Workera
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Aktywacja Service Workera
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Obsługa requestów
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Zwróć cached response lub fetch z sieci
        return response || fetch(event.request);
      })
  );
});

