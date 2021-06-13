package com.example.socialapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "messages")
public class Message extends AbstractMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    @Column(length = 1000000)
    private String content;


    @OneToMany(mappedBy = "message", cascade = CascadeType.PERSIST)
    private List<File> files = new ArrayList<>();


    @JoinColumn(name = "conversation")
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Conversation conversation;

    public Message() {
    }

    public Message(String content, int senderId, Conversation conversation) {
        this.content = content;
        this.senderId = senderId;
        this.conversation = conversation;
        this.date = LocalDateTime.now();
    }

    public List<File> getAttachments() {
        return files;
    }

    public void setAttachments(List<File> files) {
        this.files = files;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setOneAttachment(File file){
        this.files.add(file);
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String getContent() {
        return content;
    }

    @Override
    public void setContent(String content) {
        this.content = content;
    }
}
