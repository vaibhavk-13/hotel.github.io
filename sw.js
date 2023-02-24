const staticCacheName = "static-v1.0.0";
const dynamicCacheName = "dynamic-v1.0.0";
const assets = [
  "/",
  "/index.html",
  "/sw.js",
  "/manifest.json",
  "/js/script.js",
  "/css/style.css",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/about-img-1.jpg",
  "/images/about-img-2.jpg",
  "/images/about-img-3.jpg",
  "/images/about-img-4.jpg",
  "/images/about-img-5.jpg",
  "/images/gallery-img-1.jpg",
  "/images/gallery-img-2.webp",
  "/images/gallery-img-3.webp",
  "/images/gallery-img-4.webp",
  "/images/gallery-img-5.webp",
  "/images/gallery-img-6.webp",
  "/images/home-img-1.jpg",
  "/images/home-img-2.jpg",
  "/images/home-img-3.jpg",
  "/images/icon-1.png",
  "/images/icon-2.png",
  "/images/icon-3.png",
  "/images/icon-4.png",
  "/images/icon-5.png",
  "/images/icon-6.png",
  "/images/pic-1.png",
  "/images/pic-2.png",
  "/images/pic-3.png",
  "/images/pic-4.png",
  "/images/pic-5.png",
  "/images/pic-6.png",
  
  


  
  
  
  
];

self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(staticCacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});