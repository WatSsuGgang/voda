package io.watssuggang.voda.pet.controller;

import io.watssuggang.voda.common.security.annotation.CurrentUser;
import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import io.watssuggang.voda.pet.dto.res.OwnResponse;
import io.watssuggang.voda.pet.service.OwnService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/own")
public class OwnController {

    private final OwnService ownService;

    @PatchMapping("/use/{own-id}")
    public ResponseEntity<OwnResponse> useItem(
            @CurrentUser SecurityUserDto userDto,
            @PathVariable(name = "own-id") Integer ownId
    ) {
        OwnResponse ownResponse = ownService.usingItem(userDto, ownId);
        return ResponseEntity.ok(ownResponse);
    }

    @PatchMapping("/unuse")
    public ResponseEntity<Void> unUseItems(
            @CurrentUser SecurityUserDto userDto,
            @RequestBody List<Integer> ownIds
    ) {
        ownService.unUseItems(userDto, ownIds);
        return ResponseEntity.noContent().build();
    }
}
