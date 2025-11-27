package com.example.backend.Model;

import java.util.List;

import lombok.Data;

@Data
public class Column {
    private String name;
    private String type;
    private List<String> constraints;
}