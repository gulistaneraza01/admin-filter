package com.example.backend.Config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.springframework.context.annotation.Configuration;

import com.example.backend.Model.ObjectMetadata;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Configuration
public class MetadataLoader {

    private Map<String, ObjectMetadata> metadata;

    @PostConstruct
    public void init() throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        InputStream is = getClass()
                .getClassLoader()
                .getResourceAsStream("metadata/metadata.json");

        if (is == null) {
            throw new IOException("Cannot find metadata.json in classpath at metadata/metadata.json");
        }

        TypeReference<Map<String, ObjectMetadata>> typeRef = new TypeReference<Map<String, ObjectMetadata>>() {
        };

        metadata = mapper.readValue(is, typeRef);
    }

    public Map<String, ObjectMetadata> getAll() {
        return metadata;
    }

    public ObjectMetadata get(String objectName) {
        return metadata.get(objectName);
    }
}
