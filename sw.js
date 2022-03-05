// URL: https://github.com/marcushellberg/alternative-news/blob/master/sw.js

// SW is only triggered by events!
// SW should cache all our static assets to make them available offline
// defined array of static assets
const staticAssets = [
    './',
    './style.css',
    './app.js',
    './manifest.json',
    './fallback.json',
    './images/fetch-dog.jpg'
];

self.addEventListener('install', async e => {
    console.log('install', e);
    await caches.open('news-static').then(cache => {
        cache.addAll(staticAssets);
    });
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// Events sent from application to network
// Intercepting fetch events
self.addEventListener('fetch', e => {
    console.log('fetch successfully intercepted', e);
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    // Fetch request from network if not cached
    return cachedResponse || fetch(req);
}

async function networkFirst(request) {
    const dynamicCache = await caches.open('news-dynamic');
    try {
        console.log('fetching network response');
        const networkResponse = await fetch(request);
        await dynamicCache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.log('using fallback network response', error);
        // If new items could not be loaded use fallback response
        const cachedResponse = await dynamicCache.match(request);
        return cachedResponse || caches.match('./fallback.json');
    }
}

