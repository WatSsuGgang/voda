package io.watssuggang.voda.common.config;

import io.watssuggang.voda.common.domain.MemberAwareAudit;
import org.springframework.data.domain.AuditorAware;

//@Configuration
public class AuditConfig {

    //  @Bean
    public AuditorAware<Integer> auditorProvider() { // 등록자와 수정자를 처리해주는 AuditorAware을 빈으로 등록
        return new MemberAwareAudit();
    }
}
