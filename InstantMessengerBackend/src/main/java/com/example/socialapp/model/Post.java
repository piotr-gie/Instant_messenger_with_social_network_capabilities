package com.example.socialapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="post")
public class Post extends AbstractMessage {

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST)
    private List<File> files = new ArrayList<>();

    @JoinColumn(name = "board")
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Board board;

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    public Post() {
    }

    public Post(String content, Board board,int userId) {
        this.content = content;
        this.date = LocalDateTime.now();
        this.board = board;
        this.senderId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public void setOneAttachment(File file){
        this.files.add(file);
    }
}
