
package com.scholarconnect.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "scholarships")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String scholarshipName;

    private Double minimumPercentage;

    private BigDecimal maximumIncome;

    private String eligibleCommunity;

    private String eligibleCourse;

    private String eligibleState;

    private BigDecimal scholarshipAmount;

    private String applicationLink;

    public Scholarship() {
    }

    public Long getId() {
        return id;
    }

    public String getScholarshipName() {
        return scholarshipName;
    }

    public void setScholarshipName(String scholarshipName) {
        this.scholarshipName = scholarshipName;
    }

    public Double getMinimumPercentage() {
        return minimumPercentage;
    }

    public void setMinimumPercentage(Double minimumPercentage) {
        this.minimumPercentage = minimumPercentage;
    }

    public BigDecimal getMaximumIncome() {
        return maximumIncome;
    }

    public void setMaximumIncome(BigDecimal maximumIncome) {
        this.maximumIncome = maximumIncome;
    }

    public String getEligibleCommunity() {
        return eligibleCommunity;
    }

    public void setEligibleCommunity(String eligibleCommunity) {
        this.eligibleCommunity = eligibleCommunity;
    }

    public String getEligibleCourse() {
        return eligibleCourse;
    }

    public void setEligibleCourse(String eligibleCourse) {
        this.eligibleCourse = eligibleCourse;
    }

    public String getEligibleState() {
        return eligibleState;
    }

    public void setEligibleState(String eligibleState) {
        this.eligibleState = eligibleState;
    }

    public BigDecimal getScholarshipAmount() {
        return scholarshipAmount;
    }

    public void setScholarshipAmount(BigDecimal scholarshipAmount) {
        this.scholarshipAmount = scholarshipAmount;
    }

    public String getApplicationLink() {
        return applicationLink;
    }

    public void setApplicationLink(String applicationLink) {
        this.applicationLink = applicationLink;
    }
}
