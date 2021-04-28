package com.example.socialapp.service;

import com.example.socialapp.model.Conversation;
import com.example.socialapp.model.Message;
import com.example.socialapp.model.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class MessageService {
    private MessageRepository messageRepository;
    private ConversationService conversationService;

    public MessageService(MessageRepository messageRepository, ConversationService conversationService) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
    }

    public Message sendMessage(Message message, int senderId, int receiverId){
        message.setSenderId(senderId);
        Conversation conversation = conversationService.findOrCreateByUsersIds(senderId, receiverId);
        message.setConversation(conversation);
        message.setDate(LocalDateTime.now());

        return messageRepository.save(message);

    }

    public List<Message> getAllMessagesInConversation(int senderId, int receiverId){
        return conversationService.getAllMessagesByUsersIds(senderId, receiverId);
    }
}
