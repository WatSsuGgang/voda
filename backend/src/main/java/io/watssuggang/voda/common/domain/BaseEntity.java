package io.watssuggang.voda.common.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter

public abstract class BaseEntity {

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @CreatedBy
    @Column(updatable = false)
    private Integer writer;

    @LastModifiedBy
    private Integer modifier;
}
