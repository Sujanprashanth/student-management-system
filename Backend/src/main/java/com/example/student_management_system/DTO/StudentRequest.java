package com.example.student_management_system.DTO;

import jakarta.validation.constraints.NotBlank;

public class StudentRequest {
    @NotBlank(message = "Name is required")
    private String stdName;
    @NotBlank(message = "Course is required")
    private String stdCourse;

    public String getStdName() {
        return stdName;
    }

    public void setStdName(String stdName) {
        this.stdName = stdName;
    }

    public String getStdCourse() {
        return stdCourse;
    }

    public void setStdCourse(String stdCourse) {
        this.stdCourse = stdCourse;
    }

    public StudentRequest() {

    }

}
