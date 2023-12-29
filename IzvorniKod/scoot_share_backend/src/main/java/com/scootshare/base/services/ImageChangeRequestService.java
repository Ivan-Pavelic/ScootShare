package com.scootshare.base.services;

import org.springframework.stereotype.Service;

import com.scootshare.base.entities.ImageChangeRequest;
import com.scootshare.base.repositories.ImageChangeRequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageChangeRequestService {

	private final ImageChangeRequestRepository repository;
	
	public ImageChangeRequest save(ImageChangeRequest imageChangeRequest) {
		return repository.save(imageChangeRequest);
	}
}
