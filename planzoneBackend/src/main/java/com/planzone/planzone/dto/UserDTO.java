package com.planzone.planzone.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private String password;
    private String role;
}