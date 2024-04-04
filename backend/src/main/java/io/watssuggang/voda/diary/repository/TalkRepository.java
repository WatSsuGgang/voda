package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.Talk;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TalkRepository extends JpaRepository<Talk, Integer> {

    List<Talk> findAllByDiary_DiaryId(int diaryId);
}
