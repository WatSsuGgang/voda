package io.watssuggang.voda.member.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.diary.domain.Diary;
import io.watssuggang.voda.pet.domain.Item;
import io.watssuggang.voda.pet.domain.Pet;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberId;

    @Column(columnDefinition = "char(20)", length = 20)
    @Setter
    private String memberName;

    @Setter
    private String provider;

    @Setter
    private String memberEmail;

    @Setter
    private String userRole;

    @Setter
    private Integer memberPoint;

    @Setter
    private Integer memberDiaryCount;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<Diary> diaries = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<PointLog> pointLogs = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.PERSIST)
    private Pet pet;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<Item> items = new ArrayList<>();

    public void addDiaries(Diary diary) {
        this.diaries.add(diary);
    }

    public void addPointLogs(PointLog pointLog) {
        this.pointLogs.add(pointLog);
    }

    public void addPet(Pet pet) {
        this.pet = pet;
        pet.addPet(this);
    }

    @Builder
    public Member(String memberName, String provider, String memberEmail, String userRole,
        Integer memberPoint, Integer memberDiaryCount, Pet pet) {
        this.memberName = memberName;
        this.provider = provider;
        this.memberEmail = memberEmail;
        this.userRole = userRole;
        this.memberPoint = memberPoint;
        this.memberDiaryCount = memberDiaryCount;
        this.pet = pet;
    }
}
