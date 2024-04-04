package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.domain.File;
import io.watssuggang.voda.common.enums.Emotion;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@DiscriminatorValue("p")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetFile extends File {

    @Column(columnDefinition = "char(2)")
    private Emotion petEmotion;

    @Column(columnDefinition = "tinyint")
    private Byte petStage;

    @Builder
    public PetFile(Emotion petEmotion, Byte petStage) {
        this.petEmotion = petEmotion;
        this.petStage = petStage;
    }
}
