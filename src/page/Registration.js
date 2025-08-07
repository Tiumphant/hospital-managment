import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./registration.css";

function Registration() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    details: {},
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const api = `${API_BASE_URL}/api/registration`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, details: { ...form.details, [name]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        age: form.age,
        gender: form.gender,
        contactNumber: form.contactNumber,
        email: form.email,
        password: form.password,
        role: form.role,
        details: form.details,
      };

      if (id) {
        await axios.put(`${api}/${id}`, payload);
        console.log("User updated.");
      } else {
        await axios.post(api, payload);
        console.log("Registration successful.");
      }

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="registration">
      <div className="card">
        <h2>Registration Form</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            className="form-control mb-3"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            className="form-control mb-3"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="contactNumber"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={form.contactNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            className="form-control mb-3"
            placeholder="Age"
            value={form.age}
            onChange={handleInputChange}
            required
          />
          <select
            name="gender"
            className="form-control mb-3"
            value={form.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <label>Select Role:</label>
          <select
            name="role"
            className="form-control mb-3"
            value={form.role}
            onChange={handleInputChange}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          {form.role === "patient" && (
            <input
              type="text"
              name="diagnosis"
              className="form-control mb-3"
              placeholder="Enter Diagnosis"
              onChange={handleDetailsChange}
            />
          )}

          {form.role === "doctor" && (
            <>
              <input
                type="text"
                name="specialization"
                className="form-control mb-3"
                placeholder="Enter Specialization"
                onChange={handleDetailsChange}
              />
              <input
                type="number"
                name="experience"
                className="form-control mb-3"
                placeholder="Enter Experience (Years)"
                onChange={handleDetailsChange}
              />
            </>
          )}

          {form.role === "admin" && (
            <input
              type="text"
              name="uniqueIdentity"
              className="form-control mb-3"
              placeholder="Enter Unique Identity"
              onChange={handleDetailsChange}
            />
          )}

          <button type="submit" className="btn btn-primary w-100">
            {id ? "Update" : "Register"}
          </button>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
