package com.example.student_management_system.DTO;

import java.time.LocalDateTime;

public class UserProfileResponse {
    private String username;
    private String email;
    private String role;
    private LocalDateTime memberSince;

    public UserProfileResponse(
            String username,
            String email,
            String role,
            LocalDateTime memberSince) {

        this.username = username;
        this.email = email;
        this.role = role;
        this.memberSince = memberSince;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getMemberSince() {
        return memberSince;
    }
}
