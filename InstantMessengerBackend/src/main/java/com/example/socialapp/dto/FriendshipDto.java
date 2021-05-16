package com.example.socialapp.dto;

import com.example.socialapp.model.User;

public class FriendshipDto {

    User user;
    boolean accepted;

    public FriendshipDto(User user) {
        this(user, false);
    }
    public FriendshipDto(User user, boolean accepted) {
        this.user = user;
        this.accepted = accepted;
    }

    public User getUser() {
        return user;
    }

    public boolean isAccepted() {
        return accepted;
    }
}
