package io.watssuggang.voda.common.domain;

import io.watssuggang.voda.common.enums.FileType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Setter;

@Entity
@MappedSuperclass
public class File extends BaseEntity {

    @Id
    @GeneratedValue
    private Integer fileId;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "CHAR(3)")
    private FileType fileType;

    @Setter
    private String fileUrl;
}
