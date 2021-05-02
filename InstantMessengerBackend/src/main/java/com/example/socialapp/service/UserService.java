package com.example.socialapp.service;

import com.example.socialapp.model.User;
import com.example.socialapp.model.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getById(int userId){
        return userRepository.findById(userId).orElseThrow();
    }
}
