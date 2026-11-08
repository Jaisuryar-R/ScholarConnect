
package com.scholarconnect.backend.service;

import com.scholarconnect.backend.entity.Student;
import com.scholarconnect.backend.entity.Scholarship;
import com.scholarconnect.backend.entity.Recommendation;

import com.scholarconnect.backend.repository.StudentRepository;
import com.scholarconnect.backend.repository.ScholarshipRepository;
import com.scholarconnect.backend.repository.RecommendationRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {

    private final StudentRepository studentRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final RecommendationRepository recommendationRepository;

    public RecommendationService(
            StudentRepository studentRepository,
            ScholarshipRepository scholarshipRepository,
            RecommendationRepository recommendationRepository) {

        this.studentRepository = studentRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.recommendationRepository = recommendationRepository;
    }

    public List<Recommendation> recommendScholarships(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Scholarship> scholarships = scholarshipRepository.findAll();

        List<Recommendation> results = new ArrayList<>();

        for (Scholarship scholarship : scholarships) {

            List<String> reasons = new ArrayList<>();

            if (student.getPercentage() == null ||
                scholarship.getMinimumPercentage() == null ||
                student.getPercentage() < scholarship.getMinimumPercentage()) {
                reasons.add("Minimum percentage requirement not met");
            }

            if (student.getAnnualIncome() == null ||
                scholarship.getMaximumIncome() == null ||
                student.getAnnualIncome().compareTo(scholarship.getMaximumIncome()) > 0) {
                reasons.add("Family income requirement not met");
            }

            if (!matches(student.getCommunity(), scholarship.getEligibleCommunity())) {
                reasons.add("Community requirement not met");
            }

            if (!matches(student.getCourse(), scholarship.getEligibleCourse())) {
                reasons.add("Course requirement not met");
            }

            if (!matches(student.getState(), scholarship.getEligibleState())) {
                reasons.add("State requirement not met");
            }

            Recommendation recommendation = new Recommendation();

            recommendation.setStudentId(studentId);
            recommendation.setScholarshipId(scholarship.getId());

            if (reasons.isEmpty()) {
                recommendation.setEligibilityStatus("ELIGIBLE");
                recommendation.setReason("All eligibility requirements satisfied");
            } else {
                recommendation.setEligibilityStatus("NOT_ELIGIBLE");
                recommendation.setReason(String.join(", ", reasons));
            }

            results.add(recommendationRepository.save(recommendation));
        }

        return results;
    }

    private boolean matches(String studentValue, String requiredValue) {

        if (studentValue == null || requiredValue == null) {
            return false;
        }

        return requiredValue.trim().equalsIgnoreCase("ALL")
                || studentValue.trim().equalsIgnoreCase(requiredValue.trim());
    }
}
