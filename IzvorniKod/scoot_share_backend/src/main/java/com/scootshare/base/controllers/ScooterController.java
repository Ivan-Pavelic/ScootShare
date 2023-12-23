package com.scootshare.base.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scootshare.base.dto.ScooterDto;
import com.scootshare.base.entities.Listing;
import com.scootshare.base.entities.Scooter;
import com.scootshare.base.entities.User;
import com.scootshare.base.services.ScooterService;
import com.scootshare.base.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/scooters")
@RequiredArgsConstructor
public class ScooterController {

	private final ScooterService scooterService;
	private final UserService userService;
	
	@PostMapping("/add")
	public ResponseEntity<ScooterDto> addScooter(@RequestBody ScooterDto scooterDto, @AuthenticationPrincipal User user) {
		Scooter scooter = new Scooter();
		scooter.setImages(scooterDto.getImages());
		user = userService.findByEmail(user.getUsername());
		scooter.setOwner(user);
		
		scooter = scooterService.save(scooter);
		scooterDto.setId(scooter.getId());
		return ResponseEntity.ok(scooterDto);
	}
	
	@GetMapping("/{email}")
	public ResponseEntity<?> findScootersByOwner(@PathVariable String email) {
		List<Scooter> scooters = scooterService.findByOwner(userService.findByEmail(email));
		List<ScooterDto> scooterDtos = scooters.stream()
				.map((scooter) -> {
					Listing listing = null;
					try {
						listing = scooter.getListing();
					} catch (Exception e) {
					}
					return ScooterDto
							.builder()
							.images(scooter.getImages())
							.id(scooter.getId())
							.hasListing(listing != 	null)
							.build();
				})
				.collect(Collectors.toList());
		return ResponseEntity.ok(scooterDtos);
	}
}








