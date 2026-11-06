package com.example.student_management_system.Controller;

import com.example.student_management_system.DTO.LoginRequest;
import com.example.student_management_system.DTO.LoginResponse;
import com.example.student_management_system.Service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserLoginController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserLoginController(JwtService jwtService,AuthenticationManager authenticationManager){
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> handleLogin(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        String token = jwtService.generateToken(authentication.getName());
        return ResponseEntity.ok(new LoginResponse("Login successful",token));
    }
}
