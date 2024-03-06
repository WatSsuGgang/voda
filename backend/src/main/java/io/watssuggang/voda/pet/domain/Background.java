package io.watssuggang.voda.pet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("b")
public class Background extends Item {

}
