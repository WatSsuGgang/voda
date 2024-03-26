package io.watssuggang.voda.member.service;

import io.watssuggang.voda.member.domain.Member;
import io.watssuggang.voda.member.dto.req.SignUpRequest;

public interface MemberService {

    Member findByEmail(String uid);

    Integer signUp(SignUpRequest signUpRequest);

    void updateMemberCount();
}
