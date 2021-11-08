package com.keep.simple.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class MessageEditDTO {
    private String text;
    private UUID id;
}
