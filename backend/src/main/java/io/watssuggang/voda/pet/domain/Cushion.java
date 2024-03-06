package io.watssuggang.voda.pet.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("c")
public class Cushion extends Item {

}
