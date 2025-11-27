package com.example.backend.Service;

import java.util.List;

import com.example.backend.DTO.CourseRequest;
import com.example.backend.DTO.EnrollmentRequest;
import com.example.backend.DTO.PriceRequest;
import com.example.backend.DTO.StudentRequest;
import com.example.backend.Model.DatabaseSchema;

public interface ClientService {

    String addStudent(StudentRequest studentRequest);

    String addCourse(CourseRequest courseRequest);

    String addPrice(PriceRequest priceRequest);

    String addEnrollment(EnrollmentRequest enrollmentRequest);

    List<String> convertJsonToSql(DatabaseSchema schema);
}
