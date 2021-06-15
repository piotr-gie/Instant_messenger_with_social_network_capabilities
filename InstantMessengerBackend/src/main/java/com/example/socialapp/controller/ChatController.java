package com.example.socialapp.controller;

import com.example.socialapp.dto.MessageDto;
import com.example.socialapp.model.Message;
import com.example.socialapp.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
    }

    @MessageMapping("/send")
    public void processMessage(@Payload MessageDto message){

        Message convertedMessage = messageService.sendMessage(message);

        messagingTemplate.convertAndSendToUser(String.valueOf(message.getReceiverId()),"/queue/messages", convertedMessage);

    }

}
