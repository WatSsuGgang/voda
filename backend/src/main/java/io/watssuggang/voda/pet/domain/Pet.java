package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.converter.EmotionConverter;
import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.member.domain.Member;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petId;

    @Column(columnDefinition = "char(20)", length = 20)
    private String petName;

    @Column(columnDefinition = "tinyint")
    private Byte petStage = 1;

    @Column(columnDefinition = "tinyint")
    private Byte petLevel = 1;

    @Column(columnDefinition = "tinyint")
    private Byte petExp = 0;

    @Convert(converter = EmotionConverter.class)
    @Column(columnDefinition = "char(2)")
    private Emotion petEmotion = Emotion.JOY;

    private LocalDateTime petLastFeed = LocalDateTime.now();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void addPet(Member member) {
        this.member = member;
    }

    public void updateExp(Byte exp){
        int plus = exp + this.petExp;
        if(plus < 128) {
            this.petExp = (byte) plus;
        }

        this.petLastFeed = LocalDateTime.now();
    }

    @Builder
    public Pet(String petName) {
        this.petName = petName;
    }
}
