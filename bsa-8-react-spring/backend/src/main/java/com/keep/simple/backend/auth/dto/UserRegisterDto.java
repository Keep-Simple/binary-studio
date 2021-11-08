package com.keep.simple.backend.auth.dto;

import lombok.Data;

@Data
public class UserRegisterDto {
    private String password;
    private String name;
}
