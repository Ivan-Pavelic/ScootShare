package com.scootshare.base.dto;

import com.scootshare.base.entities.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingDto {
    private User ratingSender;
    private User ratingReceiver;
    private int grade;
    private String comment;
    private Date ratingTime;
}
