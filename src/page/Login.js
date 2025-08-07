import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./registration.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token", JSON.stringify(data));
      localStorage.setItem("role", data.role);

      console.log("Login successful:", data);

      // Navigate based on role
      if (data.role === "patient") {
        navigate("/patientdashboard");
      } else if (data.role === "doctor") {
        navigate("/doctordashboard");
      } else if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        setError("This role is not registered.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="registration">
      <div className="left">
        <h2 className="h2 text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/registration" className="text-primary">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
