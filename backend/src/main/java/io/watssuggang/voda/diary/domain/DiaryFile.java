package io.watssuggang.voda.diary.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.watssuggang.voda.common.domain.File;
import io.watssuggang.voda.common.enums.FileType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("d")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
public class DiaryFile extends File {

    @ManyToOne
    @JoinColumn(name = "diary_id")
    @JsonIgnore
    private Diary diary;

    public void addDiary(Diary diary) {
        if (diary.getDiaryFiles().contains(this)) {
            diary.getDiaryFiles().add(this);
        }
        this.diary = diary;
    }

    @Builder
    public DiaryFile(FileType fileType, String fileUrl) {
        this.setFileType(fileType);
        this.setFileUrl(fileUrl);
    }
}
