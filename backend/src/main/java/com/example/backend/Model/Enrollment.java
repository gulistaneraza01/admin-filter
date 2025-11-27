package com.example.backend.Model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID enrollmentId;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "studentId")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "courseId")
    private Course course;
}
