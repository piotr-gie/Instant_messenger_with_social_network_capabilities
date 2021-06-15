package com.example.socialapp.controller;

import com.example.socialapp.dto.FileDto;
import com.example.socialapp.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class MessageDto {
    private String content;
    private FileDto[] files;
    private int receiverId;
    private int senderId;

    public MessageDto() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public FileDto[] getFiles() {
        return files;
    }

    public void setFiles(FileDto[] files) {
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
