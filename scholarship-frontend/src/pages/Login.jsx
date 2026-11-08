
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      const userData = response.data;

      if (!userData.token) {
        setError("Login response does not contain an authentication token.");
        return;
      }

      // Save JWT token separately
      localStorage.setItem("token", userData.token);

      // Save user details
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect according to user role
      if (userData.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Login failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back!</h1>
        <p>Login to your ScholarConnect account</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
