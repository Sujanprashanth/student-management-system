package com.example.student_management_system.Repository;

import com.example.student_management_system.Entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Page<Student> findByStdNameContainingIgnoreCase(String name, Pageable pageable);
}
