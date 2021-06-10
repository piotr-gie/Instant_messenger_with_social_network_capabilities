package com.example.socialapp.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    public Optional<Board> getByUser(User user);
}
