package io.watssuggang.voda.diary.dto.req;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import io.watssuggang.voda.diary.dto.res.ImageResponse;
import java.util.List;
import lombok.*;

@Getter
@Data
@JsonInclude(Include.NON_ABSENT)
public class KarloResponse {


    String id;
    String model_version;
    List<ImageResponse> images;

    public KarloResponse(String id, String model_version, List<ImageResponse> images) {
        this.id = id;
        this.model_version = model_version;
        this.images = images;
    }
}
