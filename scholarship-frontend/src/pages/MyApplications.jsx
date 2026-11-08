
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudentProfile,
  getMyApplications
} from "../services/api";
import {
  FileText,
  ExternalLink,
  ArrowLeft,
  Bell,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import "../App.css";

function MyApplications() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      if (!user?.id) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const profileResponse = await getStudentProfile(user.id);
        const studentId = profileResponse.data.id;

        const response = await getMyApplications(studentId);
        setApplications(response.data);
      } catch (err) {
        setError(
          "Unable to load applications. Please complete your profile first."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  const getStatusNotification = (status) => {
    switch (status) {
      case "APPROVED":
        return {
          message: "Congratulations! Your scholarship application has been approved.",
          icon: <CheckCircle size={22} />,
          className: "notification-approved"
        };

      case "REJECTED":
        return {
          message: "Your scholarship application was rejected. Please check the application details.",
          icon: <XCircle size={22} />,
          className: "notification-rejected"
        };

      case "UNDER_REVIEW":
        return {
          message: "Your application is currently under review by the administration.",
          icon: <Clock size={22} />,
          className: "notification-review"
        };

      default:
        return {
          message: "Your application has been submitted successfully. Waiting for admin review.",
          icon: <Clock size={22} />,
          className: "notification-applied"
        };
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "status-approved";
      case "REJECTED":
        return "status-rejected";
      case "UNDER_REVIEW":
        return "status-review";
      default:
        return "status-applied";
    }
  };

  if (loading) {
    return <p className="loading">Loading your applications...</p>;
  }

  return (
    <section className="applications-page">

      <div className="applications-heading">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} /> Dashboard
        </button>

        <span>STUDENT ACCOUNT</span>
        <h1>My Applications</h1>
        <p>Track your scholarship applications and admin updates.</p>
      </div>

      <div className="application-summary">
        <div>
          <h2>{applications.length}</h2>
          <p>Total Applications</p>
        </div>

        <div>
          <h2>
            {applications.filter(a => a.status === "APPROVED").length}
          </h2>
          <p>Approved</p>
        </div>

        <div>
          <h2>
            {applications.filter(a => a.status === "APPLIED").length}
          </h2>
          <p>Applied</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!error && applications.length === 0 ? (
        <div className="empty-state">
          <FileText size={45} />
          <h2>No Applications Yet</h2>
          <p>You haven't applied for any scholarships yet.</p>

          <button
            className="submit-btn"
            onClick={() => navigate("/student-form")}
          >
            Find Scholarships
          </button>
        </div>
      ) : (
        <>
          {applications.some(a =>
            ["APPROVED", "REJECTED", "UNDER_REVIEW"].includes(a.status)
          ) && (
            <div className="student-notifications">
              <h2>
                <Bell size={22} /> Application Notifications
              </h2>

              {applications
                .filter(a =>
                  ["APPROVED", "REJECTED", "UNDER_REVIEW"].includes(a.status)
                )
                .map(application => {
                  const notification =
                    getStatusNotification(application.status);

                  return (
                    <div
                      className={`notification-card ${notification.className}`}
                      key={application.id}
                    >
                      {notification.icon}

                      <div>
                        <strong>{application.scholarshipName}</strong>
                        <p>{notification.message}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          <div className="applications-list">
            {applications.map(application => (
              <div className="application-card" key={application.id}>

                <div className="application-card-header">
                  <FileText size={28} />

                  <span className={statusColor(application.status)}>
                    {application.status.replace("_", " ")}
                  </span>
                </div>

                <h2>{application.scholarshipName}</h2>

                <h3>
                  ₹{Number(application.scholarshipAmount).toLocaleString("en-IN")}
                </h3>

                <div className="application-info">
                  <p>Application ID: {application.id}</p>
                  <p>Student ID: {application.studentId}</p>
                  <p>
                    Applied On:{" "}
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleDateString("en-IN")
                      : "Not available"}
                  </p>
                </div>

                <a
                  href={application.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="application-link"
                >
                  Visit Application Website <ExternalLink size={15} />
                </a>

              </div>
            ))}
          </div>
        </>
      )}

    </section>
  );
}

export default MyApplications;
