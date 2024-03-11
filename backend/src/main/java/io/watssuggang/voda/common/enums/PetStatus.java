package io.watssuggang.voda.common.enums;

import lombok.Getter;

@Getter
public enum PetStatus {

    DIARY("01"), EAT("02"), HUNGRY("03"), REVOLUTION("04"), JOKE("05");

    private final String label;

    PetStatus(String label) {
        this.label = label;
    }
}
