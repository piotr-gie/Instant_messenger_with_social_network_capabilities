package com.example.socialapp.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name= "conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user1")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2")
    private User user2;

    @OneToMany(mappedBy = "conversation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Message> messages;

    public Conversation(){

    }

    public Conversation(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public int getId() {
        return id;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
