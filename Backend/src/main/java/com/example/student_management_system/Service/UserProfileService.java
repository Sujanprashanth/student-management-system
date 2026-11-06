package com.example.student_management_system.Service;

import com.example.student_management_system.DTO.UserProfileResponse;
import com.example.student_management_system.Entity.UserEntity;
import com.example.student_management_system.Repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {
    private final UserRepository userRepository;

    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileResponse getLoggedInUserProfile() {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getMemberSince()
        );
    }
}
