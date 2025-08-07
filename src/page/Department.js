import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

function Department() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [head_doctor_id, setHead_Doctor_Id] = useState("");
  const [doctors, setDoctors] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_URL;
  const api = `${BASE_URL}/api/department`;
  const doctorApi = `${BASE_URL}/api/role`;

  const { id } = useParams();
  const navigate = useNavigate();

  const Doctorfetch = async () => {
    try {
      const result = await axios.get(doctorApi);
      setDoctors(result.data);
    } catch (error) {
      console.error("Fetching error", error);
    }
  };

  useEffect(() => {
    Doctorfetch();
    if (id) {
      getOne();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, {
        name,
        description,
        head_doctor_id,
      });
      console.log("Form submitted successfully", response.data);
      navigate("/departmentlist");
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  const editData = async () => {
    try {
      const response = await axios.put(`${api}/${id}`, {
        name,
        description,
        head_doctor_id: head_doctor_id || null,
      });
      console.log("Successfully edited data", response.data);
      navigate("/departmentlist");
    } catch (error) {
      console.error("Edit error", error);
    }
  };

  const getOne = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      if (response.data) {
        setName(response.data.name);
        setDescription(response.data.description);
        setHead_Doctor_Id(response.data.head_doctor_id?._id || "");
      }
    } catch (error) {
      console.error("Get error:", error.response?.data || error.message);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      console.log("Data deleted successfully");
      navigate("/departmentlist");
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <>
      <DoctorDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg pt-4 rounded">
          <h2 className="text-center text-primary">Department Form</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Department name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                value={head_doctor_id}
                onChange={(e) => setHead_Doctor_Id(e.target.value)}
              >
                <option value="">Select Head Doctor (Optional)</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success btn-lg animate-button"
              >
                Submit
              </button>
              {id && (
                <>
                  <button
                    type="button"
                    onClick={editData}
                    className="btn btn-warning btn-lg animate-button"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={deleteData}
                    className="btn btn-danger btn-lg animate-button"
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
