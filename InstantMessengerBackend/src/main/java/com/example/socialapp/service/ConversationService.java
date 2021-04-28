package com.example.socialapp.service;

import com.example.socialapp.model.Conversation;
import com.example.socialapp.model.ConversationRepository;
import com.example.socialapp.model.Message;
import com.example.socialapp.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ConversationService {
    ConversationRepository conversationRepository;
    UserService userService;

    public ConversationService(ConversationRepository conversationRepository, UserService userService) {
        this.conversationRepository = conversationRepository;
        this.userService = userService;
    }

    private Optional<Conversation> findByUsersIds(int userId1, int userId2){
        User user1 = userService.getById(userId1);
        User user2 = userService.getById(userId2);
        return conversationRepository.findByUser1IsAndUser2OrUser2AndUser1Is(user1, user2, user1, user2);
    }

    private Conversation createConversation(int userId1, int userId2){
        Conversation c = new Conversation(userService.getById(userId1), userService.getById(userId2));
        return conversationRepository.save(c);
    }

    public Conversation findOrCreateByUsersIds(int userId1, int userId2){
        Optional<Conversation> o = findByUsersIds(userId1, userId2);
        if (o.isEmpty()){
            return createConversation(userId1, userId2);
        }
        return o.get();
    }

    public List<Message> getAllMessagesByUsersIds(int userId1, int userId2){
        Conversation conversation = findOrCreateByUsersIds(userId1, userId2);
        List<Message> messageList = conversation.getMessages();
        messageList.sort((o1, o2) -> o1.getDate().compareTo(o2.getDate()));
        return messageList;
    }
}
