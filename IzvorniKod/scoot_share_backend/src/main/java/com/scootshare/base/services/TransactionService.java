package com.scootshare.base.services;

import org.springframework.stereotype.Service;

import com.scootshare.base.entities.Transaction;
import com.scootshare.base.repositories.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

	private final TransactionRepository repository;
	
	public Transaction save(Transaction transaction) {
		return repository.save(transaction);
	}
}
