
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import StudentForm from './pages/StudentForm';
import Recommendations from './pages/Recommendations';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import MyApplications from './pages/MyApplications';

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-form"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <StudentForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-profile"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-applications"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations/:studentId"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <Recommendations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
