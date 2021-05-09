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
}
