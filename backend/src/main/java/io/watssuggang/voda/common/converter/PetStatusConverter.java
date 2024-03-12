package io.watssuggang.voda.common.converter;

import io.watssuggang.voda.common.enums.PetStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PetStatusConverter implements AttributeConverter<PetStatus, String> {

    @Override
    public String convertToDatabaseColumn(PetStatus petStatus) {
        return petStatus != null ? petStatus.getLabel() : null;
    }

    @Override
    public PetStatus convertToEntityAttribute(String label) {
        if (label == null) {
            return null;
        }

        for (PetStatus enumValue : PetStatus.values()) {
            if (enumValue.getLabel().equals(label)) {
                return enumValue;
            }
        }
        throw new IllegalArgumentException("Unknown petStatus label: " + label);
    }
}
