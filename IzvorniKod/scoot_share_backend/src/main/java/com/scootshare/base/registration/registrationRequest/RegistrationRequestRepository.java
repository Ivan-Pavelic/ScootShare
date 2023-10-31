package com.scootshare.base.registration.registrationRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Long> {

    @Query(value = "SELECT request FROM RegistrationRequest request WHERE request.email = ?1")
    Optional<RegistrationRequest> findRegistrationRequestByEmail(String email);

    @Query(value = "SELECT request FROM RegistrationRequest request WHERE request.nickname = ?1")
    Optional<RegistrationRequest> findRegistrationRequestByNickname(String nickname);
}