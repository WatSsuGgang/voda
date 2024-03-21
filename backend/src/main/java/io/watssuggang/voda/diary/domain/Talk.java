package io.watssuggang.voda.diary.domain;

import io.watssuggang.voda.common.domain.*;
import io.watssuggang.voda.common.enums.*;
import jakarta.persistence.*;
import lombok.*;

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
    private Speaker talkSpeaker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @Builder
    public Talk(String talkContent, Speaker talkSpeaker, Diary diary) {
        this.talkContent = talkContent;
        this.talkSpeaker = talkSpeaker;
        this.diary = diary;
    }
}
