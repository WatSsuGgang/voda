package io.watssuggang.voda.pet.domain;

import io.watssuggang.voda.common.enums.ItemStatus;
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
    @Column(columnDefinition = "char(2)")
    private ItemStatus itemStatus = ItemStatus.OWNED;

    public static Own of() {
        return new Own();
    }

    /**
     * 구매 메서드
     * @apiNote 회원의 포인트를 아이템의 포인트만큼 차감시킨다.
     * 회원의 소유 목록에 추가한다.
     */
    public void purchase(Member member, Item item) {
        member.reducePoint(item.getItemPrice());
        if (!member.getOwns().contains(this)) {
            member.getOwns().add(this);
        }
        this.item = item;
        this.member = member;
    }

    public void use() {
        itemStatus = ItemStatus.USING;
    }

    public void owned() {
        itemStatus = ItemStatus.OWNED;
    }
}
