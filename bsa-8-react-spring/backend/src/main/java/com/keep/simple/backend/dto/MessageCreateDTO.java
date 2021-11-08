package com.keep.simple.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class MessageCreateDTO {
    private String text;
    private UUID user_id;
}
