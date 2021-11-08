package com.keep.simple.backend.dto;

import com.keep.simple.backend.models.Message;
import com.keep.simple.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@AllArgsConstructor
@Data
public class AllData {
    private Set<User> users;
    private Set<Message> messages;
    private User currentUser;
}
