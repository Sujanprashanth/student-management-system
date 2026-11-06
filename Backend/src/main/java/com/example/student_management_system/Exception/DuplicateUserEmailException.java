package com.example.student_management_system.Exception;

public class DuplicateUserEmailException extends RuntimeException {
    public DuplicateUserEmailException(String msg2){
        super(msg2);
    }
}
