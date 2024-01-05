package com.scootshare.base.controllers;

import com.scootshare.base.dto.RatingDto;
import com.scootshare.base.entities.Notification;
import com.scootshare.base.entities.Rating;
import com.scootshare.base.services.NotificationService;
import com.scootshare.base.services.RatingService;
import com.scootshare.base.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;
    private final UserService userService;
    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/getRatingsReceiver/{username}")
    private List<Rating> getRatingsReceiver(@PathVariable String receiver) {
        return ratingService.getRatingsReceiver(userService.findByUsername(receiver));
    }

    @GetMapping("/getRatingsSender/{username}")
    private List<Rating> getRatingsSender(@PathVariable String sender) {
        return ratingService.getRatingsSender(userService.findByUsername(sender));
    }

    @PostMapping("/save")
    public void save(@RequestBody RatingDto ratingDto) {
        Rating rating = Rating.builder()
            .ratingSender(ratingDto.getRatingSender())
            .ratingReceiver(ratingDto.getRatingReceiver())
            .grade(ratingDto.getGrade())
            .comment(ratingDto.getComment())
            .ratingTime(ratingDto.getRatingTime())
            .build();

        ratingService.save(rating);

        Notification notification = Notification.builder()
                .receiverUsername(rating.getRatingReceiver().getUsername())
                .type("RATING")
                .build();

        notification = notificationService.save(notification);

        messagingTemplate.convertAndSend(
                "/user/" + notification.getReceiverUsername() + "/queue/notifications",
                notification);
    }
}
