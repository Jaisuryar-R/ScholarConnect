
import { useState } from "react";
import { applyForScholarship } from "../services/api";

function ScholarshipCard({
  scholarship,
  reason,
  studentId,
  isAlreadyApplied
}) {
  const [applied, setApplied] = useState(isAlreadyApplied);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    setLoading(true);
    setError("");

    try {
      await applyForScholarship(studentId, scholarship.id);
      setApplied(true);
    } catch (err) {
      const message = err.response?.data;

      if (
        typeof message === "string" &&
        message.toLowerCase().includes("already applied")
      ) {
        setApplied(true);
      } else {
        setError(
          typeof message === "string"
            ? message
            : "Unable to submit application."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scholarship-card">
      <div className="scholarship-icon">🎓</div>

      <h3>{scholarship.scholarshipName}</h3>

      <h2>
        ₹{Number(scholarship.scholarshipAmount).toLocaleString("en-IN")}
      </h2>

      <p>Scholarship Amount</p>

      <div className="scholarship-details">
        <p>Minimum Marks: {scholarship.minimumPercentage}%</p>
        <p>Maximum Income: ₹{scholarship.maximumIncome}</p>
        <p>Community: {scholarship.eligibleCommunity}</p>
        <p>Course: {scholarship.eligibleCourse}</p>
        <p>State: {scholarship.eligibleState}</p>
      </div>

      <p className="eligibility-reason">{reason}</p>

      <button
        className="apply-btn"
        onClick={handleApply}
        disabled={loading || applied}
      >
        {loading
          ? "Submitting..."
          : applied
          ? "Applied ✓"
          : "Apply Now →"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <a
        href={scholarship.applicationLink}
        target="_blank"
        rel="noreferrer"
      >
        Visit Official Application Link
      </a>
    </div>
  );
}

export default ScholarshipCard;
