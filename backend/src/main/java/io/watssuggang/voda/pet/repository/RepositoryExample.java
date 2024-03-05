package io.watssuggang.voda.pet.repository;

import io.watssuggang.voda.pet.domain.DomainExample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryExample extends JpaRepository<DomainExample, Long> {
}
