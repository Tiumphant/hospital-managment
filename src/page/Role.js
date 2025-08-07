import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PatientDashboard from "./PatientDashboard";

function Role() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const urlapi = `${process.env.REACT_APP_API_URL}/api/role`;

  useEffect(() => {
    if (id) {
      fetchRole(id);
    }
  }, [id]);

  const fetchRole = async (id) => {
    try {
      const response = await axios.get(`${urlapi}/${id}`);
      if (response.status === 200) {
        setName(response.data.name);
        setDescription(response.data.description);
      }
    } catch (error) {
      console.error(
        "Error fetching role:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsEmpty(true);

    if (!name || !description) return;

    try {
      if (id) {
        await axios.put(`${urlapi}/${id}`, { name, description });
        console.log("Role updated successfully");
      } else {
        await axios.post(urlapi, { name, description });
        console.log("Role created successfully");
      }

      navigate("/roles"); // redirect to roles list (adjust route as needed)
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div>
      <PatientDashboard />
      <div className="container mt-4">
        <h2>{id ? "Edit Role" : "Create Role"}</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Role Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter role name"
              onChange={(e) => setName(e.target.value)}
            />
            {isEmpty && !name && (
              <div className="text-danger">Name must not be empty</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              type="text"
              className="form-control"
              value={description}
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
            {isEmpty && !description && (
              <div className="text-danger">Description must not be empty</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {id ? "Update Role" : "Create Role"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Role;
