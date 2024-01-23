package com.scootshare.base.controllers;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scootshare.base.config.JwtService;
import com.scootshare.base.dto.ListingDto;
import com.scootshare.base.entities.Scooter;
import com.scootshare.base.services.ListingService;
import com.scootshare.base.services.ScooterService;

@WebMvcTest(controllers = ListingController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ListingControllerTest {

	@MockBean
	private ListingService listingService;
	
	@MockBean
	private ScooterService scooterService;
	
	@MockBean
	private JwtService jwtService;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Test
	@DisplayName("Should throw exception listing for given id does not exist")
	@WithMockUser(username = "test")
	public void testThrowsExceptionForNonExistingListing() throws Exception {
		assertThatThrownBy(() ->
		        mockMvc.perform(get("/api/listings/getOneListing/1"))
		                .andExpect(status().is(500))
		).hasCauseInstanceOf(NullPointerException.class);
	}
	
	@Test
	@DisplayName("Should add new listing")
	@WithMockUser(username = "test")
	public void testAddingNewListing() throws Exception {
		ListingDto listingDto = ListingDto.builder()
				.scooterId(1L)
				.location("Zagreb")
				.build();
		
		Mockito.when(scooterService.findById(1L)).thenReturn(
				Scooter.builder().id(1L).build());
		
		mockMvc.perform(post("/api/listings/add")
				.contentType(MediaType.APPLICATION_JSON_VALUE)
				.content(convertObjectToJson(listingDto)))
			.andExpect(status().is(200));
	}
	
	public static String convertObjectToJson(Object object) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
