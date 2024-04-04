package io.watssuggang.voda.alarm;

import java.util.Map;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterInMemory {

    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void saveEventCache(String emitterId, Object event);

    Map<String, SseEmitter> findAllEmitterStartWithById(String emitterId);

    Map<String, Object> findAllEventCacheStartWithById(String emitterId);

    void deleteById(String emitterId);

    void deleteAllEmitterStartWithId(String emitterId);

    void deleteAllEventCacheStartWithId(String emitterId);
}