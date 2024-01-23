package com.scootshare.base.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;

import com.scootshare.base.config.JwtService;
import com.scootshare.base.services.ListingService;
import com.scootshare.base.services.NotificationService;
import com.scootshare.base.services.RatingService;
import com.scootshare.base.services.ScooterService;
import com.scootshare.base.services.UserService;

@WebMvcTest(controllers = ListingController.class)
@AutoConfigureMockMvc(addFilters = false)
public class RatingControllerTest {

	@MockBean
	private RatingService ratingService;
	@MockBean
    private UserService userService;
	@MockBean
	private NotificationService notificationService;
	@MockBean
    private SimpMessagingTemplate messagingTemplate;
	@MockBean
	private JwtService jwtService;
	@MockBean
	private ListingService listingService;
	@MockBean
	private ScooterService scooterService;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Test
	@DisplayName("Should return status 404 Not Found since deleting of ratings is not implemented")
	public void testDeletingRatingShouldNotBeImplemented() throws Exception {
		
		mockMvc.perform(delete("/api/ratings/delete/1"))
			.andExpect(status().is(404));
	}
}








