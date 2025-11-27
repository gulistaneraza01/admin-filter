package com.example.backend.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Model.ObjectMetadata;
import com.example.backend.Service.MetadataService;
import com.example.backend.Service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private MetadataService metadataService;

    private final ReportService reportService;

    @GetMapping("/getMetaData")
    public ResponseEntity<Map<String, ObjectMetadata>> getMetadata() {
        return ResponseEntity.ok(metadataService.getMetadata());
    }

}
