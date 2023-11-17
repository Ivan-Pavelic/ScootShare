package com.scootshare.base.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scootshare.base.dto.UpdateUserDto;
import com.scootshare.base.dto.UserDto;
import com.scootshare.base.entities.User;
import com.scootshare.base.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("{email}")
	public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
		User user = userService.findByEmail(email);
		UserDto userDto = UserDto.builder()
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
				.email(user.getEmail())
				.nickname(user.getNickname())
				.cardNumber(user.getCardNumber())
				.build();
		return ResponseEntity.ok(userDto);
	}
	
	@PutMapping("{email}")
	public void updateUser(@RequestBody UpdateUserDto userDto) {
		User user = userService.findByEmail(userDto.getEmail());
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setNickname(userDto.getNickname());
		user.setCard(userDto.getCardNumber());
		if (!userDto.getPassword().equals("")) {
			user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		}
		userService.store(user);
	}
}
