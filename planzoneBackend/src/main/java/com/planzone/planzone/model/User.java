package com.planzone.planzone.model;

import lombok.Data;
import java.util.UUID;

@Data
public class User {
    private String id;
    private String username;
    private String email;
    private String password;
    private String role; // ROLE_USER, ROLE_ADMIN

    public User() {
        this.id = UUID.randomUUID().toString();
    }
}