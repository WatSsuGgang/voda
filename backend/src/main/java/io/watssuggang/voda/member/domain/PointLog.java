package io.watssuggang.voda.member.domain;

import io.watssuggang.voda.common.domain.BaseEntity;
import io.watssuggang.voda.common.enums.PointLogType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@NoArgsConstructor
public class PointLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pointLogId;

    private PointLogType pointLogType;

    private Integer point;

    private String pointLogDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public PointLog(PointLogType pointLogType, Integer point, String pointLogDetail,
        Member member) {
        this.point = point;
        this.pointLogType = pointLogType;
        this.pointLogDetail = pointLogDetail;
        this.member = member;
    }

}
