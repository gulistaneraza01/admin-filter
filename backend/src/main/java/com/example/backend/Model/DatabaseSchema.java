package com.example.backend.Model;

import java.util.List;

import lombok.Data;

@Data
public class DatabaseSchema {
    private String database;
    private List<Table> tables;
}