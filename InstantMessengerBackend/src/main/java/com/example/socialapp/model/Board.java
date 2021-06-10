package com.example.socialapp.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    List<Post> posts;

    @OneToOne(mappedBy = "board")
    User user;

    public Board(User owner){
        this.posts = new ArrayList<>();
        this.user = owner;
    }

    public Board() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
