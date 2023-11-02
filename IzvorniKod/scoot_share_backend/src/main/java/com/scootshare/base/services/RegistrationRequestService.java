package com.scootshare.base.services;

import com.scootshare.base.entities.FileDB;
import com.scootshare.base.entities.RegistrationRequest;
import com.scootshare.base.repositories.RegistrationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationRequestService {

    private final RegistrationRequestRepository registrationRequestRepository;

    @Autowired
    public RegistrationRequestService(RegistrationRequestRepository registrationRequestRepository) {
        this.registrationRequestRepository = registrationRequestRepository;
    }

    public List<RegistrationRequest> getAllRegistrationRequests() {
        return registrationRequestRepository.findAll();
    }

    /**
     * Adds a new RegistrationRequest to the database. Returns true if the new entry was added, and returns false if an
     * entry with the given email or username already exists.
     * @param registrationRequest New entry
     * @return <code>true</code> if the entry was added, <code>false</code> otherwise
     */
    public RegistrationRequest store(RegistrationRequest registrationRequest, String idCardUUID, String certificateOfNoCriminalRecordUUID) {
        registrationRequest.setIdCardUUID(idCardUUID);
        registrationRequest.setCertificateOfNoCriminalRecordUUID(certificateOfNoCriminalRecordUUID);
        return registrationRequestRepository.save(registrationRequest);
    }

    public boolean alreadyExists(RegistrationRequest registrationRequest) {
        Optional<RegistrationRequest> registrationRequestByEmail =
                registrationRequestRepository.findRegistrationRequestByEmail(registrationRequest.getEmail());
        Optional<RegistrationRequest> registrationRequestByNickname =
                registrationRequestRepository.findRegistrationRequestByNickname(registrationRequest.getNickname());

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
