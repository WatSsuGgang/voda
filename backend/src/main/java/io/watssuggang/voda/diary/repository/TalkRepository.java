package io.watssuggang.voda.diary.repository;

import io.watssuggang.voda.diary.domain.*;
import java.util.*;
import org.springframework.data.jpa.repository.*;

public interface TalkRepository extends JpaRepository<Talk, Integer> {

    List<Talk> findAllByDiary_DiaryId(int diaryId);
}
