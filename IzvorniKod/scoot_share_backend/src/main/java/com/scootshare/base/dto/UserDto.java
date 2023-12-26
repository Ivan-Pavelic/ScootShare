package com.scootshare.base.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class UserDto {

	private String firstName;
	private String lastName;
	private String email;
	private String nickname;
	private String idCard;
	private String cardNumber;
	private String certificateOfNoCriminalRecord;
	private String authority;
	private String username;
}
