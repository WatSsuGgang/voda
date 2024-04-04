package io.watssuggang.voda.common.domain;

import io.watssuggang.voda.common.security.dto.SecurityUserDto;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class MemberAwareAudit implements AuditorAware<Integer> {

    @Override
    public Optional<Integer> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return Optional.empty();
        }
        Object principal = auth.getPrincipal();
        System.out.println("audit principal : "+principal.toString());
        if(auth == null || !auth.isAuthenticated()
            || auth.getPrincipal().equals("anonymousUser")) {
            return Optional.empty();
        }
        return Optional.of(((SecurityUserDto) principal).getMemberId());

    }
}
