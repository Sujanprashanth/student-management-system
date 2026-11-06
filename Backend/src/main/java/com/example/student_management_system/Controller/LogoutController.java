package com.example.student_management_system.Controller;

import com.example.student_management_system.Service.JwtService;
import com.example.student_management_system.Service.TokenDenylistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class LogoutController {
    private final TokenDenylistService tokenDenylistService;
    private final JwtService jwtService;

    public LogoutController(TokenDenylistService tokenDenylistService,JwtService jwtService){
        this.jwtService=jwtService;
        this.tokenDenylistService=tokenDenylistService;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> handleLogout(@RequestHeader("Authorization") String auth) throws NoSuchAlgorithmException {
        if(auth.startsWith("Bearer ")){
            String token = auth.substring(7);
            Date d = jwtService.extractExpiration(token);
            tokenDenylistService.revokeToken(tokenDenylistService.hashToken(token),d.getTime());
            return ResponseEntity.status(HttpStatus.OK).body("Logout successful");
        }
        else{
            return ResponseEntity.status(401).body("unauthorized");
        }
    }
}
