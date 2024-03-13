package io.watssuggang.voda.common.converter;

import io.watssuggang.voda.common.enums.LabelEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.Objects;
import lombok.RequiredArgsConstructor;

@Converter
@RequiredArgsConstructor
public abstract class AbstractLabelConverter<T extends Enum<T> & LabelEnum>
        implements AttributeConverter<T, String> {

    // Class를 이용하여 Enum 객체 주입 받아 사용
    private final Class<T> clazz;

    // enum의 이름에서 label명으로 변경하는 메서드
    public String convertToDatabaseColumn(T attribute) {
        return attribute.getLabel();
    }

    @Override
    public T convertToEntityAttribute(String label) {
        if (Objects.isNull(label)) {
            return null;
        }

        // enum 값들 순회하며 찾고자하는 label과 일치하는 값을 찾아 반환
        return Arrays.stream(clazz.getEnumConstants())
                .filter(e -> e.getLabel().equals(label))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown Label: " + label));
    }
}