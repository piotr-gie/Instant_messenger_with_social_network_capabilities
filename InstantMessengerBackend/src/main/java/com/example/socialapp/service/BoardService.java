package com.example.socialapp.service;

import com.example.socialapp.model.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    private BoardRepository boardRepository;
    private PostRepository postRepository;
    private UserService userService;
    private FileService fileService;

    public BoardService(BoardRepository boardRepository,PostRepository postRepository , UserService userService) {
        this.boardRepository = boardRepository;
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public Board getUsersBoardOrCreate(int userId) {
        if(userService.getById(userId).getBoard() == null) {
            Board board = new Board(userService.getById(userId));
            userService.getById(userId).setBoard(board);
            boardRepository.save(board);
            return board;
        } else {
            return userService.getById(userId).getBoard();
        }
    }

    public Post addPostToUsersBoard(String content, int userId) {
        if(userService.getById(userId) != null) {
            Board board = getUsersBoardOrCreate(userId);
            Post post = new Post(content, board,userId);
            board.getPosts().add(post);
            boardRepository.save(board);
            postRepository.save(post);
            return post;
        }else {
            return null;
        }

    }

    public List<Post> getBoardByUserId(int userId){
        User user = userService.getById(userId);
        Optional<Board> optionalBoard =  boardRepository.getByUser(user);
        if(optionalBoard.isPresent()) {
            return optionalBoard.get().getPosts();
        }
        else {
            return null;
        }
    }

    public Post deleteById(int postId) {
        Optional<Post> optional = postRepository.findById(postId);
        if(optional.isPresent()) {
            boardRepository.deleteById(postId);
            return optional.get();
        } else {
            return null;
        }
    }
}
