package io.watssuggang.voda.diary.dto.res;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@JsonInclude(Include.NON_ABSENT)
public class ImageResponse {

    private final String id;
    private final String image;
    private final Long seed;
    private final Boolean nsfwContentDetected;
    private final Boolean nsfwScore;
}
