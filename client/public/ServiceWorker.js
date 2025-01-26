const CACHE_NAME = "landing-page-cache-v1";
const VIDEO_URL = "/homevidnew.mp4";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(VIDEO_URL);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (event.request.url.includes(VIDEO_URL)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});