import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching';

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
  console.log(self.location.origin)
  console.log(self.location.origin + '/api/v1/oauth2')
  if (!event.request.url.startsWith(self.location.origin + '/api/v1/oauth2')) {
    event.respondWith(
      // 해당 요청에 대한 캐시된 응답을 찾음
      caches.match(event.request).then(function (response) {
        
        // 캐시된 응답이 존재하지 않으면 네트워크를 통해 요청을 보내고 그 결과를 반환
        return response || fetch(event.request);
      })
    );
  }
});

// 추가: 매니페스트를 프리캐시하고 라우팅
self.__WB_MANIFEST = [].concat(self.__WB_MANIFEST || []);

precacheAndRoute(self.__WB_MANIFEST);