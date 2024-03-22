package io.watssuggang.voda.common.jwt.repository;


import io.watssuggang.voda.common.jwt.dto.*;
import java.util.*;
import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

    Optional<RefreshToken> findByAccessToken(String accessToken);
}
