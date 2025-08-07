import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

function DepartmentC() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [headDoctorId, setHeadDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = "http://localhost:8080/api/department";
  const doctorApi = "http://localhost:8080/api/role";
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const result = await axios.get(doctorApi);
      setDoctors(result.data);
    } catch (error) {
      console.error("Fetching doctors failed", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    if (id) getOne();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(api, {
        name,
        description,
        head_doctor_id: headDoctorId || null,
      });
      console.log("Form submitted:", response.data);
      navigate("/departmentlistK");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const editData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.put(`${api}/${id}`, {
        name,
        description,
        head_doctor_id: headDoctorId || null,
      });
      console.log("Edited successfully:", response.data);
      navigate("/departmentlistK");
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      console.log("Deleted successfully");
      navigate("/departmentlistK");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getOne = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      if (response.data) {
        setName(response.data.name || "");
        setDescription(response.data.description || "");
        setHeadDoctorId(response.data.head_doctor_id?._id || "");
      }
    } catch (error) {
      console.log("Get one error:", error);
    }
  };

  return (
    <>
      <Dashboard />
      <div className="container mt-5">
        <div className="card shadow border-0 p-4 rounded-4">
          <h2 className="text-center text-primary mb-4">
            {id ? "Update Department" : "Create Department"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter department name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Head Doctor (optional)</label>
                <select
                  className="form-select form-select-lg"
                  value={headDoctorId}
                  onChange={(e) => setHeadDoctorId(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Head Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 d-flex gap-3 justify-content-end mt-4">
                {!id && (
                  <button
                    type="submit"
                    className="btn btn-success btn-lg px-5"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Create"}
                  </button>
                )}
                {id && (
                  <>
                    <button
                      type="button"
                      onClick={editData}
                      className="btn btn-warning btn-lg px-5"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                    <button
                      type="button"
                      onClick={deleteData}
                      className="btn btn-danger btn-lg px-5"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DepartmentC;
