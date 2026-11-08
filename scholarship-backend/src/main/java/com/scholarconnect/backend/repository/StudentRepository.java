
package com.scholarconnect.backend.repository;

import com.scholarconnect.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find student profile using registered user ID
    Optional<Student> findByUserId(Long userId);

    // Check whether a student profile already exists
    boolean existsByUserId(Long userId);
}
