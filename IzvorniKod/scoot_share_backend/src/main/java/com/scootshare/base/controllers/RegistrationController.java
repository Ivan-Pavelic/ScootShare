package com.scootshare.base.controllers;

import com.scootshare.base.entities.RegistrationRequest;
import com.scootshare.base.services.RegistrationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public boolean processRegistrationRequest(@RequestBody RegistrationRequest registrationRequest) {
        //construct from params in POSTed form
        return registrationRequestService.processNewRequest(registrationRequest);
    }
}
