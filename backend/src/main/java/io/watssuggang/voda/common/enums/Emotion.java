package io.watssuggang.voda.common.enums;

import lombok.Getter;

@Getter
public enum Emotion {
    JOY("01"), ANGER("02"), SADNESS("03"), FEAR("04"), CURIOSITY("05");

    private final String label;

    Emotion(String label) {
        this.label = label;
    }
}
