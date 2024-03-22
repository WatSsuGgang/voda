package io.watssuggang.voda.member.service;

import io.watssuggang.voda.member.domain.*;
import io.watssuggang.voda.member.dto.req.*;

public interface MemberService {

    Member findByEmail(String uid);

    Integer signUp(SignUpRequest signUpRequest);
}
