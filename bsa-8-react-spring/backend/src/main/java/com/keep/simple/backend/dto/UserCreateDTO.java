package com.keep.simple.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCreateDTO {
    private String name;
    private String avatar;
    private String password;
    private boolean isAdmin;
}
