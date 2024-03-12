package io.watssuggang.voda.pet.domain;


import jakarta.persistence.*;

@Entity
@DiscriminatorValue("E")
public class Effect extends Item {

}
