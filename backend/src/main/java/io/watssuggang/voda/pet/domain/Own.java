package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Own {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ownedId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static Own of(){
        return new Own();
    }

    public void purchase(Member member, Item item) {
        if (member.getOwns().contains(this)) {
            member.getOwns().add(this);
        }
        this.item = item;
        this.member = member;
    }
}
