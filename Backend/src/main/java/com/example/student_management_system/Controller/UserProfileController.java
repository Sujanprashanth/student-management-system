package com.example.student_management_system.Controller;

import com.example.student_management_system.DTO.UserProfileResponse;
import com.example.student_management_system.Service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile() {

        UserProfileResponse profile =
                userProfileService.getLoggedInUserProfile();

        return ResponseEntity.ok(profile);
    }
}
