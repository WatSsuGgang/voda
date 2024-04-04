package io.watssuggang.voda.member.repository;

import io.watssuggang.voda.common.enums.PointLogType;
import io.watssuggang.voda.member.domain.PointLog;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointLogRepository extends MongoRepository<PointLog, String> {

    List<PointLog> findAllByMemberIdAndType(Integer memberId, PointLogType type);
}
