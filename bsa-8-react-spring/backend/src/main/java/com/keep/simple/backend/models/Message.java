package com.keep.simple.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String text;
    private Instant edit_date;
    private Instant date;
    private UUID id;
    private UUID user_id;
    private String name;
    private String avatar;
    private boolean isLiked;

}
