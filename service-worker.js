const CACHE_NAME = 'fittrack-v2'; // Cambiamos la versión para forzar la actualización
const urlsToCache = [
    './', // El punto representa el directorio raíz (index.html)
    'index.html',
    'styles.css',
    'script.js',
    'manifest.json',
    'images/icons/icon-128x128.png',
    'images/icons/icon-512x512.png'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activar el Service Worker y limpiar cachés antiguas
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar las peticiones y servirlas desde la caché si es posible
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                    // Si encontramos el recurso en la caché, lo devolvemos
                    if (response) {
                        return response;
                    }
                    // Si no, intentamos obtenerlo de la red
                    return fetch(event.request);
                }
            )
    );
});