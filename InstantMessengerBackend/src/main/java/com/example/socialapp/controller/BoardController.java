package com.example.socialapp.controller;

import com.example.socialapp.model.Board;
import com.example.socialapp.model.Comment;
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

    @PutMapping
    public ResponseEntity<Post> editPost(@RequestBody Post post) {
        return ResponseEntity.ok(boardService.updatePost(post));
    }

    @GetMapping
    public ResponseEntity<Board> getBoardByUserId(@RequestParam int userId)
    {
        Board board = boardService.getUsersBoardOrCreate(userId);
        return ResponseEntity.ok(board);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMessageById(@RequestParam int postId){
        boardService.deletePostById(postId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{postId}")
    public ResponseEntity<Comment> addComment(@RequestParam String content, @PathVariable int postId, @RequestParam int senderId) {
        return ResponseEntity.ok(boardService.addCommentToPost(postId,content,senderId));
    }

    @GetMapping(value = "/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable int postId) {
        return ResponseEntity.ok(boardService.getCommentsForPost(postId));
    }

    @PutMapping(value = "/updateComment")
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(boardService.updateComment(comment));
    }

    @DeleteMapping(value = "/{commentId}")
    public ResponseEntity<?> deleteCommentById(@PathVariable int commentId) {
        boardService.deleteCommentById(commentId);
        return ResponseEntity.noContent().build();
    }

}
