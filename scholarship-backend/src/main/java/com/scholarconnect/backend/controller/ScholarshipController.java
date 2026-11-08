
package com.scholarconnect.backend.controller;

import com.scholarconnect.backend.entity.Scholarship;
import com.scholarconnect.backend.service.ScholarshipService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "http://localhost:5173")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    public ScholarshipController(ScholarshipService scholarshipService) {
        this.scholarshipService = scholarshipService;
    }

    // Add scholarship
    @PostMapping
    public Scholarship addScholarship(@RequestBody Scholarship scholarship) {
        return scholarshipService.addScholarship(scholarship);
    }

    // Get all scholarships
    @GetMapping
    public List<Scholarship> getAllScholarships() {
        return scholarshipService.getAllScholarships();
    }

    // Get scholarship by ID
    @GetMapping("/{id}")
    public Scholarship getScholarshipById(@PathVariable Long id) {
        return scholarshipService.getScholarshipById(id);
    }

    // Update scholarship
    @PutMapping("/{id}")
    public Scholarship updateScholarship(
            @PathVariable Long id,
            @RequestBody Scholarship scholarship) {
        return scholarshipService.updateScholarship(id, scholarship);
    }

    // Delete scholarship
    @DeleteMapping("/{id}")
    public String deleteScholarship(@PathVariable Long id) {
        scholarshipService.deleteScholarship(id);
        return "Scholarship deleted successfully";
    }
}
