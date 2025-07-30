import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./registration.css";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const [isEmpty, setIsEmpty] = useState(false);

  
  const [formData, setFormData] = useState({
    role: "patient",
    details: {},
  });

  const navigate = useNavigate();
  const api = "http://localhost:8000/api/registration";
  const id = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
   setError("");
  
    setIsEmpty(true);
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (id.id) {
      putData();
    } else {
      postData();
    }
  };
  
    const postData = async (e) => { 
    try {
      const response = await axios.post(api, {
        firstName,
        lastName,
        age,
        gender,
        contactNumber,
        email,
        password,
        role: formData.role,
        details: formData.details,
      });

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };
 const putData = async(e)=>{
  e.preventDefault();
    try {
      const response = await axios.put(`${api}/${id}`, {
        firstName,lastName,age, gender,contactNumber,
        email,
        password,
        role: formData.role,
        details: formData.details, 
      });

      console.log( response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error updating:", error);
    }
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleDetailsChange = (e) => {
    setFormData({
      ...formData,
      details: { ...formData.details, [e.target.name]: e.target.value },
    });
  }

  return (
    <div className="registration">
      <div className="left">
        <h2 className="h2">Registration Form</h2>
   
        <form onSubmit={handleSubmit} className="mt-4 form registration container mt-2 justify-center">
         {error && <p className="text-danger text-center">{error}</p>}

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {/* {isEmpty && !firstName &&(<span style={{color: "red", textAlign: "center" }}>Should not be empty</span>)} */}
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number (10 digits)"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {isEmpty && !gender && ( <span style={{ color: "red", textAlign: "center" }}>select gender</span>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label>Select Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} className="form-control">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Dynamic Form Fields Based on Role */}
          {formData.role === "patient" && (
            <>
              <div className="mb-3">
                <label>Diagnosis:</label>
                <input
                  type="text"
                  className="form-control"
                  name="diagnosis"
                  placeholder="Enter Diagnosis"
                  onChange={handleDetailsChange}
                />
              </div>
            </>
          )}

          {formData.role === "doctor" && (
            <>
              <div className="mb-3">
                <label>Specialization:</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  placeholder="Enter Specialization"
                  onChange={handleDetailsChange}
                />
              </div>
              <div className="mb-3">
                <label>Experience (Years):</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  placeholder="Enter Experience"
                  onChange={handleDetailsChange}
                />
              </div>
            </>
          )}

          {formData.role === "admin" && (
            <>
              <div className="mb-3">
                <label>Unique Identity:</label>
                <input
                  type="text"
                  className="form-control"
                  name="uniqueIdentity"
                  placeholder="Enter Unique Identity"
                  onChange={handleDetailsChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Register
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
