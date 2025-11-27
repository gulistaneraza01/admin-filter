package com.example.backend.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Price;

public interface PriceRepository extends JpaRepository<Price, UUID> {

}
