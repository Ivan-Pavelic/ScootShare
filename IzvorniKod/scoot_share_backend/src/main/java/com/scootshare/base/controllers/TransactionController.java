package com.scootshare.base.controllers;

import com.scootshare.base.dto.TransactionsDto;
import com.scootshare.base.entities.Transaction;
import com.scootshare.base.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService service;

    @GetMapping("/{username}")
    private List<TransactionsDto> getTransactions(@PathVariable String username){
        return service.getTransactions(username).stream().map(transaction -> TransactionsDto.builder()
                .rentalDto(null)
                .totalPrice(transaction.getTotalPrice())
                .kilometersPassed(transaction.getKilometersPassed())
                .timeOfTransaction(transaction.getTimeOfTransaction())
                .build()).collect(Collectors.toList());
    }
}
