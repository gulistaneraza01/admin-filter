package com.example.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.CourseRequest;
import com.example.backend.DTO.EnrollmentRequest;
import com.example.backend.DTO.PriceRequest;
import com.example.backend.DTO.StudentRequest;
import com.example.backend.Model.DatabaseSchema;
import com.example.backend.Service.ClientService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/add-student")
    public ResponseEntity<String> addStudent(@RequestBody StudentRequest studentRequest) {
        String result = clientService.addStudent(studentRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add-course")
    public ResponseEntity<String> addCourse(@RequestBody CourseRequest courseRequest) {
        String result = clientService.addCourse(courseRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add-price")
    public ResponseEntity<String> addPrice(@RequestBody PriceRequest priceRequest) {
        String result = clientService.addPrice(priceRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add-enroll")
    public ResponseEntity<String> addEnrollment(@RequestBody EnrollmentRequest enrollmentRequest) {
        String result = clientService.addEnrollment(enrollmentRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/json-sql")
    public List<String> generate(@RequestBody DatabaseSchema schema) {
        return clientService.convertJsonToSql(schema);
    }

}
