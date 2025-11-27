package com.example.backend.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

}
