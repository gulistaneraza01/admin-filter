package com.example.backend.Model;

import lombok.Data;

@Data
public class JoinMetadata {
    private String target;
    private String localColumn;
    private String foreignColumn;
}
