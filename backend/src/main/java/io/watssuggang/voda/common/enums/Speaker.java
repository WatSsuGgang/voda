package io.watssuggang.voda.common.enums;

public enum Speaker {
    USER("01"), AI("02");

    public final String label;

    Speaker(String label) {
        this.label = label;
    }
}
