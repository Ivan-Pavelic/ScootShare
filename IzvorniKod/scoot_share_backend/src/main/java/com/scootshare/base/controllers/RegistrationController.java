package com.scootshare.base.controllers;

import com.scootshare.base.entities.User;
import com.scootshare.base.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class RegistrationController {

    private final UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
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
        if(userService.alreadyExists(user)) {
            return false;
        }
        //String idCardUUID = fileDBService.store(idCard).getId();
        //String certificateUUID = fileDBService.store(certificateOfNoCriminalRecord).getId();
        userService.store(user);
        return true;
    }
}
