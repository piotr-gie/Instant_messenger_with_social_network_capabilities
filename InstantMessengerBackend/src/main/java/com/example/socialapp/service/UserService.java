package com.example.socialapp.service;

import com.example.socialapp.config.UserDetailsImpl;
import com.example.socialapp.model.User;
import com.example.socialapp.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.socialapp.model.*;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User add(User user) {
        return userRepository.save(user);
    }

    public User getById(int userId){
        return userRepository.findById(userId).orElseThrow();
    }



    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User updateById(User user) {
        userRepository.save(user);
        return user;
    }

    public User deleteById(int id) {
        Optional<User> optional = userRepository.findById(id);
        if(optional.isPresent()) {
            userRepository.deleteById(id);
            return optional.get();
        } else {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Optional<User> user = Optional.ofNullable(userRepository.getByMail(mail));

        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + mail));

        UserDetailsImpl userDetails = new UserDetailsImpl(user.get());

        return userDetails;
    }

}
