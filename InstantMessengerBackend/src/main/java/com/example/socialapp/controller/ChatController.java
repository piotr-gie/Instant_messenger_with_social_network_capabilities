package com.example.socialapp.controller;

import com.example.socialapp.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/send")
    public void processMessage(@Payload MessageDto message){
        // TODO change 2 for actual value of user

        messagingTemplate.convertAndSendToUser(String.valueOf(message.getReceiverId()),"/queue/messages", message);

    }

}
