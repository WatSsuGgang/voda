package io.watssuggang.voda.pet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("f")
public class Frame extends Item {

}
