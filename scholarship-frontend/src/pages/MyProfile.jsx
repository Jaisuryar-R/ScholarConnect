
import { useEffect, useState } from "react";
import {
  getStudentProfile,
  addStudentForUser,
  updateStudentProfile
} from "../services/api";
import "../App.css";

function MyProfile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [student, setStudent] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    age: "",
    state: "Tamil Nadu",
    community: "",
    annualIncome: "",
    course: "B.E.",
    percentage: ""
  });

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const response = await getStudentProfile(user.id);

        setStudent(response.data);
        setProfileExists(true);
      } catch (err) {
        if (err.response?.status === 404) {
          setProfileExists(false);
          setError("Please complete your student profile.");
        } else {
          setError("Unable to connect to the profile service.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = {
        fullName: user.fullName,
        email: user.email,
        age: Number(student.age),
        state: student.state,
        community: student.community,
        annualIncome: Number(student.annualIncome),
        course: student.course,
        percentage: Number(student.percentage)
      };

      let response;

      if (profileExists) {
        response = await updateStudentProfile(user.id, data);
      } else {
        response = await addStudentForUser(user.id, data);
        setProfileExists(true);
      }

      setStudent(response.data);
      setSuccess(
        profileExists
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "Unable to save profile. Please try again.")
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="loading">Loading your profile...</p>;
  }

  return (
    <section className="student-page">

      <div className="form-heading">
        <span>MY ACCOUNT</span>
        <h1>My Student Profile</h1>
        <p>View and update your academic information.</p>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>

        <h2>Personal Information</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Full Name</label>
            <input value={student.fullName || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={student.email || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={student.age || ""}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={student.state || ""}
              onChange={handleChange}
              required
            >
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Community</label>
            <select
              name="community"
              value={student.community || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Community</option>
              <option value="OC">OC</option>
              <option value="BC">BC</option>
              <option value="MBC">MBC</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div className="form-group">
            <label>Annual Family Income (₹)</label>
            <input
              type="number"
              name="annualIncome"
              value={student.annualIncome || ""}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <select
              name="course"
              value={student.course || ""}
              onChange={handleChange}
              required
            >
              <option value="B.E.">B.E.</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.Com">B.Com</option>
              <option value="B.A.">B.A.</option>
              <option value="M.E.">M.E.</option>
            </select>
          </div>

          <div className="form-group">
            <label>Academic Percentage (%)</label>
            <input
              type="number"
              name="percentage"
              value={student.percentage || ""}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              required
            />
          </div>

        </div>

        {error && (
          <p className="error-message">{error}</p>
        )}

        {success && (
          <p className="success-message">{success}</p>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : profileExists
              ? "Update Profile"
              : "Create Profile"}
        </button>

      </form>
    </section>
  );
}

export default MyProfile;
