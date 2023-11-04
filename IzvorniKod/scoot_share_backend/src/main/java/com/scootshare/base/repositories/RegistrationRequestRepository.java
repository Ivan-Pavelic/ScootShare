package com.scootshare.base.repositories;

import com.scootshare.base.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationRequestRepository extends JpaRepository<User, Long> {

    Optional<User> findRegistrationRequestByEmail(String email);

    Optional<User> findRegistrationRequestByNickname(String nickname);
}
