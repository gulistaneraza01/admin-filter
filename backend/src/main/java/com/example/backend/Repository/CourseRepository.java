package com.example.backend.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {

}
