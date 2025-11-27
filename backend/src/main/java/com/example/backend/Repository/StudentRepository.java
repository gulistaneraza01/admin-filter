package com.example.backend.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Student;

public interface StudentRepository extends JpaRepository<Student, UUID> {

}
