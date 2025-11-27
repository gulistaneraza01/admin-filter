package com.example.backend.Service.Impl;

import org.springframework.stereotype.Service;

import com.example.backend.Service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public String getMetaData() {
        return "hello from tomcat server";
    }
}
