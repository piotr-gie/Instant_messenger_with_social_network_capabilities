package com.example.socialapp.controller;

import com.example.socialapp.dto.FriendshipDto;
import com.example.socialapp.model.Friendship;
import com.example.socialapp.model.User;
import com.example.socialapp.service.FriendshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
public class FriendshipController {

    FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @GetMapping
    public List<FriendshipDto> getAllFriends(@RequestParam int id){
        return friendshipService.getAllFriends(id);
    }

    @PostMapping
    public ResponseEntity<Friendship> addFriendship(@RequestParam int id1, @RequestParam int id2){
        try{
            return ResponseEntity.ok(friendshipService.addFriendship(id1, id2));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping("/accept")
    public Friendship acceptFriendship(@RequestParam int id1, @RequestParam int id2){
        return friendshipService.acceptFriendship(id1, id2);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteFriendship(@RequestParam int id1, @RequestParam int id2){
        friendshipService.deleteFriendship(id1, id2);
        return ResponseEntity.noContent().build();
    }

}
