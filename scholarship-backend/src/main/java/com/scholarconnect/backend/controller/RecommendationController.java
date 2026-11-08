
package com.scholarconnect.backend.controller;

import com.scholarconnect.backend.entity.Recommendation;
import com.scholarconnect.backend.service.RecommendationService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    // Get scholarship recommendations for a student
    @GetMapping("/{studentId}")
    public List<Recommendation> getRecommendations(
            @PathVariable Long studentId) {

        return recommendationService.recommendScholarships(studentId);
    }
}
