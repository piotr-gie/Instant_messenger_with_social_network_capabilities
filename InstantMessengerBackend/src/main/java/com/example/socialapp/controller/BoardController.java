package com.example.socialapp.controller;

import com.example.socialapp.model.Board;
import com.example.socialapp.model.Post;
import com.example.socialapp.service.BoardService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping
    public ResponseEntity<Post> addPost(@RequestParam String content, @RequestParam int userId) {

        return ResponseEntity.ok(boardService.addPostToUsersBoard(content ,userId));
    }

    @GetMapping
    public ResponseEntity<Board> getBoardByUserId(@RequestParam int userId)
    {
        Board board = boardService.getUsersBoardOrCreate(userId);
        return ResponseEntity.ok(board);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMessageById(@RequestParam int id){
        boardService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
