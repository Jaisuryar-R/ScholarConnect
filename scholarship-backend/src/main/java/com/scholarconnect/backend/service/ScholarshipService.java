
package com.scholarconnect.backend.service;

import com.scholarconnect.backend.entity.Scholarship;
import com.scholarconnect.backend.repository.ScholarshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;

    public ScholarshipService(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

    // Add scholarship
    public Scholarship addScholarship(Scholarship scholarship) {
        return scholarshipRepository.save(scholarship);
    }

    // Get all scholarships
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }

    // Get scholarship by ID
    public Scholarship getScholarshipById(Long id) {
        return scholarshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scholarship not found"));
    }

    // Update scholarship
    public Scholarship updateScholarship(Long id, Scholarship updatedScholarship) {

        Scholarship scholarship = getScholarshipById(id);

        scholarship.setScholarshipName(updatedScholarship.getScholarshipName());
        scholarship.setMinimumPercentage(updatedScholarship.getMinimumPercentage());
        scholarship.setMaximumIncome(updatedScholarship.getMaximumIncome());
        scholarship.setEligibleCommunity(updatedScholarship.getEligibleCommunity());
        scholarship.setEligibleCourse(updatedScholarship.getEligibleCourse());
        scholarship.setEligibleState(updatedScholarship.getEligibleState());
        scholarship.setScholarshipAmount(updatedScholarship.getScholarshipAmount());
        scholarship.setApplicationLink(updatedScholarship.getApplicationLink());

        return scholarshipRepository.save(scholarship);
    }

    // Delete scholarship
    public void deleteScholarship(Long id) {
        scholarshipRepository.deleteById(id);
    }
}
