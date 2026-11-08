
package com.scholarconnect.backend.service;

import com.scholarconnect.backend.entity.Application;
import com.scholarconnect.backend.entity.Scholarship;
import com.scholarconnect.backend.entity.Student;

import com.scholarconnect.backend.repository.ApplicationRepository;
import com.scholarconnect.backend.repository.ScholarshipRepository;
import com.scholarconnect.backend.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final StudentRepository studentRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            ScholarshipRepository scholarshipRepository,
            StudentRepository studentRepository) {

        this.applicationRepository = applicationRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.studentRepository = studentRepository;
    }

    // Apply for a scholarship
    public Application apply(Long studentId, Long scholarshipId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Scholarship scholarship = scholarshipRepository.findById(scholarshipId)
                .orElseThrow(() -> new RuntimeException("Scholarship not found"));

        if (applicationRepository.existsByStudentIdAndScholarshipId(
                studentId, scholarshipId)) {
            throw new RuntimeException(
                    "You have already applied for this scholarship");
        }

        Application application = new Application();

        application.setStudentId(student.getId());
        application.setScholarshipId(scholarship.getId());
        application.setScholarshipName(scholarship.getScholarshipName());
        application.setScholarshipAmount(
                scholarship.getScholarshipAmount().doubleValue()
        );
        application.setApplicationLink(scholarship.getApplicationLink());
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    // Get applications for a student
    public List<Application> getApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    // Get all applications (Admin)
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Update application status (Admin)
    public Application updateStatus(Long applicationId, String status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        Set<String> allowedStatuses = Set.of(
                "APPLIED",
                "UNDER_REVIEW",
                "APPROVED",
                "REJECTED"
        );

        String normalizedStatus = status.trim().toUpperCase()
                .replace(" ", "_");

        if (!allowedStatuses.contains(normalizedStatus)) {
            throw new RuntimeException("Invalid application status");
        }

        application.setStatus(normalizedStatus);

        return applicationRepository.save(application);
    }
}
