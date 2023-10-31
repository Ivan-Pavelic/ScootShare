package com.scootshare.base.registration;

import com.scootshare.base.registration.registrationRequest.RegistrationRequest;
import com.scootshare.base.registration.registrationRequest.RegistrationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    private final RegistrationRequestService registrationRequestService;

    @Autowired
    public RegistrationController(RegistrationRequestService registrationRequestService) {
        this.registrationRequestService = registrationRequestService;
    }

    @GetMapping("/register")
    public String getRegistrationPage() {
        // add to return registration webpage
        return null;
    }

    @PostMapping("/register")
    public boolean processRegistrationRequest() {
        //construct from params in POSTed form
        RegistrationRequest registrationRequest = null; //RegistrationRequest.of();
        return registrationRequestService.processNewRequest(registrationRequest);
    }
}
