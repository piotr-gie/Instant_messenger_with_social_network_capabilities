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
    private CommentRepository commentRepository;
    private FileService fileService;

    public BoardService(BoardRepository boardRepository,PostRepository postRepository , UserService userService, CommentRepository commentRepository) {
        this.boardRepository = boardRepository;
        this.postRepository = postRepository;
        this.userService = userService;
        this.commentRepository = commentRepository;
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

    public Post deletePostById(int postId) {
        Optional<Post> optional = postRepository.findById(postId);
        if(optional.isPresent()) {
            postRepository.deleteById(postId);
            return optional.get();
        } else {
            return null;
        }
    }

    public Comment addCommentToPost(int postId, String content, int senderId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty()) {
            return null;
        }
        Post post = optionalPost.get();
        Comment comment = new Comment(senderId,content,post);
        post.getComments().add(comment);
        postRepository.save(post);
        boardRepository.save(post.getBoard());
        return comment;
    }

    public List<Comment> getCommentsForPost(int postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
            if(optionalPost.isEmpty()) {
                return null;
            }
            return optionalPost.get().getComments();
    }

    public Comment deleteCommentById(int commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isEmpty()) {
            return null;
        }
        commentRepository.deleteById(commentId);
        return optionalComment.get();
    }

    public Post updatePost(Post post) {
        postRepository.updatePost(post.getId(),post.getContent());
        return post;
    }

    public Comment updateComment(Comment comment) {
        commentRepository.updateComment(comment.getId(),comment.getContent());
        return comment;
    }
}
