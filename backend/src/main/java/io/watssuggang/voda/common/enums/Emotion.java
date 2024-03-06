package io.watssuggang.voda.common.enums;

public enum Emotion {
    JOY("01"), ANGER("02"), SADNESS("03"), FEAR("04"), CURIOSITY("05");

    public final String label;

    Emotion(String label) {
        this.label = label;
    }
}
