package com.scootshare.base.services;

import org.springframework.stereotype.Service;

import com.scootshare.base.entities.Rating;
import com.scootshare.base.repositories.RatingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RatingService {

	private final RatingRepository repository;
	
	public Rating save(Rating rating) {
		return repository.save(rating);
	}
}
