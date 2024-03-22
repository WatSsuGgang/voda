package io.watssuggang.voda.diary.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.Emotion;
import io.watssuggang.voda.member.domain.Member;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer diaryId;

    @Column(columnDefinition = "text")
    private String diaryContent;

    @Column(columnDefinition = "text")
    private String diarySummary;

    @Column(columnDefinition = "char(2)", length = 2)
    private Emotion diaryEmotion;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "diary")
    List<DiaryFile> diaryFiles = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "diary")
    List<Talk> diaryTalks = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    Member member;

    public void addMember(Member member) {
        if (member.getDiaries().contains(this)) {
            member.getDiaries().add(this);
        }
        this.member = member;
    }

    public void addDiaryFiles(DiaryFile diaryFile) {
        this.diaryFiles.add(diaryFile);
    }

    public void addDiaryTalks(Talk talk) {
        this.diaryTalks.add(talk);
    }

    @Builder
    public Diary(int diaryId, String diaryContent, String diarySummary, Emotion diaryEmotion,
        Member member) {
        this.diaryId = diaryId;
        this.diaryContent = diaryContent;
        this.diarySummary = diarySummary;
        this.diaryEmotion = diaryEmotion;
        this.member = member;
    }
}
