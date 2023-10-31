package com.scootshare.base.registration.registrationRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public boolean processNewRequest(RegistrationRequest registrationRequest) {
        if(getAllRegistrationRequests().contains(registrationRequest)) {
            return false;
        }
        registrationRequestRepository.save(registrationRequest);
        return true;
    }
}
