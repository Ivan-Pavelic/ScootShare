package com.scootshare.base.controllers;

import com.scootshare.base.dto.UserDto;
import com.scootshare.base.entities.User;
import com.scootshare.base.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
    @Autowired
    public UserService userService;

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDto>> getAllUsers(){
    	List<User> users = userService.getAllUsers();
    	List<UserDto> usersDtos = users.stream()
    			.filter((user) -> !List.copyOf(user.getAuthorities()).get(0).getAuthority().equals("ROLE_ADMIN"))
    			.map((user) -> UserDto
    			.builder()
    			.firstName(user.getFirstName())
    			.lastName(user.getLastName())
    			.email(user.getEmail())
    			.nickname(user.getNickname())
    			.idCard(user.getIdCard())
    			.certificateOfNoCriminalRecord(user.getCertificateOfNoCriminalRecord())
    			.build()).collect(Collectors.toList());
        return ResponseEntity.ok(usersDtos);
    }
    
    @DeleteMapping("/deleteUser/{email}")
    public void deleteUser(@PathVariable String email) {
    	userService.deleteByEmail(email);
    }
}
