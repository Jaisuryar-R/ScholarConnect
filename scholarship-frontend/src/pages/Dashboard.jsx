
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Search,
  FileText,
  LogOut
} from "lucide-react";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.fullName || "Student"}!</h1>
          <p>Manage your scholarship journey from here.</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <User size={30} />
          <h3>My Account</h3>
          <p>{user?.email}</p>
          <button onClick={() => navigate("/my-profile")}>
  View My Profile
</button>
        </div>

        <div className="dashboard-card">
          <GraduationCap size={30} />
          <h3>My Profile</h3>
          <p>Add your academic and personal details.</p>
          <button onClick={() => navigate("/my-profile")}>
  Update Details
</button>
        </div>

        <div className="dashboard-card">
          <Search size={30} />
          <h3>Find Scholarships</h3>
          <p>Discover scholarships matching your eligibility.</p>
          <button onClick={() => navigate("/student-form")}>
            Find Now
          </button>
        </div>

        <div className="dashboard-card">
          <FileText size={30} />
          <h3>My Applications</h3>
          <p>Track your scholarship application progress.</p>
          <button onClick={() => navigate("/my-applications")}>
  View Applications
</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
