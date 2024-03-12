package io.watssuggang.voda.pet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("F")
public class Food extends Item {

}
