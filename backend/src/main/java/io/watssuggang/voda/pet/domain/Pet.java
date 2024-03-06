package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Pet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petId;

    @Column(columnDefinition = "char(20)", length = 20)
    private String petName;

    @Column(columnDefinition = "tinyint")
    private Byte petStage;

    @Column(columnDefinition = "tinyint")
    private Byte petLevel;

    @Column(columnDefinition = "tinyint")
    private Byte petExp;

    @Column(columnDefinition = "char(2)")
    private Emotion petEmotion;

    private String petDiaryUrl;

    private LocalDateTime petLastFeed;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Pet(String petName, Byte petStage, Byte petLevel, Byte petExp, Emotion petEmotion,
        String petDiaryUrl, LocalDateTime petLastFeed, Member member) {
        this.petName = petName;
        this.petStage = petStage;
        this.petLevel = petLevel;
        this.petExp = petExp;
        this.petEmotion = petEmotion;
        this.petDiaryUrl = petDiaryUrl;
        this.petLastFeed = petLastFeed;
        this.member = member;
    }
}
