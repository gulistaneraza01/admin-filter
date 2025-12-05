package com.example.backend.Service.Impl;

import org.springframework.stereotype.Service;

import com.example.backend.DTO.CourseRequest;
import com.example.backend.DTO.EnrollmentRequest;
import com.example.backend.DTO.PriceRequest;
import com.example.backend.DTO.StudentRequest;

import com.example.backend.Model.Course;

import com.example.backend.Model.Enrollment;

import com.example.backend.Model.Price;
import com.example.backend.Model.Student;

import com.example.backend.Repository.CourseRepository;
import com.example.backend.Repository.EnrollmentRepository;
import com.example.backend.Repository.PriceRepository;
import com.example.backend.Repository.StudentRepository;
import com.example.backend.Service.ClientService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final PriceRepository priceRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    public String addStudent(StudentRequest studentRequest) {
        Student student = new Student();
        student.setName(studentRequest.getName());
        student.setDob(studentRequest.getDob());
        student.setQualification(studentRequest.getQualification());

        Student savedStudent = studentRepository.save(student);

        return "Student added successfully with ID: " + savedStudent.getStudentId();
    }

    @Override
    public String addCourse(CourseRequest courseRequest) {
        Course course = new Course();
        course.setCourseName(courseRequest.getCourseName());
        course.setTitle(courseRequest.getTitle());

        Course savedCourse = courseRepository.save(course);

        return "Course added successfully with ID: " + savedCourse.getCourseId();
    }

    @Override
    public String addPrice(PriceRequest priceRequest) {
        Course course = courseRepository.findById(priceRequest.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + priceRequest.getCourseId()));

        System.out.println(course);

        Price price = new Price();
        price.setCourse(course);
        price.setAmount(priceRequest.getAmount());

        Price savedPrice = priceRepository.save(price);

        return "Course added successfully with ID: " + savedPrice.getPriceId();
    }

    @Override
    public String addEnrollment(EnrollmentRequest enrollmentRequest) {
        Student student = studentRepository.findById(enrollmentRequest.getStudentId())
                .orElseThrow(
                        () -> new RuntimeException("Student not found with ID: " + enrollmentRequest.getStudentId()));

        Course course = courseRepository.findById(enrollmentRequest.getCourseId())
                .orElseThrow(
                        () -> new RuntimeException("Course not found with ID: " + enrollmentRequest.getCourseId()));

        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setStudent(student);

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return "Enrollment added successfully with ID: " + savedEnrollment.getEnrollmentId();
    }

}
