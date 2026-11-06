package com.example.student_management_system.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String,Object>> handleResponseStatusException(ResponseStatusException ex){
        Map<String,Object> map = new LinkedHashMap<>();
        int status = ex.getStatusCode().value();
        String message = ex.getReason()!=null?ex.getReason():"Request failed";
        map.put("status",status);
        map.put("message",message);
        return ResponseEntity.status(status).body(map);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        Map<String,Object> map1 = new LinkedHashMap<>();
        map1.put("status",400);
        map1.put("message","Validation failed");
        Map<String,String> hmap = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(err->hmap.put(err.getField(),err.getDefaultMessage()));
        map1.put("errors",hmap);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map1);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception ex) {
        Map<String,Object> lmap = new LinkedHashMap<>();
        lmap.put("status",500);
        lmap.put("message","Internal server error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(lmap);
    }

    @ExceptionHandler(DuplicateUserNameException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateUserNameException(DuplicateUserNameException ex){
        Map<String,Object> lmap1 = new LinkedHashMap<>();
        lmap1.put("status",409);
        lmap1.put("message", ex.getMessage());
        return ResponseEntity.status(409).body(lmap1);
    }

    @ExceptionHandler(DuplicateUserEmailException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateUserEmailException(DuplicateUserEmailException ex){
        Map<String,Object> lmap2 = new LinkedHashMap<>();
        lmap2.put("status",409);
        lmap2.put("message", ex.getMessage());
        return ResponseEntity.status(409).body(lmap2);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Map<String, Object>> handleInvalidCredentialsException(AuthenticationException ex){
        Map<String,Object> lmap3 = new LinkedHashMap<>();
        lmap3.put("status",401);
        lmap3.put("message","Invalid username or password");
        return ResponseEntity.status(401).body(lmap3);
    }
}
