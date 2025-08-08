import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

function Department() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [head_doctor_id, setHead_Doctor_Id] = useState("");
  const [doctors, setDoctors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const BASE_URL =
    process.env.REACT_APP_API_URL ||
    "https://backend-hospital-managment.vercel.app";
  const api = `${BASE_URL}/api/department`;
  const doctorApi = `${BASE_URL}/api/role`;

  useEffect(() => {
    fetchDoctors();
    if (id) {
      fetchDepartment();
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

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      const data = response.data;
      setName(data.name);
      setDescription(data.description);
      setHead_Doctor_Id(data.head_doctor_id?._id || "");
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(api, { name, description, head_doctor_id });
      alert("Department created successfully!");
      navigate("/departmentlist");
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${api}/${id}`, { name, description, head_doctor_id });
      alert("Department updated successfully!");
      navigate("/departmentlist");
    } catch (error) {
      console.error("Error editing department:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      await axios.delete(`${api}/${id}`);
      alert("Department deleted successfully!");
      navigate("/departmentlist");
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <>
      <DoctorDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center text-primary mb-4">
            {id ? "Edit Department" : "Add Department"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Department Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter department name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter department description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Head Doctor (optional)</label>
              <select
                className="form-select"
                value={head_doctor_id}
                onChange={(e) => setHead_Doctor_Id(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-between">
              {!id ? (
                <button type="submit" className="btn btn-success btn-lg w-100">
                  Submit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="btn btn-warning btn-lg me-2 w-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-danger btn-lg w-100"
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

export default Department;
