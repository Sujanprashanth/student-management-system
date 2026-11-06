package com.example.student_management_system.DTO;

public class StudentResponse {
    private Integer stdId;
    private String stdName;
    private String stdCourse;

    public String getStdCourse() {
        return stdCourse;
    }

    public void setStdCourse(String stdCourse) {
        this.stdCourse = stdCourse;
    }

    public String getStdName() {
        return stdName;
    }

    public void setStdName(String stdName) {
        this.stdName = stdName;
    }

    public Integer getStdId() {
        return stdId;
    }

    public void setStdId(Integer stdId) {
        this.stdId = stdId;
    }

    public StudentResponse() {

    }

    public StudentResponse(Integer stdId, String stdName, String stdCourse) {
        this.stdId = stdId;
        this.stdName = stdName;
        this.stdCourse = stdCourse;
    }
}
