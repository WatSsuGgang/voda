package io.watssuggang.voda.pet.domain;

import static io.watssuggang.voda.common.constant.Constant.MAX_EXP;
import static io.watssuggang.voda.common.constant.Constant.MAX_STAGE1_LEVEL;
import static io.watssuggang.voda.common.constant.Constant.MAX_STAGE2_LEVEL;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.common.enums.PetAppearance;
import io.watssuggang.voda.member.domain.Member;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Optional;
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

    @Column(columnDefinition = "char(2)")
    private Emotion petEmotion = Emotion.JOY;

    @Column(columnDefinition = "char(2)")
    private PetAppearance petAppearance = PetAppearance.EGG;

    private LocalDateTime petLastFeed = LocalDateTime.now();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void addPet(Member member) {
        this.member = member;
    }

    public void updateExp(Byte exp) {
        int plus = exp + this.petExp;
        if (plus <= Byte.MAX_VALUE) {
            this.petExp = (byte) plus;
        }

        this.petLastFeed = LocalDateTime.now();
    }

    public Optional<Byte> levelUp() {
        if (this.petExp >= MAX_EXP) {
            this.petExp = (byte) (this.petExp - MAX_EXP);
            this.petLevel++;
            if (this.petLevel.equals(MAX_STAGE1_LEVEL) ||
                    this.petLevel.equals(MAX_STAGE2_LEVEL)) {
                return Optional.of(++this.petStage);
            }
            return Optional.of(this.petStage);
        }

        return Optional.empty();
    }

    public void updateAppearance(PetAppearance petAppearance) {
        this.petAppearance = petAppearance;
    }

    @Builder
    public Pet(String petName) {
        this.petName = petName;
    }

    public void updateName(String name) {
        this.petName = name;
    }
}
