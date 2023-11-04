package com.scootshare.base.controllers;

import com.scootshare.base.entities.User;
import com.scootshare.base.services.RegistrationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public boolean processRegistrationRequest(@RequestBody User user
                                              //@RequestParam("idCard") MultipartFile idCard,
                                              //@RequestParam("certificateOfNoCriminalRecord") MultipartFile certificateOfNoCriminalRecord
    ) throws IOException {
        if(registrationRequestService.alreadyExists(user)) {
            return false;
        }
        //String idCardUUID = fileDBService.store(idCard).getId();
        //String certificateUUID = fileDBService.store(certificateOfNoCriminalRecord).getId();
        registrationRequestService.store(user, null, null);
        return true;
    }
}
