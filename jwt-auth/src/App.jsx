import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [error, setError] = useState("");

  // Login function
  const handleLogin = () => {
    // Demo credentials
    if (username === "sahil" && password === "1234") {
      
      const userId = 101;
      const userRole = "student";

      // Create simulated JWT
      const simulatedToken = btoa(
        JSON.stringify({
          userId: userId,
          role: userRole
        })
      );

      // Store token and role
      localStorage.setItem("token", simulatedToken);
      localStorage.setItem("role", userRole);

      // Update React state
      setToken(simulatedToken);
      setRole(userRole);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  // Protected Dashboard
  if (token) {
    return (
      <div className="page">
        <div className="dashboard-card">

          <h1>Protected Dashboard</h1>

          <div className="success">
            ✓ Login Successful
          </div>

          <h2>Welcome, {username || "User"}!</h2>

          <div className="info">
            <p>
              <strong>User ID:</strong> 101
            </p>

            <p>
              <strong>Role:</strong> {role}
            </p>

            <p>
              <strong>Authentication:</strong> Verified
            </p>
          </div>

          <p className="message">
            You can access this Dashboard because a valid
            authentication token exists.
          </p>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    );
  }

  // Login Page
  return (
    <div className="page">
      <div className="login-card">

        <h1>JWT Authentication</h1>

        <p className="subtitle">
          Simple React Login System
        </p>

        <label>Username</label>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <div className="demo">
          <strong>Demo Credentials</strong>
          <p>Username: sahil</p>
          <p>Password: 1234</p>
        </div>

      </div>
    </div>
  );
}

export default App;