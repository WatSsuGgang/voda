package io.watssuggang.voda.diary.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Talk extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer talkId;

    @Column(columnDefinition = "text")
    private String talkContent;

    @Column(columnDefinition = "char(2)", length = 2)
    private String talkSpeaker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @Builder
    public Talk(String talkContent, String talkSpeaker, Diary diary) {
        this.talkContent = talkContent;
        this.talkSpeaker = talkSpeaker;
        this.diary = diary;
    }
}
