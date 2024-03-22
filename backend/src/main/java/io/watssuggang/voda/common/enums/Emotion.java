package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.AbstractLabelConverter;
import lombok.Getter;
 
@Getter
public enum Emotion implements LabelEnum {
    NONE("00"), JOY("01"), ANGER("02"), SADNESS("03"), FEAR("04"), CURIOSITY("05");

    private final String label;

    Emotion(String label) {
        this.label = label;
    }

    // autoApply를 활성화하여 @Convert Annotation을 명시하지 않아도 전역으로 적용 가능
    @jakarta.persistence.Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<Emotion> {

        public ConverterAbstract() {
            super(Emotion.class);
        }
    }
}
