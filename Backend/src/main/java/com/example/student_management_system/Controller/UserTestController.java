package com.example.student_management_system.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserTestController {

    @GetMapping("/test")
    public String handleTest(){
        return "this is user test controller";
    }
}
