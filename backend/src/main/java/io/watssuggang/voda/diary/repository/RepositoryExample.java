package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.DomainExample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryExample extends JpaRepository<DomainExample, Long> {
}
