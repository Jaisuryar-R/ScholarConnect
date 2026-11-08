
package com.scholarconnect.backend.controller;

import com.scholarconnect.backend.entity.Application;
import com.scholarconnect.backend.service.ApplicationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Apply for a scholarship
    @PostMapping("/{studentId}/{scholarshipId}")
    public ResponseEntity<?> apply(
            @PathVariable Long studentId,
            @PathVariable Long scholarshipId) {

        try {
            Application application =
                    applicationService.apply(studentId, scholarshipId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(application);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all applications of a student
    @GetMapping("/student/{studentId}")
    public List<Application> getApplications(
            @PathVariable Long studentId) {

        return applicationService.getApplications(studentId);
    }

    // Get all applications (Admin)
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // Update application status (Admin)
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {

        try {
            Application updated =
                    applicationService.updateStatus(applicationId, status);

            return ResponseEntity.ok(updated);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
