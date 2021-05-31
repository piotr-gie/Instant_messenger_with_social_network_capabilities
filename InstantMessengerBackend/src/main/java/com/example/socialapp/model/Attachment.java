package com.example.socialapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "attachments")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @JsonIgnore
    @Lob
    private byte[] fileContent;

    private int size;

    private String name;
    @ManyToOne
    @JoinColumn(name = "message")
    @JsonIgnore
    private Message message;

    public Attachment() {
    }

    public Attachment(byte[] fileContent, int size, String name, Message message) {
        this.fileContent = fileContent;
        this.size = size;
        this.name = name;
        this.message = message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] serialFile) {
        this.fileContent = serialFile;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

