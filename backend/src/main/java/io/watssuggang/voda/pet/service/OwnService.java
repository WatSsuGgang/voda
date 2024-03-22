package io.watssuggang.voda.pet.service;

import io.watssuggang.voda.pet.dto.res.OwnResponse;
import io.watssuggang.voda.pet.repository.OwnRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class OwnService {

    private final OwnRepository ownRepository;

    public List<OwnResponse> getAllOwnByMember(Integer memberId) {
        return ownRepository.findAllByMember_MemberId(memberId).stream()
            .map(own -> OwnResponse.of(own.getItem()))
            .toList();
    }
}
