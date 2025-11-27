package com.example.backend.Model;

import java.util.List;

import lombok.Data;

@Data
public class Table {
    private String name;
    private String primaryKey;
    private List<Column> columns;
    private List<ForeignKey> foreignKeys;
}