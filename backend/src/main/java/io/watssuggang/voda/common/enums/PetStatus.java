package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.AbstractLabelConverter;
import lombok.Getter;

@Getter
public enum PetStatus implements LabelEnum {

    DIARY("01"), EAT("02"), HUNGRY("03"), EVOLUTION("04"), JOKE("05");

    private final String label;

    PetStatus(String label) {
        this.label = label;
    }

    @jakarta.persistence.Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<PetStatus> {

        public ConverterAbstract() {
            super(PetStatus.class);
        }
    }
}
