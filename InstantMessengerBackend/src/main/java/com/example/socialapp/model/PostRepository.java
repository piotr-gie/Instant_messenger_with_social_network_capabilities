package com.example.socialapp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Transactional
    @Modifying
    @Query("update Post p set p.content = ?2 where p.id = ?1")
    void updatePost(int id, String content);
}
