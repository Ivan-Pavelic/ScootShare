package com.scootshare.base.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scootshare.base.entities.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>{

}
