package io.watssuggang.voda.alarm;

import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(
            @AuthenticationPrincipal SecurityUserDto userDto,
            @RequestHeader(value = "lastEventId", required = false, defaultValue = "") String lastEventId
    ) {
        return notificationService.subscribe(userDto.getMemberId(), lastEventId);
    }

    @PostMapping("/count")
    public ResponseEntity<Void> sendCount(
            @AuthenticationPrincipal SecurityUserDto userDto,
            @RequestHeader(value = "lastEventId", required = false, defaultValue = "") String lastEventId
    ) {
        notificationService.count(lastEventId);
        return ResponseEntity.ok().build();
    }
}
