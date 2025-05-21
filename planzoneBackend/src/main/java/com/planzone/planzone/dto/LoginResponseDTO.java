package com.planzone.planzone.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private String userId;
    private String username;
    private String role;
}