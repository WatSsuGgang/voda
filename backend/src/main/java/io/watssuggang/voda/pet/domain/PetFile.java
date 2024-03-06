package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.domain.File;
import io.watssuggang.voda.common.enums.Emotion;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@DiscriminatorValue("p")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetFile extends File {

    private Emotion petEmotion;

    @Column(columnDefinition = "tinyint")
    private Byte petStage;

    @Builder
    public PetFile(Emotion petEmotion, Byte petStage) {
        this.petEmotion = petEmotion;
        this.petStage = petStage;
    }
}
