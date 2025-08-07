import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Patient.css";
import PatientDashboard from "./PatientDashboard";

function Patient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [file, setFile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const patientApi = `${apiBase}/api/patient`;
  const doctorApi = `${apiBase}/api/role`;

  useEffect(() => {
    fetchDoctors();
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(doctorApi);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`${patientApi}/${id}`);
      const data = response.data;
      setName(data.name);
      setEmail(data.email);
      setNumber(data.number);
      setAge(data.age);
      setGender(data.gender);
      setAddress(data.address);
      setAssignedDoctor(data.assignedDoctor);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("assignedDoctor", assignedDoctor);
    if (file) formData.append("file", file);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = buildFormData();
      const response = await axios.post(patientApi, formData);
      console.log("Submitted:", response.data);
      navigate("/patientA");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = buildFormData();
      const response = await axios.put(`${patientApi}/${id}`, formData);
      console.log("Updated:", response.data);
      navigate("/patientA");
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${patientApi}/${id}`);
      console.log("Deleted successfully");
      navigate("/patientA");
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <>
      <PatientDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-4">
          <h2 className="text-center text-primary">Patient Registration</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email (Optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <select
                className="form-control"
                value={assignedDoctor}
                onChange={(e) => setAssignedDoctor(e.target.value)}
              >
                <option value="">Select Assigned Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="d-flex justify-content-between">
              {!id ? (
                <button type="submit" className="btn btn-success btn-lg">
                  Submit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="btn btn-warning btn-lg"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-danger btn-lg"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Patient;
