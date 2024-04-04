package io.watssuggang.voda.member.domain;

import io.watssuggang.voda.common.enums.PointLogType;
import java.time.LocalDateTime;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "point_logs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointLog {

    @Id
    private String id;
    private PointLogType type;
    private Integer point;
    private String detail;
    private Integer memberId;
    private LocalDateTime createAt;

    @Builder
    public PointLog(PointLogType type, Integer point, String detail, Integer memberId,
            LocalDateTime createAt) {
        this.type = type;
        this.point = point;
        this.detail = detail;
        this.memberId = memberId;
        this.createAt = createAt;
    }

    public static PointLog ofUsePointLog(Member member, Integer point, String detail) {
        return PointLog.builder()
                .type(PointLogType.USE)
                .detail(detail)
                .point(point)
                .memberId(member.getMemberId())
                .createAt(LocalDateTime.now())
                .build();
    }

    public static PointLog ofEarnPointLog(Member member, Integer point, String detail) {
        return PointLog.builder()
                .type(PointLogType.EARN)
                .detail(detail)
                .point(point)
                .memberId(member.getMemberId())
                .createAt(LocalDateTime.now())
                .build();
    }
}
