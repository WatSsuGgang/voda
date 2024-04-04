package io.watssuggang.voda.member.service;

import io.watssuggang.voda.common.enums.PointLogType;
import io.watssuggang.voda.member.domain.PointLog;
import io.watssuggang.voda.member.repository.PointLogRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointLogService {

    private final PointLogRepository pointLogRepository;

    public void makePointLog(PointLog pl) {
        pointLogRepository.save(pl);
    }

    public List<PointLog> selectAll(Integer memberId, PointLogType pointLogType) {
        return pointLogRepository.findAllByMemberIdAndType(memberId, pointLogType);
    }
}
