package io.watssuggang.voda.diary.dto.res;

import io.watssuggang.voda.diary.dto.DailyInfoDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonthlyDiariesResDto {

    Integer year;
    Integer month;
    List<DailyInfoDto> calendar;
}
