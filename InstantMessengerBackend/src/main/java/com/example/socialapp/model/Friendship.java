package com.example.socialapp.model;

import javax.persistence.*;
import java.util.Set;

@Table(name = "friendships")
@Entity
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @ManyToOne
    @JoinColumn(name = "user1")
    User user1;

    @ManyToOne
    @JoinColumn(name = "user2")
    User user2;

    boolean isAccepted;

    public Friendship() {

    }

    public Friendship(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public int getId() {
        return id;
    }

    public User getUser1() {
        return user1;
    }

    public User getUser2() {
        return user2;
    }

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }
}
