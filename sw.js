const cacheName = 'news-v1';

// SW is only triggered by events!
// SW should cache all our static assets

// defined array of static assets
const staticAssets = [
    './',
    './styles.css',
    './app.js'
];

self.addEventListener('install', async e => {
    console.log('install', e);
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
});

// Events sent from application to network
// Intercepting fetch events
self.addEventListener('fetch', e => {
    console.log('fetch', e);
    const req = e.request;
    e.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    // Fallback if not cached
    return cachedResponse || fetch(req);
}

