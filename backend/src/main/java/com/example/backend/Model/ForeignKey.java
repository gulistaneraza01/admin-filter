package com.example.backend.Model;

import lombok.Data;

@Data
public class ForeignKey {
    private String column;
    private Reference references;
    private String name;
}
