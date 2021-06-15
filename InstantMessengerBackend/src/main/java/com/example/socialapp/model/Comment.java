package com.example.socialapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="comment")
public class Comment extends AbstractMessage {

    public Comment(int senderId, String content, Post post) {
        this.senderId = senderId;
        this.content = content;
        this.post = post;
    }

    @JoinColumn(name = "post")
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Post post;

    public Comment() {

    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
