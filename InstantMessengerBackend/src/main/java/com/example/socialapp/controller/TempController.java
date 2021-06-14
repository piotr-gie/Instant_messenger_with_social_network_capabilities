package com.example.socialapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class TempController {
    @PostMapping("/test")
    public void sendMsg(@RequestBody MessageDto m){
        return;
    }
}
