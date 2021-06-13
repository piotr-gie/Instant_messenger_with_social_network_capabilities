package com.example.socialapp.controller;

import org.springframework.web.bind.annotation.*;
import com.example.socialapp.config.LoginCredentials;

@RestController
public class LoginController {

    @PostMapping("/login")
    public void login(@RequestParam String mail, @RequestParam String password) {
    }

    @GetMapping("/secured")
    public String secured() {
        return "secured";
    }
}
