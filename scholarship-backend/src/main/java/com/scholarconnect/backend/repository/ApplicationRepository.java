
package com.scholarconnect.backend.repository;

import com.scholarconnect.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Get all applications submitted by a student
    List<Application> findByStudentId(Long studentId);

    // Check whether student already applied
    boolean existsByStudentIdAndScholarshipId(
            Long studentId,
            Long scholarshipId
    );
}
