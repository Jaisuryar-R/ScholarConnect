
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudentForUser } from '../services/api';

function StudentForm() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [student, setStudent] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    age: '',
    state: 'Tamil Nadu',
    community: '',
    annualIncome: '',
    course: '',
    percentage: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user?.id) {
      setError('Please login before submitting your profile.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = {
        age: Number(student.age),
        state: student.state,
        community: student.community,
        annualIncome: Number(student.annualIncome),
        course: student.course,
        percentage: Number(student.percentage)
      };

      const response = await addStudentForUser(user.id, data);

      navigate(`/recommendations/${response.data.id}`);

    } catch (error) {
      console.error(error.response?.data || error);

      setError(
        error.response?.data?.message ||
        'Unable to save details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="student-page">
      <div className="form-heading">
        <span>STUDENT PROFILE</span>
        <h1>Find Your Scholarship</h1>
        <p>Enter your academic details to discover matching scholarships.</p>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Personal Information</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullName"
              value={student.fullName}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={student.state}
              onChange={handleChange}
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
              value={student.community}
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
              value={student.annualIncome}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
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
              value={student.percentage}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              required
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Saving Profile...' : 'Find Matching Scholarships →'}
        </button>
      </form>
    </section>
  );
}

export default StudentForm;
