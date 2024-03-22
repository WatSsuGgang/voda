package io.watssuggang.voda.diary.dto.req;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryAnswerRequestDto {

    private Integer diaryId;
    private MultipartFile file;
}
