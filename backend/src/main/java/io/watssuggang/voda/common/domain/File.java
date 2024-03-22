package io.watssuggang.voda.common.domain;

import io.watssuggang.voda.common.enums.FileType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.CHAR, name = "domain_type")
@DiscriminatorValue("f")
@Getter
public class File extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileId;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "CHAR(3)")
    @Setter
    private FileType fileType;

    @Setter
    private String fileUrl;
}
