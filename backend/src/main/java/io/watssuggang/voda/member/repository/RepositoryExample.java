package io.watssuggang.voda.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryExample extends JpaRepository<DomainExample, Long> {

}
