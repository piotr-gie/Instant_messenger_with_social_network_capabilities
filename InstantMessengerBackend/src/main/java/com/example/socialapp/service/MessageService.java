package com.example.socialapp.service;

import com.example.socialapp.model.Conversation;
import com.example.socialapp.model.File;
import com.example.socialapp.model.Message;
import com.example.socialapp.model.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.time.LocalDateTime;
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

    public Message sendMessage(String content, int senderId, int receiverId, MultipartFile [] files){
        // TODO:  check user authentication
        Conversation conversation = conversationService.findOrCreateByUsersIds(senderId, receiverId);

        Message m = new Message(content, senderId, conversation);

        if(files == null || files[0].isEmpty()){
            return messageRepository.save(m);
        }

        Arrays.stream(files).forEach( x-> {
            try {
                File f = fileService.convertToFileObject(x);
                f.setMessage(m);
                m.setOneAttachment(f);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        return messageRepository.save(m);

    }

    public List<Message> getAllMessagesInConversation(int senderId, int receiverId){
        // TODO:  check user authentication
        return conversationService.getAllMessagesByUsersIds(senderId, receiverId);
    }
    public void deleteMessage(int messageId){
        // TODO:  check user authentication
        messageRepository.deleteById(messageId);
    }

}
