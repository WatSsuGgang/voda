package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.*;
import lombok.*;

@Getter
public enum Speaker implements LabelEnum {
    USER("01"), AI("02");

    public final String label;

    Speaker(String label) {
        this.label = label;
    }

    @jakarta.persistence.Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<Speaker> {

        public ConverterAbstract() {
            super(Speaker.class);
        }
    }

}
