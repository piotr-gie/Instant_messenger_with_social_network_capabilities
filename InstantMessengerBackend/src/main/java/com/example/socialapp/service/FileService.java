package com.example.socialapp.service;

import com.example.socialapp.model.File;
import com.example.socialapp.model.FileRepository;
import com.example.socialapp.model.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {

    FileRepository fileRepository;
    MessageRepository messageRepository;


    public FileService(FileRepository fileRepository, MessageRepository messageRepository) {
        this.fileRepository = fileRepository;
        this.messageRepository = messageRepository;
    }


    public File saveAttachment(MultipartFile file, int messageId) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return fileRepository.save(
                new File(file.getBytes(), (int) file.getSize(), fileName, messageRepository.getOne(messageId)));
    }

    public File saveFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return fileRepository.save(
                new File(file.getBytes(), (int) file.getSize(), fileName));
    }

    public File convertToFileObject(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return new File(file.getBytes(), (int) file.getSize(), fileName);
    }

    public File getAttachment(int id) {
        return fileRepository.findById(id).get();
    }

}
