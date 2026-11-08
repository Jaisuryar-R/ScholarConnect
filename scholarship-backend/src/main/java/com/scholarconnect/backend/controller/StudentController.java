
package com.scholarconnect.backend.controller;

import com.scholarconnect.backend.entity.Student;
import com.scholarconnect.backend.service.StudentService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Add student without account linking
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    // Add student and link to registered account
    @PostMapping("/user/{userId}")
    public Student addStudentForUser(
            @PathVariable Long userId,
            @RequestBody Student student) {

        return studentService.addStudent(userId, student);
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get student by ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Update student
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
    
// Get profile using registered user ID
@GetMapping("/user/{userId}")
public Student getStudentProfile(@PathVariable Long userId) {
    return studentService.getStudentByUserId(userId);
}

// Update profile using registered user ID
@PutMapping("/user/{userId}")
public Student updateStudentProfile(
        @PathVariable Long userId,
        @RequestBody Student student) {

    return studentService.updateStudentByUserId(userId, student);
}

}
