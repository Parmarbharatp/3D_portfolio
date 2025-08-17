const CACHE_NAME = 'portfolio-cache-v2';
const urlsToCache = [
  '/',
  '/desktop_pc/scene.gltf',
  '/desktop_pc/scene.bin',
  '/desktop_pc/textures/',
  '/src/assets/',
  // Add specific tech images that are having issues
  '/src/assets/tech/html.png',
  '/src/assets/tech/css.png',
  '/src/assets/tech/javascript.png',
  '/src/assets/tech/typescript.png',
  '/src/assets/tech/reactjs.png',
  '/src/assets/tech/react.png',
  '/src/assets/tech/tailwind.png',
  '/src/assets/tech/nodejs.png',
  '/src/assets/tech/expressjs.jpg',
  '/src/assets/tech/mongodb.png',
  '/src/assets/tech/java.png',
  '/src/assets/tech/git.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching tech images for better mobile performance');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.warn('Some assets failed to cache:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Special handling for tech images
  if (event.request.url.includes('/src/assets/tech/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          // If not in cache, fetch and cache it
          return fetch(event.request)
            .then((fetchResponse) => {
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch(() => {
              // Return a fallback response for failed image loads
              return new Response('', {
                status: 404,
                statusText: 'Image not found'
              });
            });
        })
    );
    return;
  }

  // Default caching strategy for other assets
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback for network errors
        if (event.request.destination === 'image') {
          return new Response('', {
            status: 404,
            statusText: 'Image not found'
          });
        }
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
