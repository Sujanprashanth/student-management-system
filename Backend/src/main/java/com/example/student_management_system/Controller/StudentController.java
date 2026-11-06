package com.example.student_management_system.Controller;

import com.example.student_management_system.DTO.StudentRequest;
import com.example.student_management_system.DTO.StudentResponse;
import com.example.student_management_system.Entity.Student;
import com.example.student_management_system.Service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }

    @GetMapping("/getStudents")
    public ResponseEntity<List<StudentResponse>> getAllStudentDetails(){
        List<StudentResponse> std = studentService.getAllStudents()
                .stream()
                .map(student -> new StudentResponse(
                                student.getStdId(),
                                student.getStdName(),
                                student.getStdCourse()))
                .toList();
        return ResponseEntity.ok(std);
    }

    @GetMapping("/getStudentById/{id}")
    public StudentResponse getStudentById(@PathVariable int id){
        Student std = studentService.getStudentById(id);
        return new StudentResponse(std.getStdId(),std.getStdName(), std.getStdCourse());
    }

    @GetMapping("/getStudentsPage")
    public Page<StudentResponse> getStudentsPaginated(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size,@RequestParam(defaultValue = "stdName,asc") String sort,@RequestParam(required = false) String name){
        String[] sortParts = sort.split(",");
        Sort.Direction direction;
        if (sortParts.length != 2) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Sort must contain a field and direction"
            );
        }
        if((!sortParts[0].equals("stdName")&&!sortParts[0].equals("stdCourse"))||(!sortParts[1].equalsIgnoreCase("asc")&&!sortParts[1].equalsIgnoreCase("desc"))){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Sort must contain a field and direction"
            );
        }

        if(sortParts[1].equalsIgnoreCase("asc")){
             direction=Sort.Direction.ASC;
        }
        else{
            direction=Sort.Direction.DESC;

        }
        if (size <= 0 || page < 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Page size must be greater than zero or page number should not be less than 0"
            );
        }
        Sort dir =Sort.by(direction, sortParts[0]);
        Pageable pageable1 = PageRequest.of(page,size,dir);
        if(name!=null && !name.isBlank()){
            Page<StudentResponse> page2 = studentService.searchStudentsByName(name,pageable1)
                    .map(some-> new StudentResponse(
                            some.getStdId(),
                            some.getStdName(),
                            some.getStdCourse()
                    ));
            return page2;
        }
        else{
            Page<StudentResponse> page1=studentService.getStudentsPaginated(pageable1)
                    .map(some-> new StudentResponse(
                            some.getStdId(),
                            some.getStdName(),
                            some.getStdCourse()
                    ));
            return page1;
        }
    }

    @PostMapping("/createStudent")
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest student){
        Student std = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(new StudentResponse(std.getStdId(),std.getStdName(),std.getStdCourse()));
    }

    @PutMapping("/updateStudent/{id}")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable int id,@Valid @RequestBody StudentRequest student){
        Student std = studentService.updateStudent(id,student);
        return ResponseEntity.ok(new StudentResponse(std.getStdId(), std.getStdName(), std.getStdCourse()));
    }

    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int id){
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
