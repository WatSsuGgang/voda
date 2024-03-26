const CACHE_NAME = "cache-v1";

const FILES_TO_CACHE = ["/offline.html", "/favicon.ico"];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
});

// CACHE_NAME이 변경되면 오래된 캐시 삭제
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (CACHE_NAME !== key) return caches.delete(key);
                })
            )
        )
    );
});

// Service Worker가 fetch 이벤트 핸들러에서 로그인 URI를 필터링하여 처리하지 않도록
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin + '/api/v1/oauth2')) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});