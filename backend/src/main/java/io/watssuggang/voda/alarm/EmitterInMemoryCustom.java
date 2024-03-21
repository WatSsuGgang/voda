package io.watssuggang.voda.alarm;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class EmitterInMemoryCustom implements EmitterInMemory {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    // Emitter 저장
    @Override
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
        Optional.ofNullable(sseEmitter)
                .ifPresentOrElse(o -> emitters.put(emitterId, o), RuntimeException::new);
        return sseEmitter;
    }

    // 이벤트 저장
    @Override
    public void saveEventCache(String emitterId, Object event) {
        eventCache.put(emitterId, event);
    }

    // 회원과 관련된 모든 Emitter 찾기
    @Override
    public Map<String, SseEmitter> findAllEmitterStartWithById(String emitterId) {
        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(emitterId))
                .collect(Collectors.toMap(Entry::getKey, Entry::getValue));
    }

    // 회원과 관련된 모든 이벤트 찾기
    @Override
    public Map<String, Object> findAllEventCacheStartWithById(String emitterId) {
        return eventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(emitterId))
                .collect(Collectors.toMap(Entry::getKey, Entry::getValue));
    }

    // Emitter 삭제
    @Override
    public void deleteById(String emitterId) {
        emitters.remove(emitterId);
    }

    // 모든 Emitter 삭제
    @Override
    public void deleteAllEmitterStartWithId(String emitterId) {
        emitters.keySet().stream()
                .filter(o -> o.startsWith(emitterId))
                .forEach(emitters::remove);
    }

    // 회원과 관련된 이벤트 삭제
    @Override
    public void deleteAllEventCacheStartWithId(String emitterId) {
        eventCache.keySet().stream()
                .filter(o -> o.startsWith(emitterId))
                .forEach(emitters::remove);
    }
}
