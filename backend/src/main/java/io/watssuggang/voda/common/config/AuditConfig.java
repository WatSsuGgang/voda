package io.watssuggang.voda.common.config;

import io.watssuggang.voda.common.domain.MemberAwareAudit;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
public class AuditConfig {

    public AuditorAware<Integer> auditorProvider() { // 등록자와 수정자를 처리해주는 AuditorAware을 빈으로 등록
        System.out.println("audit bean in");
        return new MemberAwareAudit();
    }
}
