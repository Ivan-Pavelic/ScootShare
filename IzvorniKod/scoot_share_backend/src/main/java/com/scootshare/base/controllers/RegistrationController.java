package com.scootshare.base.controllers;

import com.scootshare.base.entities.FileDB;
import com.scootshare.base.entities.RegistrationRequest;
import com.scootshare.base.services.FileDBService;
import com.scootshare.base.services.RegistrationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class RegistrationController {

    private final RegistrationRequestService registrationRequestService;
    private final FileDBService fileDBService;

    @Autowired
    public RegistrationController(RegistrationRequestService registrationRequestService, FileDBService fileDBService) {
        this.registrationRequestService = registrationRequestService;
        this.fileDBService = fileDBService;
    }

    @GetMapping("/register")
    public String getRegistrationPage() {
        // add to return registration webpage
        return null;
    }

    @PostMapping("/register")
    public boolean processRegistrationRequest(@RequestBody RegistrationRequest registrationRequest,
                                              @RequestParam("idCard") MultipartFile idCard,
                                              @RequestParam("certificateOfNoCriminalRecord") MultipartFile certificateOfNoCriminalRecord) throws IOException {
        if(registrationRequestService.alreadyExists(registrationRequest)) {
            return false;
        }
        String idCardUUID = fileDBService.store(idCard).getId();
        String certificateUUID = fileDBService.store(certificateOfNoCriminalRecord).getId();
        registrationRequestService.store(registrationRequest, idCardUUID, certificateUUID);
        return true;
    }
}
