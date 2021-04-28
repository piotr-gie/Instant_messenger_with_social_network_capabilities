package com.example.socialapp.controller;

import com.example.socialapp.model.Message;
import com.example.socialapp.service.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping(value = "/message")
public class MessageController {
    MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Map<String, Object> m){
        ObjectMapper mapper = new ObjectMapper();
        var message= mapper.convertValue(m.get("message"), Message.class);
        return ResponseEntity.ok(messageService.sendMessage(
                message,
                (int)(m.get("senderId")),
                (int)(m.get("receiverId"))));
    }

    @PostMapping(value = "/test")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message){

        return ResponseEntity.ok(message);
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAllMessagesInConversationByUsers(
            @RequestParam int senderId, @RequestParam int receiverId){
        return ResponseEntity.ok(messageService.getAllMessagesInConversation(senderId, receiverId));
    }


}

