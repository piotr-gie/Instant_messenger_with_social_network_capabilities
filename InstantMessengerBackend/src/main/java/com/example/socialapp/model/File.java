package com.example.socialapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "files")
public class File {

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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne
    @JoinColumn(name = "post")
    @JsonIgnore
    private Post post;

    public File() {
    }

    public File(byte[] fileContent, int size, String name, Message message) {
        this(fileContent, size, name);
        this.message = message;
    }

    public File(byte[] fileContent, int size, String name, Post post) {
        this(fileContent, size, name);
        this.post = post;
    }

    public File(byte[] fileContent, int size, String name) {
        this.fileContent = fileContent;
        this.size = size;
        this.name = name;
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

