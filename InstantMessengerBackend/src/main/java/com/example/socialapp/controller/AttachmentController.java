package com.example.socialapp.controller;

import com.example.socialapp.model.Attachment;
import com.example.socialapp.service.AttachmentService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {
    AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable int id) {
        Attachment attachment = attachmentService.getAttachment(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getName() + "\"")
                .body(attachment.getFileContent());
    }

    @PostMapping
    public ResponseEntity<?> uploadFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("message") int messageId) {
            List<Attachment> attachments = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                try {
                    attachments.add(attachmentService.saveAttachment(file, messageId));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });

            return ResponseEntity.ok(attachments);

    }
}
