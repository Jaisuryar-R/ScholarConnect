
import { useEffect, useState } from 'react';
import {
  getScholarships,
  addScholarship,
  deleteScholarship,
  getAllApplications,
  updateApplicationStatus
} from '../services/api';

const emptyForm = {
  scholarshipName: '',
  minimumPercentage: '',
  maximumIncome: '',
  eligibleCommunity: '',
  eligibleCourse: '',
  eligibleState: '',
  scholarshipAmount: '',
  applicationLink: ''
};

function AdminDashboard() {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  async function loadScholarships() {
    const response = await getScholarships();
    setScholarships(response.data);
  }

  async function loadApplications() {
    const response = await getAllApplications();
    setApplications(response.data);
  }

  async function loadDashboard() {
    try {
      await Promise.all([loadScholarships(), loadApplications()]);
    } catch (error) {
      setMessage('Unable to load dashboard data.');
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = {
        ...form,
        minimumPercentage: Number(form.minimumPercentage),
        maximumIncome: Number(form.maximumIncome),
        scholarshipAmount: Number(form.scholarshipAmount)
      };

      await addScholarship(data);
      setForm(emptyForm);
      setMessage('Scholarship added successfully!');
      await loadScholarships();
    } catch (error) {
      setMessage('Unable to add scholarship.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this scholarship?')) return;

    try {
      await deleteScholarship(id);
      setMessage('Scholarship deleted successfully!');
      await loadScholarships();
    } catch (error) {
      setMessage('Unable to delete scholarship.');
    }
  }

  async function handleStatusChange(applicationId, status) {
    try {
      setUpdatingId(applicationId);

      await updateApplicationStatus(applicationId, status);

      setApplications(previous =>
        previous.map(application =>
          application.id === applicationId
            ? { ...application, status }
            : application
        )
      );

      setMessage('Application status updated successfully!');
    } catch (error) {
      setMessage('Unable to update application status.');
    } finally {
      setUpdatingId(null);
    }
  }

  const approvedCount = applications.filter(
    item => item.status === 'APPROVED'
  ).length;

  const rejectedCount = applications.filter(
    item => item.status === 'REJECTED'
  ).length;

  const pendingCount = applications.filter(
    item => item.status === 'APPLIED' ||
            item.status === 'UNDER_REVIEW'
  ).length;

  return (
    <section className="admin-page">

      <div className="section-heading">
        <span>ADMINISTRATION</span>
        <h1>Admin Dashboard</h1>
        <p>Manage scholarships and student applications.</p>
      </div>

      {message && (
        <p className="status-message">{message}</p>
      )}

      {/* APPLICATION SUMMARY */}
      <div className="application-summary">
        <div className="summary-card">
          <h3>Total Applications</h3>
          <h2>{applications.length}</h2>
        </div>

        <div className="summary-card">
          <h3>Approved</h3>
          <h2>{approvedCount}</h2>
        </div>

        <div className="summary-card">
          <h3>Pending / Review</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="summary-card">
          <h3>Rejected</h3>
          <h2>{rejectedCount}</h2>
        </div>
      </div>

      {/* APPLICATION MANAGEMENT */}
      <div className="admin-list">
        <h2>Student Applications ({applications.length})</h2>

        {applications.length === 0 ? (
          <p>No applications received yet.</p>
        ) : (
          applications.map(application => (
            <div className="admin-item" key={application.id}>
              <div>
                <h3>{application.scholarshipName}</h3>

                <p>
                  Application ID: {application.id}
                </p>

                <p>
                  Student ID: {application.studentId}
                </p>

                <p>
                  Scholarship Amount: ₹
                  {Number(application.scholarshipAmount).toLocaleString('en-IN')}
                </p>

                <p>
                  Applied At: {application.appliedAt
                    ? new Date(application.appliedAt).toLocaleString('en-IN')
                    : 'Not available'}
                </p>

                <p>
                  Current Status: <strong>{application.status}</strong>
                </p>

                <label>
                  Update Status:
                </label>

                <select
                  value={application.status}
                  disabled={updatingId === application.id}
                  onChange={e =>
                    handleStatusChange(
                      application.id,
                      e.target.value
                    )
                  }
                >
                  <option value="APPLIED">Applied</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>

                {updatingId === application.id && (
                  <p>Updating...</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD SCHOLARSHIP */}
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add New Scholarship</h2>

        <div className="form-grid">
          {[
            ['scholarshipName', 'Scholarship Name', 'text'],
            ['minimumPercentage', 'Minimum Percentage', 'number'],
            ['maximumIncome', 'Maximum Annual Income', 'number'],
            ['eligibleCommunity', 'Eligible Community', 'text'],
            ['eligibleCourse', 'Eligible Course', 'text'],
            ['eligibleState', 'Eligible State', 'text'],
            ['scholarshipAmount', 'Scholarship Amount', 'number'],
            ['applicationLink', 'Application Link', 'url']
          ].map(([name, label, type]) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Add Scholarship
        </button>
      </form>

      {/* EXISTING SCHOLARSHIPS */}
      <div className="admin-list">
        <h2>Existing Scholarships ({scholarships.length})</h2>

        {scholarships.map(item => (
          <div className="admin-item" key={item.id}>
            <div>
              <h3>{item.scholarshipName}</h3>
              <p>
                Amount: ₹
                {Number(item.scholarshipAmount).toLocaleString('en-IN')}
              </p>
            </div>

            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}

export default AdminDashboard;
