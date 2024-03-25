package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.AbstractLabelConverter;
import jakarta.persistence.Converter;
import lombok.Getter;

@Getter
public enum ItemStatus implements LabelEnum {

    USING("01"), OWNED("02");

    public final String label;

    ItemStatus(String label) {
        this.label = label;
    }

    @Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<ItemStatus> {

        public ConverterAbstract() {
            super(ItemStatus.class);
        }
    }
}
