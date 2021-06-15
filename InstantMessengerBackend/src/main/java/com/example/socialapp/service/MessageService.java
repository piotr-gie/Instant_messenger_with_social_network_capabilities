package com.example.socialapp.service;

import com.example.socialapp.controller.MessageDto;
import com.example.socialapp.dto.FileDto;
import com.example.socialapp.model.*;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MessageService {
    private MessageRepository messageRepository;
    private ConversationService conversationService;
    private FileService fileService;


    public MessageService(MessageRepository messageRepository, ConversationService conversationService, FileService fileService) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
        this.fileService = fileService;
    }

    public Message sendMessage(String content, int senderId, int receiverId, MultipartFile[] files) {

        ArrayList<File> fileObjects = new ArrayList<>();

        if (files == null || files[0].isEmpty()) {
            return sendMessage(content, senderId, receiverId, fileObjects);
        }

        Arrays.stream(files).forEach(x -> {
            try {
                File f = fileService.convertToFileObject(x);
                fileObjects.add(f);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        return sendMessage(content, senderId, receiverId, fileObjects);
    }

    public Message sendMessage(String content, int senderId, int receiverId, List<File> files) {

        Conversation conversation = conversationService.findOrCreateByUsersIds(senderId, receiverId);
        Message m = new Message(content, senderId, conversation);

        if (files.isEmpty()) {
            return messageRepository.save(m);
        }

        files.forEach(file -> {
            if(file.getSize()!=0){
                file.setMessage(m);
                m.setOneAttachment(file);
            }
        });

        return messageRepository.save(m);
    }

    public Message sendMessage(MessageDto messageDto) {
        var filesDto = messageDto.getFiles();
        List<File> files = new ArrayList<>();
        for (FileDto f:filesDto) {
            files.add(new File(f));
        }
        return sendMessage(messageDto.getContent(), messageDto.getSenderId(), messageDto.getReceiverId(), files);
    }

    public List<Message> getAllMessagesInConversation(int senderId, int receiverId) {
        return conversationService.getAllMessagesByUsersIds(senderId, receiverId);
    }

    public void deleteMessage(int messageId) {
        messageRepository.deleteById(messageId);
    }

}
