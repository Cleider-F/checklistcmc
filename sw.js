const CACHE_NAME = "cmc-v1";

self.addEventListener("install", event => {
  console.log("SW instalado");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/navbar.css",
        "/sugestoes_descricoes.html",
        "/xlsx.full.min.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
