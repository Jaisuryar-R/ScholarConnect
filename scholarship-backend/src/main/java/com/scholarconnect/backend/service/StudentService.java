
package com.scholarconnect.backend.service;

import com.scholarconnect.backend.entity.Student;
import com.scholarconnect.backend.entity.User;
import com.scholarconnect.backend.repository.StudentRepository;
import com.scholarconnect.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentService(
            StudentRepository studentRepository,
            UserRepository userRepository) {

        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    // Add student without account linking (existing functionality)
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Add student and link to registered user
    public Student addStudent(Long userId, Student student) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        student.setUser(user);
        student.setFullName(user.getFullName());
        student.setEmail(user.getEmail());

        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
    // Get student profile using registered user ID
public Student getStudentByUserId(Long userId) {
    return studentRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));
}

// Update profile using registered user ID
public Student updateStudentByUserId(Long userId, Student updatedStudent) {

    Student student = getStudentByUserId(userId);

    student.setAge(updatedStudent.getAge());
    student.setState(updatedStudent.getState());
    student.setCommunity(updatedStudent.getCommunity());
    student.setAnnualIncome(updatedStudent.getAnnualIncome());
    student.setCourse(updatedStudent.getCourse());
    student.setPercentage(updatedStudent.getPercentage());

    return studentRepository.save(student);
}

    // Update student
    public Student updateStudent(Long id, Student updatedStudent) {

        Student student = getStudentById(id);

        student.setFullName(updatedStudent.getFullName());
        student.setEmail(updatedStudent.getEmail());
        student.setAge(updatedStudent.getAge());
        student.setState(updatedStudent.getState());
        student.setCommunity(updatedStudent.getCommunity());
        student.setAnnualIncome(updatedStudent.getAnnualIncome());
        student.setCourse(updatedStudent.getCourse());
        student.setPercentage(updatedStudent.getPercentage());

        return studentRepository.save(student);
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
