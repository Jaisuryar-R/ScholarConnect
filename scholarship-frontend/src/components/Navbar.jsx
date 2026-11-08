
import { Link } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">S</span>
        ScholarConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/student-form">Find Scholarships</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="nav-auth-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-login-btn">
              Login
            </Link>

            <Link to="/register" className="nav-register-btn">
              Register
            </Link>
          </>
        )}

        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
