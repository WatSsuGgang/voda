package io.watssuggang.voda.diary.dto.req;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryTerminateRequestDto {

    private Integer diaryId;
}
