package com.example.socialapp.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    public Optional<Conversation> findByUser1IsAndUser2OrUser2AndUser1Is(User user1, User user2, User user1V2, User user2V2);
}