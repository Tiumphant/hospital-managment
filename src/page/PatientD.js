import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Patient.css";
import DoctorDashboard from "./DoctorDashboard";

function PatientD() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const patientApi =
    "https://backend-hospital-managment.vercel.app/api/patient";

  useEffect(() => {
    fetchDoctors();
    if (id) fetchPatient();
  }, [id]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "https://backend-hospital-managment.vercel.app/api/role"
      );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        number,
        age,
        gender,
        address,
        assignedDoctor,
      };

      if (id) {
        const response = await axios.put(`${patientApi}/${id}`, payload);
        console.log("Updated:", response.data);
      } else {
        const response = await axios.post(patientApi, payload);
        console.log("Created:", response.data);
      }

      navigate("/patientA");
    } catch (error) {
      console.error("Error saving patient:", error);
      alert("Something went wrong. Please check your input.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;

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
      <DoctorDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-4">
          <h2 className="text-center text-primary">
            {id ? "Update Patient" : "Patient Registration"}
          </h2>
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
                placeholder="Email"
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

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success btn-lg">
                {id ? "Update" : "Submit"}
              </button>
              {id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger btn-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientD;
