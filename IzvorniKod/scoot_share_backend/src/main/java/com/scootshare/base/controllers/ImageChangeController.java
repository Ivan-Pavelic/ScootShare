package com.scootshare.base.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scootshare.base.entities.ImageChangeRequest;
import com.scootshare.base.entities.Notification;
import com.scootshare.base.entities.User;
import com.scootshare.base.services.ImageChangeRequestService;
import com.scootshare.base.services.NotificationService;
import com.scootshare.base.services.ScooterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/imageChanges")
@RequiredArgsConstructor
public class ImageChangeController {

	private final ImageChangeRequestService imageChangeRequestService;
	private final SimpMessagingTemplate messagingTemplate;
	private final ScooterService scooterService;
	private final NotificationService notificationService;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveImageChangeRequest(@RequestBody ImageChangeRequest imageChangeRequest, @AuthenticationPrincipal User user) {
		imageChangeRequest = imageChangeRequestService.save(imageChangeRequest);
		
		User scooterOwner = scooterService.findById(imageChangeRequest.getScooterId()).getOwner();
		
		Notification notification = Notification.builder()
				.receiverUsername(scooterOwner.getUsername())
				.senderUsername(user.getUsername())
				.type("IMAGE_CHANGE_REQUEST")
				.build();
		
		notification = notificationService.save(notification);
		messagingTemplate.convertAndSend(
				"/user/" + scooterOwner.getUsername() + "/queue/notifications",
				notification);
		
		notification = Notification.builder()
				.receiverUsername("admin")
				.senderUsername(user.getUsername())
				.type("IMAGE_CHANGE_REQUEST_ADMIN")
				.build();
		
		notification = notificationService.save(notification);
		messagingTemplate.convertAndSend(
				"/user/admin/queue/notifications",
				notification);
		
		return ResponseEntity.ok(imageChangeRequest);
	}
}
