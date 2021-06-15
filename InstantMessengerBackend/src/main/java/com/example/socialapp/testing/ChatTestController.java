package com.example.socialapp.testing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class ChatTestController {
    @GetMapping(path = "chat_test")
    public String homeMethod(){
        return "index.html";
    }

    @GetMapping(path = "path2")
    public String path2Method(){
        return "index2.html";
    }
}
