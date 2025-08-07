import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Patient.css";
import Dashboard from "./Dashboard";

function PatientC() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [file, setFile] = useState(null);

  const api = "http://localhost:8080/api/patient";
  const doctorApi = "http://localhost:8080/api/role";

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
    if (id) {
      getOne();
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

  const getOne = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      if (response.data) {
        const data = response.data;
        setName(data.name || "");
        setEmail(data.email || "");
        setNumber(data.number || "");
        setAge(data.age || "");
        setGender(data.gender || "");
        setAddress(data.address || "");
        setAssignedDoctor(data.assignedDoctor || "");
      }
    } catch (error) {
      console.log("Error fetching patient:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", String(name).trim());
    formData.append("email", String(email).trim());
    formData.append("number", String(number).trim());
    formData.append("age", String(age).trim());
    formData.append("gender", String(gender).trim());
    formData.append("address", String(address).trim());
    formData.append("assignedDoctor", assignedDoctor);
    if (file) {
      formData.append("image", file);
    }

    try {
      if (id) {
        // Update existing patient
        await axios.put(`${api}/${id}`, formData);
        alert("Patient updated successfully!");
      } else {
        // Create new patient
        await axios.post(api, formData);
        alert("Patient created successfully!");
      }
      navigate("/patientlistK");
    } catch (error) {
      if (error.response?.status === 409) {
        const message =
          error.response?.data?.message || "Patient already exists.";
        alert(message);
      } else {
        console.error("Error submitting form:", error);
        alert("An unexpected error occurred while submitting the form.");
      }
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      alert("Patient deleted successfully.");
      navigate("/patientlistK");
    } catch (error) {
      console.log("Error deleting:", error);
      alert("Failed to delete patient.");
    }
  };

  return (
    <>
      <Dashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-4">
          <h2 className="text-center text-primary">
            {id ? "Edit Patient" : "Patient Registration"}
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
                required={!id} // image required only on create
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className={`btn btn-${
                  id ? "warning" : "success"
                } btn-lg animate-button`}
              >
                {id ? "Update" : "Submit"}
              </button>
              {id && (
                <button
                  type="button"
                  onClick={deleteData}
                  className="btn btn-danger btn-lg animate-button"
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

export default PatientC;
