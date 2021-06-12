package com.example.socialapp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Modifying
    @Query("update Post p set p.content = ?2, p.files = ?3 where p.id = ?1")
    void updatePost(int id, String content, List<File> files);
}
