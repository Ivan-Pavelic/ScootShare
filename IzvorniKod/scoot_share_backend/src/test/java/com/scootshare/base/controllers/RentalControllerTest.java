package com.scootshare.base.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.scootshare.base.config.JwtService;
import com.scootshare.base.entities.Listing;
import com.scootshare.base.entities.Rental;
import com.scootshare.base.entities.Scooter;
import com.scootshare.base.entities.User;
import com.scootshare.base.repositories.RentalRepository;
import com.scootshare.base.services.ListingService;
import com.scootshare.base.services.NotificationService;
import com.scootshare.base.services.RentalService;
import com.scootshare.base.services.TransactionService;
import com.scootshare.base.services.UserService;

@WebMvcTest(controllers =  RentalController.class)
public class RentalControllerTest {

	@MockBean
	private RentalService rentalService;
	@Mock
	private RentalRepository rentalRepository;
	@MockBean
	private ListingService listingService;
	@MockBean
	private UserService userService;
	@MockBean
	private SimpMessagingTemplate messagingTemplate;
	@MockBean
	private NotificationService notificationService;
	@MockBean
	private TransactionService transactionService;
	@MockBean
	private JwtService jwtService;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Test
	@DisplayName("Should get all the rentals for given user")
	@WithMockUser(username = "test")
	public void testGetRentalsForUser() throws Exception {
		Rental rental1 = Rental.builder()
				.id(1L)
				.listing(Listing.builder()
						.id(1L)
						.scooter(Scooter.builder().owner(User.builder().username("user2").build()).build())
						.build())
				.scooterRenter(User.builder().id(1L).username("user1").build())
				.build();
		Rental rental2 = Rental.builder()
				.id(2L)
				.listing(Listing.builder()
						.id(2L)
						.scooter(Scooter.builder().owner(User.builder().username("user3").build()).build())
						.build())
				.scooterRenter(User.builder().id(1L).username("user1").build())
				.build();
		List<Rental> rentals = new ArrayList<>();
		rentals.add(rental1);
		rentals.add(rental2);
		User user = User.builder().id(1L).username("user1").build();
		
		Mockito.when(rentalService.findRentalsByUser(user))
			.thenReturn(rentals);
		
		Mockito.when(userService.findByUsername("user1"))
			.thenReturn(user);
		
		mockMvc.perform(get("/api/rentals/getRentalsForUser/user1"))
		        .andExpect(status().is(200))
		        .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
		        .andExpect(jsonPath("$.size()", Matchers.is(2)))
                .andExpect(jsonPath("$[0].listingId", Matchers.is(1)))
				.andExpect(jsonPath("$[1].listingId", Matchers.is(2)))
				.andExpect(jsonPath("$[0].scooterRenterUsername", Matchers.is("user1")))
				.andExpect(jsonPath("$[1].scooterRenterUsername", Matchers.is("user1")))
				.andExpect(jsonPath("$[0].scooterOwner", Matchers.is("user2")))
				.andExpect(jsonPath("$[1].scooterOwner", Matchers.is("user3")));
	}
}










