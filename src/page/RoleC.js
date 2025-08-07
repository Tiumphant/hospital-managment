import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function RoleC() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const urlapi = "http://localhost:8080/api/role";
  const { id } = useParams();
  const navigate = useNavigate();

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

    if (!name || !description) {
      return;
    }

    try {
      if (id) {
        await updateRole(id);
      } else {
        await createRole();
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const createRole = async () => {
    try {
      const response = await axios.post(urlapi, { name, description });
      if (response.status === 201) {
        console.log("Role created successfully:", response.data);
      }
      navigate("/rolelistK");
    } catch (error) {
      console.error(
        "Error creating role:",
        error.response?.data || error.message
      );
    }
  };

  const updateRole = async (id) => {
    try {
      const response = await axios.put(`${urlapi}/${id}`, {
        name,
        description,
      });
      if (response.status === 200) {
        console.log("Role updated successfully:", response.data);
      }
      navigate("/rolelistK");
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Dashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-primary mb-4">
            {id ? "Update Role" : "Add Role"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder="Enter Role Name"
                onChange={(e) => setName(e.target.value)}
              />
              {isEmpty && !name && (
                <div className="text-danger mt-1">Name must not be empty</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              {isEmpty && !description && (
                <div className="text-danger mt-1">
                  Description must not be empty
                </div>
              )}
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className={`btn ${id ? "btn-warning" : "btn-success"} btn-lg`}
              >
                {id ? "Update Role" : "Create Role"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RoleC;
