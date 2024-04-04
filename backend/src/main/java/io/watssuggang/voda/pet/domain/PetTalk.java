package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.PetStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"petTalk", "petStatus"})})
public class PetTalk extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petTalkId;
    @NotNull
    @Column(length = 30)
    private String petTalk;
    @Column(columnDefinition = "char(2)")
    private PetStatus petStatus;

    @Builder
    public PetTalk(String petTalk, PetStatus petStatus) {
        this.petTalk = petTalk;
        this.petStatus = petStatus;
    }
}
