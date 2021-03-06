package com.example.socialapp.controller;

import com.example.socialapp.model.User;
import com.example.socialapp.service.UserService;
import org.hibernate.annotations.Parameter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.socialapp.SocialAppApplication;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    private UserService service;

    private BCryptPasswordEncoder encoder;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User body) {
        return ResponseEntity.ok(service.add(body));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getById(@PathVariable int id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody User body) {
        return ResponseEntity.ok(service.updateById(body));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<byte[]> setImage(@PathVariable int id, @RequestParam MultipartFile image ) throws IOException, SQLException {
        return ResponseEntity.ok(service.updateImage(id, image.getBytes()));
    }


    @DeleteMapping
    public ResponseEntity<User> delete(@RequestParam int id) {
        return ResponseEntity.ok(service.deleteById(id));
    }

//    @PostMapping(value = "/register")
//    public void signUp(@RequestBody User user) {
//        user.setPassword(encoder.encode(user.getPassword()));
//        service.add(user);
//    }
}
