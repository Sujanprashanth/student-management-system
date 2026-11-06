package com.example.student_management_system.Controller;

import com.example.student_management_system.DTO.RegisterRequest;
import com.example.student_management_system.Entity.UserEntity;
import com.example.student_management_system.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserRegisterController {

    private final UserService userService;

    public UserRegisterController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> userRegister(@Valid @RequestBody RegisterRequest registerRequest){
        String user = userService.registerUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
