package com.example.socialapp.controller;

import com.example.socialapp.model.Message;
import com.example.socialapp.service.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(value = "/message")
public class MessageController {
    private final MessageService messageService;


    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestParam String content, @RequestParam int senderId,
                                               @RequestParam int receiverId, @RequestParam(value = "files", required = false) MultipartFile[] files){
        return ResponseEntity.ok(messageService.sendMessage(
                content, senderId, receiverId, files));
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAllMessagesInConversationByUsers(
            @RequestParam int senderId, @RequestParam int receiverId){
        return ResponseEntity.ok(messageService.getAllMessagesInConversation(senderId, receiverId));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMessageById(@RequestParam int id){
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }


}

