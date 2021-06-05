package com.example.socialapp.model;

import javax.persistence.*;
import java.util.Collection;

@Entity(name = "roles")
public class Role {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    private String name;
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
