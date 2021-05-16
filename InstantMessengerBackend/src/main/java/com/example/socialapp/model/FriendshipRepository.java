package com.example.socialapp.model;


import jdk.jfr.Frequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
    public Optional<Friendship> deleteByUser1AndUser2 (User user1, User user2);
    public Optional<Friendship> getByUser1AndUser2(User user1, User user2);
    public List<Friendship> getAllByUser1(User user);
    public List<Friendship> getAllByUser2(User user);
}
