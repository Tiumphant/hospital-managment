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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const apiBase = process.env.REACT_APP_API_URL;
  const api = `${apiBase}/api/patient`;
  const doctorApi = `${apiBase}/api/role`;

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
      const res = await axios.get(doctorApi);
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("assignedDoctor", assignedDoctor || "");
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Created:", res.data);
      navigate("/patientlist");
    } catch (err) {
      console.error("Create Error:", err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("assignedDoctor", assignedDoctor || "");
    if (image) formData.append("image", image);

    try {
      const res = await axios.put(`${api}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Updated:", res.data);
      navigate("/patientlist");
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      console.log("Deleted");
      navigate("/patientA");
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const getOne = async () => {
    try {
      const res = await axios.get(`${api}/${id}`);
      const data = res.data;

      setName(data.name || "");
      setEmail(data.email || "");
      setNumber(data.number || "");
      setAge(data.age || "");
      setGender(data.gender?.toLowerCase() || "");
      setAddress(data.address || "");
      setAssignedDoctor(data.assignedDoctor?._id || "");
      if (data.imageUrl) setPreview(data.imageUrl);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  return (
    <>
      <DoctorDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-4">
          <h2 className="text-center text-primary">Patient Registration</h2>
          <form onSubmit={id ? editData : handleSubmit} className="mt-4">
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
                onChange={handleImageChange}
              />
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxHeight: "150px" }}
                  />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success btn-lg">
                {id ? "Update" : "Submit"}
              </button>
              {id && (
                <button
                  type="button"
                  onClick={deleteData}
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
