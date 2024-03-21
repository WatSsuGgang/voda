package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.DiaryFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryFileRepository extends JpaRepository<DiaryFile, Integer> {

}
