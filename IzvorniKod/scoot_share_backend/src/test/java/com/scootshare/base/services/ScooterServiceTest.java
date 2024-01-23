package com.scootshare.base.services;

import java.util.ArrayList;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.scootshare.base.entities.Listing;
import com.scootshare.base.entities.Scooter;
import com.scootshare.base.repositories.ScooterRepository;

@ExtendWith(MockitoExtension.class)
public class ScooterServiceTest {

	@Mock
	private ScooterRepository scooterRepository;
	
	private ScooterService scooterService;
	
	@BeforeEach
	private void setUp() {
		scooterService = new ScooterService(scooterRepository);
	}
	
	@Test
	@DisplayName("Shoud retreive scooter by id")
	public void shouldFindScooterById() {
		Scooter scooter = new Scooter(1L, null, new ArrayList<String>(), new ArrayList<Listing>());
		
		Mockito.when(scooterRepository.findById(1L)).thenReturn(Optional.of(scooter));
		
		Scooter retreived = scooterService.findById(1L);
		
		Assertions.assertThat(scooter.getId()).isEqualTo(retreived.getId());
	}
}





