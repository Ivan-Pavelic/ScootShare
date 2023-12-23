package com.scootshare.base.services;

import org.springframework.stereotype.Service;

import com.scootshare.base.entities.Listing;
import com.scootshare.base.entities.Scooter;
import com.scootshare.base.repositories.ListingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListingService {

	private final ListingRepository repository;
	private final ScooterService scooterService;
	
	public Listing save(Listing listing) {
		return repository.save(listing);
	}

	public Listing findByScooterId(Long scooterId) {
		Scooter scooter = scooterService.findById(scooterId);
		return repository.findByScooter(scooter);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}
}
