package com.example.student_management_system.Service;

import com.example.student_management_system.DTO.RegisterRequest;
import com.example.student_management_system.Entity.UserEntity;
import com.example.student_management_system.Exception.DuplicateUserEmailException;
import com.example.student_management_system.Exception.DuplicateUserNameException;
import com.example.student_management_system.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    public String registerUser(RegisterRequest registerRequest){
        if(userRepository.existsByUsername(registerRequest.getUsername())){
            throw new DuplicateUserNameException("Username already exist");
        }
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new DuplicateUserEmailException("Email already exist");
        }
        UserEntity user = new UserEntity();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);
        return "Registration successful";
    }
}
