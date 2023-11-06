package com.scootshare.base.controllers;

import com.scootshare.base.entities.User;
import com.scootshare.base.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    public UserService userService;

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        if (userService.existsUser(id)){
            userService.deleteById(id);
            return ResponseEntity.ok("Deleted user with ID "+id);
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID " + id + " not found");
        }
    }
}
