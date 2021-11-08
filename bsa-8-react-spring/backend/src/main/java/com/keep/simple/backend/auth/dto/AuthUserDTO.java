package com.keep.simple.backend.auth.dto;

import com.keep.simple.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserDTO {
    private String token;
    private User user;
}
