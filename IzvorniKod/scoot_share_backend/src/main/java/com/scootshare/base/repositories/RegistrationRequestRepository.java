package com.scootshare.base.repositories;

import com.scootshare.base.entities.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Long> {

    Optional<RegistrationRequest> findRegistrationRequestByEmail(String email);

    Optional<RegistrationRequest> findRegistrationRequestByNickname(String nickname);
}
