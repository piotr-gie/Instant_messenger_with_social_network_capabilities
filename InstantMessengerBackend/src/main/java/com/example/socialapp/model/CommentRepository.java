package com.example.socialapp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.sql.rowset.serial.SerialBlob;
import java.text.SimpleDateFormat;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {


    @Modifying
    @Query("update Comment c set c.content = ?2 where c.id = ?1")
    void updateComment(int id, String content);
}
