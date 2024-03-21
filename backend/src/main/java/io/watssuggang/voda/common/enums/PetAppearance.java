package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.AbstractLabelConverter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum PetAppearance implements LabelEnum {

    EGG("01", "달걀", Emotion.NONE),
    CHICK("02", "병아리", Emotion.NONE),
    PARROT("03", "앵무새", Emotion.JOY),
    PENGUIN("04", "펭귄", Emotion.JOY),
    DRAGON("05", "용", Emotion.JOY),
    EAGLE("06", "독수리", Emotion.FEAR),
    SHARK("07", "상어", Emotion.FEAR),
    T_REX("08", "티라노", Emotion.FEAR),
    DODO("09", "도도새", Emotion.SADNESS),
    DOVE("10", "비둘기", Emotion.SADNESS),
    WHALE("11", "고래", Emotion.SADNESS),
    CHIPMUNK("12", "다람쥐", Emotion.CURIOSITY),
    OWL("13", "부엉이", Emotion.CURIOSITY),
    SLOTH("14", "나무늘보", Emotion.CURIOSITY),
    BLACK_CAT("15", "고양이", Emotion.ANGER),
    BLACK_BIRD("16", "까마귀", Emotion.ANGER),
    GORILLA("17", "고릴라", Emotion.ANGER),
    OTTER("18", "수달", Emotion.NONE);

    private final String label;
    private final String name;
    private final Emotion emotion;

    public static PetAppearance findAppearanceByEmotionAndCount(
        Emotion emotion, boolean isEqualDiaryCount, boolean isEvenHour
    ) {
        switch (emotion) {
            case JOY -> {
                return isEqualDiaryCount ? DRAGON : isEvenHour ? PARROT : PENGUIN;
            }
            case FEAR -> {
                return isEqualDiaryCount ? T_REX : isEvenHour ? EAGLE : SHARK;
            }
            case ANGER -> {
                return isEqualDiaryCount ? GORILLA : isEvenHour ? BLACK_CAT : BLACK_BIRD;
            }
            case SADNESS -> {
                return isEqualDiaryCount ? WHALE : isEvenHour ? DODO : DOVE;
            }
            case CURIOSITY -> {
                return isEqualDiaryCount ? SLOTH : isEvenHour ? CHIPMUNK : OWL;
            }
        }
        return OTTER;
    }

    @jakarta.persistence.Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<PetAppearance> {

        public ConverterAbstract() {
            super(PetAppearance.class);
        }
    }
}
