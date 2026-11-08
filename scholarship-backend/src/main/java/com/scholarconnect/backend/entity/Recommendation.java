
package com.scholarconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private Long scholarshipId;

    private String eligibilityStatus;

    private String reason;

    public Recommendation() {
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

    public String getEligibilityStatus() {
        return eligibilityStatus;
    }

    public void setEligibilityStatus(String eligibilityStatus) {
        this.eligibilityStatus = eligibilityStatus;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
