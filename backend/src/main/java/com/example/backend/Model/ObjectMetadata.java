package com.example.backend.Model;

import lombok.Data;
import java.util.List;

@Data
public class ObjectMetadata {
    private String table;
    private String alias;
    private List<FieldMetadata> fields;
    private List<JoinMetadata> joins;
}