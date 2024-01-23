package com.scootshare.base.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.scootshare.base.dto.MessageDto;
import com.scootshare.base.entities.ChatRoom;
import com.scootshare.base.entities.Message;
import com.scootshare.base.entities.User;
import com.scootshare.base.repositories.MessageRepository;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTest {
	
	@Mock
	private MessageRepository messageRepository;
	private MessageService messageService;
	
	@BeforeEach
	public void setUp() {
		messageService = new MessageService(messageRepository);
	}
	
	@Test
	@DisplayName("Should find all the messages for user sender and user receiver")
	public void shoudFindMessagesForSenderAndReceiver() {
		String sender = "user1";
		String receiver = "user2";
		
		List<Message> messages = new ArrayList<>();
		messages.add(new Message(1L, User.builder().username(sender).build(),
				User.builder().username(receiver).build(), 
				ChatRoom.builder().id(sender + "_" + receiver).build(), new Date(), "Hello user 2"));
		messages.add(new Message(2L, User.builder().username(receiver).build(), 
				User.builder().username(sender).build(),
				ChatRoom.builder().id(sender + "_" + receiver).build(), new Date(), "Hello user 1"));
		
		Mockito.when(messageRepository.findMessagesBySenderAndReceiver(sender + "_" + receiver))
			.thenReturn(messages);
		
		List<MessageDto> retreivedMessageDtos = messageService.findByUsers(sender, receiver);
		
		Assertions.assertThat(retreivedMessageDtos.size()).isEqualTo(messages.size());
		
		Assertions.assertThat(retreivedMessageDtos.get(0).getSender())
			.isEqualTo(messages.get(0).getSender().getUsername());
		
		Assertions.assertThat(retreivedMessageDtos.get(0).getContent())
		.isEqualTo(messages.get(0).getContent());
		
		Assertions.assertThat(retreivedMessageDtos.get(1).getContent())
		.isEqualTo(messages.get(1).getContent());
	}
}


