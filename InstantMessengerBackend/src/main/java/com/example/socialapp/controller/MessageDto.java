package com.example.socialapp.controller;

import com.example.socialapp.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class MessageDto {
    private String content;
    private List<File> files;
    private int receiverId;
    private int senderId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }
}
