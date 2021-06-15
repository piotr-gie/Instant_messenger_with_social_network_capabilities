package com.example.socialapp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.sql.rowset.serial.SerialBlob;
import javax.transaction.Transactional;
import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByMail(String mail);

    @Transactional
    @Modifying
    @Query ("update User u set u.profileImage = ?2 where u.id = ?1")
    void updateImage(int userID, byte[] image);

    @Transactional
    @Modifying
    @Query("update User u set u.firstName = ?1, u.lastName = ?2,u.mail = ?3,u.password = ?4," +
            "u.presentation = ?5,u.phone = ?6,u.birthday = ?7,u.city= ?8, u.gender = ?9, u.profileImage = ?10," +
            "u.active = ?11,u.roles = ?12 where u.id = ?13")
    void updateById(String firstName, String lastName, String email, String
            password, String about, String phone, SimpleDateFormat birthDate,
                    String city, String gender, byte[] image, boolean active, Set<Role> roles, int id);
}
