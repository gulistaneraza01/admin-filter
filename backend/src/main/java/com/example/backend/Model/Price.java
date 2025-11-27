package com.example.backend.Model;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID priceId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id", referencedColumnName = "courseId")
    private Course course;

    @Column(scale = 2)
    private BigDecimal amount;
}
