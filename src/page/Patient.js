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

  const api = "http://localhost:8000/api/patient"; 
  const doctorApi = "http://localhost:8000/api/role";

  let { id } = useParams();
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(doctorApi);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    if (id) {
      getOne();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("assignedDoctor", assignedDoctor);

      if (file) {
        formData.append("file", file); 
      }

      const response = await axios.post(api, formData);
      console.log("Submitted:", response.data);
      navigate("/patientA");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("assignedDoctor", assignedDoctor);
      const response = await axios.put(`${api}/${id}`, formData);
      console.log(response.data);
      navigate("/patientA");
    } catch (error) {
      console.log("err in update patient:", error);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      console.log("delete successfully");
      navigate("/patientA");
    } catch (error) {
      console.log("err in deleting:", error);
    }
  };

  const getOne = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      if (response.data) {
        setName(response.data.name);
        setEmail(response.data.email );
        setNumber(response.data.number);
        setAge(response.data.age);
        setGender(response.data.gender);
        setAddress(response.data.address);
        setAssignedDoctor(response.data.assignedDoctor);
      }
    } catch (error) {
      console.log("err in  patient:", error);
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
              <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="mb-3">
              <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="mb-3">
              <select className="form-control" value={assignedDoctor} onChange={(e) => setAssignedDoctor(e.target.value)}>
                <option value="">Select Assigned Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input type="file"  className="form-control" placeholder="upload your image" onChange={(e) => setFile(e.target.files)} />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success btn-lg ">Submit</button>
              {id && (
                <>
                  <button type="button" onClick={editData} className="btn btn-warning btn-lg animate-button">Edit</button>
                  <button type="button" onClick={deleteData} className="btn btn-danger btn-lg animate-button">Delete</button>
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
