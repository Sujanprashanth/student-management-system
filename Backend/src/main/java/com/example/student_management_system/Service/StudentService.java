package com.example.student_management_system.Service;

import com.example.student_management_system.DTO.StudentRequest;
import com.example.student_management_system.Entity.Student;
import com.example.student_management_system.Repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository=studentRepository;
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Student getStudentById(int id){
        Student student = studentRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Student not found"));
        return student;
    }

    public Student createStudent(StudentRequest std){
        Student student = new Student();
        student.setStdName(std.getStdName());
        student.setStdCourse(std.getStdCourse());
        return studentRepository.save(student);
    }

    public Student updateStudent(int id,StudentRequest updatedStd){
        Student student = studentRepository.findById(id)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Student not found"));
        student.setStdName(updatedStd.getStdName());
        student.setStdCourse(updatedStd.getStdCourse());
        return studentRepository.save(student);
    }

    public void deleteStudent(int id){
        if(!studentRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Student not found");
        }
        studentRepository.deleteById(id);
    }

    public Page<Student> getStudentsPaginated(Pageable pageable){
        return studentRepository.findAll(pageable);
    }

    public Page<Student> searchStudentsByName(String name, Pageable pageable) {
        return studentRepository.findByStdNameContainingIgnoreCase(name, pageable);
    }
}
