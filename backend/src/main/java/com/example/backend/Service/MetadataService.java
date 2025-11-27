package com.example.backend.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Config.MetadataLoader;
import com.example.backend.Model.ObjectMetadata;

@Service
public class MetadataService {

    @Autowired
    private MetadataLoader metadataLoader;

    public Map<String, ObjectMetadata> getMetadata() {
        return metadataLoader.getAll();
    }
}