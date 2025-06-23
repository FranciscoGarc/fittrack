const CACHE_NAME = 'fittrack-v1';
const urlsToCache = [
    '/fittrack/',
    '/fittrack/index.html',
    '/fittrack/styles.css',
    '/fittrack/script.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap'
];

// Instalar el Service Worker y cachear los archivos de la app
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar las peticiones y servirlas desde la caché si es posible
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});