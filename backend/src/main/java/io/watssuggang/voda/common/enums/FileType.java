package io.watssuggang.voda.common.enums;

import io.watssuggang.voda.common.converter.AbstractLabelConverter;
import lombok.Getter;

/**
 * 알파벳 3글자로 정의할 것
 */
@Getter
public enum FileType implements LabelEnum {
    IMG("01"), GIF("02"), MP3("03"), WEBP("04");

    private final String label;

    FileType(String label) {
        this.label = label;
    }

    @jakarta.persistence.Converter(autoApply = true)
    static class ConverterAbstract extends AbstractLabelConverter<FileType> {

        public ConverterAbstract() {
            super(FileType.class);
        }
    }
}
