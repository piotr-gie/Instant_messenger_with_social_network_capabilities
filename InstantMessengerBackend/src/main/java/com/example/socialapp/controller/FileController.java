package com.example.socialapp.controller;

import com.example.socialapp.model.File;
import com.example.socialapp.service.FileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/attachment")
public class FileController {
    FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable int id) {
        File file = fileService.getAttachment(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getFileContent());
    }

//    @PostMapping
//    public ResponseEntity<?> uploadFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("message") int messageId) {
//            List<File> attachments = new ArrayList<>();
//            Arrays.stream(files).forEach(file -> {
//                try {
//                    attachments.add(fileService.saveAttachment(file, messageId));
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            });
//
//            return ResponseEntity.ok(attachments);
//
//    }
}
