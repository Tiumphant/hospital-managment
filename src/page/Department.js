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

  const api = "http://localhost:8080/api/department";
  const doctorApi = "http://localhost:8080/api/role";
  const { id } = useParams();
  const navigate = useNavigate();

  const Doctorfetch = async () => {
    try {
      let result = await axios.get(doctorApi);
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
      console.log("form submitted successfuly", response.data);
      navigate("/departmentlist");
    } catch (error) {
      console.error("fetching error", error);
    }
  };
  const editData = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error("Edit failed: No ID found");
      return;
    }
    try {
      let response = await axios.put(`${api}/${id}`, {
        name,
        description,
        head_doctor_id: head_doctor_id || null,
      });
      console.log("Successfully edited data", response.data);
      navigate("/departmentlist");
    } catch (error) {
      console.error("Error in edit API", error);
    }
  };
  const getOne = async () => {
    try {
      console.log("Fetching data from:", `${api}/${id}`);
      let response = await axios.get(`${api}/${id}`);
      console.log("Response data:", response.data);

      if (response.data) {
        setName(response.data.name);
        setDescription(response.data.description);
        setHead_Doctor_Id(response.data.head_doctor_id?._id || "");
      } else {
        console.log("No data returned from API");
      }
    } catch (error) {
      console.log(
        "Error in fetching department:",
        error.response?.data || error.message
      );
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      console.log("Data successfully deleted");
      navigate("/departmentlist");
    } catch (error) {
      console.error("Error deleting data", error);
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
                placeholder="department name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="description"
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
                onSubmit={(e) => handleSubmit(e)}
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
