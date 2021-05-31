package com.example.socialapp.service;

import com.example.socialapp.model.Attachment;
import com.example.socialapp.model.AttachmentRepository;
import com.example.socialapp.model.Message;
import com.example.socialapp.model.MessageRepository;
import org.springframework.core.AttributeAccessorSupport;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class AttachmentService {

    AttachmentRepository attachmentRepository;
    MessageRepository messageRepository;


    public AttachmentService(AttachmentRepository attachmentRepository, MessageRepository messageRepository) {
        this.attachmentRepository = attachmentRepository;
        this.messageRepository = messageRepository;
    }

    public Attachment saveAttachment(MultipartFile file, int messageId) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return attachmentRepository.save(
                new Attachment(file.getBytes(), (int) file.getSize(), fileName, messageRepository.getOne(messageId)));
    }

    public Attachment getAttachment(int id) {
        return attachmentRepository.findById(id).get();
    }

}
