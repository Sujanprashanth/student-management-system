package com.example.student_management_system.Exception;

public class DuplicateUserNameException extends RuntimeException {
    public DuplicateUserNameException(String msg1){
        super(msg1);
    }
}
