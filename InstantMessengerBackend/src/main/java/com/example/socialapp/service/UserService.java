package com.example.socialapp.service;

import com.example.socialapp.config.UserDetailsImpl;
import com.example.socialapp.model.User;
import com.example.socialapp.model.UserRepository;
import org.hibernate.Hibernate;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.socialapp.model.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import javax.persistence.Query;
import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User add(User user) {
        Set<Role> roles = new HashSet<>();
        // Adding all users to USER role
        roles.add(roleRepository.getOne(1));
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User getById(int userId){
        return userRepository.findById(userId).orElseThrow();
    }



    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User updateById(User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    public byte[] updateImage(int id, byte[] image) throws SQLException {


        userRepository.updateImage(id, image);
        return image;
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

    public int getLoggedUserId(){
        String mail = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ((UserDetailsImpl)loadUserByUsername(mail)).getUserId();
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Optional<User> user = Optional.ofNullable(userRepository.findByMail(mail).orElseThrow());

        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + mail));

        UserDetailsImpl userDetails = new UserDetailsImpl(user.get());

        return userDetails;
    }
}
