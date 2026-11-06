package com.example.student_management_system.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "StudentInfo")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stdId;

    @NotBlank(message = "Name is required")
    private String stdName;

    @NotBlank(message = "Course is required")
    private String stdCourse;

    public Integer getStdId() {
        return stdId;
    }

    public void setStdId(Integer stdId) {
        this.stdId = stdId;
    }

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

    public Student() {

    }

    public Student(String stdName,String stdCourse) {
        this.stdName = stdName;
        this.stdCourse = stdCourse;
    }
}
