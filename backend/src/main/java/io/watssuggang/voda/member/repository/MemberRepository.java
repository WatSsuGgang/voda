package io.watssuggang.voda.member.repository;

import io.watssuggang.voda.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByMemberEmail(String email);
    boolean existsByMemberEmailAndProvider(String email, String provider);
}
