package io.watssuggang.voda.alarm;

import io.watssuggang.voda.common.exception.BaseException;
import io.watssuggang.voda.common.exception.ErrorCode;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final EmitterInMemory emitterInMemory = new EmitterInMemoryCustom();
    private AtomicLong atomicLong = new AtomicLong(0);

    public SseEmitter subscribe(Integer memberId, String lastEventId) {
        String emitterId = createEmitterId(memberId);
        SseEmitter emitter = createEmitter(emitterId);
        if (hasLostData(lastEventId)) {
            sendLostData(memberId, lastEventId, emitter);
        }

        return emitter;
    }


    private String createEmitterId(Integer memberId) {
        String emitterId = memberId + "_" + System.currentTimeMillis();
        log.info("emitterId : {}", emitterId);
        return emitterId;
    }

    private SseEmitter createEmitter(String emitterId) {
        SseEmitter emitter = emitterInMemory.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            emitterInMemory.deleteById(emitterId);
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        sendToClient(emitter, emitterId,
                "EventStream Created. [memberId=" + emitterId.split("_")[0] + "] connected !");
        log.info("first connection EventStream Created");
        return emitter;
    }

    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(emitterId)
                    .name("message")
                    .data(data));
        } catch (IOException exception) {
            log.info("IOException" + exception.getMessage());
            emitterInMemory.deleteById(emitterId);
            throw new BaseException(ErrorCode.DUPLICATE_ITEM_NAME);
        }
    }

    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    private void sendLostData(Integer memberId, String lastEventId, SseEmitter emitter) {
        Map<String, Object> events =
                emitterInMemory.findAllEventCacheStartWithById(String.valueOf(memberId));
        events.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendToClient(emitter, entry.getKey(), null));
    }

    public void count(String lastEventId) {
        long l = atomicLong.incrementAndGet();
        Map<String, SseEmitter> emitterStartWithById = emitterInMemory.findAllEmitterStartWithById(
                lastEventId);
        emitterStartWithById.values().forEach(sseEmitter ->
                sendToClient(sseEmitter, lastEventId, l)
        );
    }
}
