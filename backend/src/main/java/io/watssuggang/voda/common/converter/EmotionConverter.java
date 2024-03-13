package io.watssuggang.voda.common.converter;

import io.watssuggang.voda.common.enums.Emotion;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EmotionConverter implements AttributeConverter<Emotion, String> {

    @Override
    public String convertToDatabaseColumn(Emotion emotion) {
        return emotion != null ? emotion.getLabel() : null;
    }

    @Override
    public Emotion convertToEntityAttribute(String label) {
        if (label == null) {
            return null;
        }

        for (Emotion enumValue : Emotion.values()) {
            if (enumValue.getLabel().equals(label)) {
                return enumValue;
            }
        }
        throw new IllegalArgumentException("Unknown emotion label: " + label);
    }
}
