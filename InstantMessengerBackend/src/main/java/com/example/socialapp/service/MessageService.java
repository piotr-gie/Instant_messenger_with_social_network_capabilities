package com.example.socialapp.service;

import com.example.socialapp.model.Conversation;
import com.example.socialapp.model.Message;
import com.example.socialapp.model.MessageRepository;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    private MessageRepository messageRepository;
    private ConversationService conversationService;

    public MessageService(MessageRepository messageRepository, ConversationService conversationService) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
    }

    public Message sendMessage(Message message, int senderId, int receiverId){
        // TODO:  check user authentication
        message.setSenderId(senderId);
        Conversation conversation = conversationService.findOrCreateByUsersIds(senderId, receiverId);

        message.setConversation(conversation);
        message.setDate(LocalDateTime.now());

        return messageRepository.save(message);

    }

    public List<Message> getAllMessagesInConversation(int senderId, int receiverId){
        // TODO:  check user authentication
        return conversationService.getAllMessagesByUsersIds(senderId, receiverId);
    }
    public void deleteMessage(int messageId){
        // TODO:  check user authentication
        messageRepository.deleteById(messageId);
    }

}
