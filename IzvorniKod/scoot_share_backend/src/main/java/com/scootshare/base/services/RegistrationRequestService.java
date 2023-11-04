package com.scootshare.base.services;

import com.scootshare.base.entities.User;
import com.scootshare.base.repositories.RegistrationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationRequestService {

    private final RegistrationRequestRepository registrationRequestRepository;

    @Autowired
    public RegistrationRequestService(RegistrationRequestRepository registrationRequestRepository) {
        this.registrationRequestRepository = registrationRequestRepository;
    }

    public List<User> getAllRegistrationRequests() {
        return registrationRequestRepository.findAll();
    }

    /**
     * Adds a new RegistrationRequest to the database. Returns true if the new entry was added, and returns false if an
     * entry with the given email or username already exists.
     * @param user New entry
     * @return <code>true</code> if the entry was added, <code>false</code> otherwise
     */
    public User store(User user, byte[] idCardUUID, byte[] certificateOfNoCriminalRecord) {
        user.setIdCard(idCardUUID);
        user.setCertificateOfNoCriminalRecord(certificateOfNoCriminalRecord);
        return registrationRequestRepository.save(user);
    }

    public boolean alreadyExists(User user) {
        Optional<User> registrationRequestByEmail =
                registrationRequestRepository.findRegistrationRequestByEmail(user.getEmail());
        Optional<User> registrationRequestByNickname =
                registrationRequestRepository.findRegistrationRequestByNickname(user.getNickname());

        // change to indicate which part combination is already taken
        // HTTP codes?
        if(registrationRequestByEmail.isPresent() && registrationRequestByNickname.isPresent()) {
            return true;
        }
        else if(registrationRequestByEmail.isPresent()) {
            return true;
        }
        else if(registrationRequestByNickname.isPresent()) {
            return true;
        }

        return false;
    }
}
