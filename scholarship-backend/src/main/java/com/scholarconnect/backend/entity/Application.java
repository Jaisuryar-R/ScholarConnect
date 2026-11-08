
package com.scholarconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "applications",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"student_id", "scholarship_id"}
        )
    }
)
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "scholarship_id", nullable = false)
    private Long scholarshipId;

    private String scholarshipName;

    private Double scholarshipAmount;

    private String applicationLink;

    private String status = "APPLIED";

    private LocalDateTime appliedAt;

    @PrePersist
    public void onCreate() {
        appliedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(Long scholarshipId) {
        this.scholarshipId = scholarshipId;
    }

    public String getScholarshipName() {
        return scholarshipName;
    }

    public void setScholarshipName(String scholarshipName) {
        this.scholarshipName = scholarshipName;
    }

    public Double getScholarshipAmount() {
        return scholarshipAmount;
    }

    public void setScholarshipAmount(Double scholarshipAmount) {
        this.scholarshipAmount = scholarshipAmount;
    }

    public String getApplicationLink() {
        return applicationLink;
    }

    public void setApplicationLink(String applicationLink) {
        this.applicationLink = applicationLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }
}
