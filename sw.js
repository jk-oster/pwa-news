const cacheName = 'news-v1';

// SW is only triggered by events!
// SW should cache all our static assets

// defined array of static assets
const staticAssets = ['./','./styles.css','./app.js']

self.addEventListener('install', async function () {
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => console.log('fetch', e));

