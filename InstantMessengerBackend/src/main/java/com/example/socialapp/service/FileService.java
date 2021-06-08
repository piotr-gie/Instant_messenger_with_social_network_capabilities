package com.example.socialapp.service;

import com.example.socialapp.model.File;
import com.example.socialapp.model.FileRepository;
import com.example.socialapp.model.MessageRepository;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {

    FileRepository fileRepository;


    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }
    public File saveFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return fileRepository.save(convertToFileObject(file));
    }

    public File convertToFileObject(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return new File(file.getBytes(), (int) file.getSize(), fileName, file.getContentType());
    }

    public File getAttachment(int id) {
        return fileRepository.findById(id).get();
    }

}
