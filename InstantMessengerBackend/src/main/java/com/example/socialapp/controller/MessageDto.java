package com.example.socialapp.controller;

import org.springframework.web.multipart.MultipartFile;

public class MessageDto {
    private String content;
    private MultipartFile[] files;
    private int receiverId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }
}
