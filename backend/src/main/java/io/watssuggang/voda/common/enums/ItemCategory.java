package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.AbstractLabelConverter;
import lombok.Getter;

@Getter
public enum ItemCategory implements LabelEnum {

    FOOD("01"), EFFECT("02");
    private final String label;

    ItemCategory(String label) {
        this.label = label;
    }

    @jakarta.persistence.Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<ItemCategory> {

        public ConverterAbstract() {
            super(ItemCategory.class);
        }
    }
}
