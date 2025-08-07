import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function RolelistK() {
  const [roles, setRoles] = useState([]);
  const urlapi = "http://localhost:8080/api/role";

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(urlapi);
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const deleteRole = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${urlapi}/${id}`);
      alert("Role deleted successfully");
      fetchRoles();
    } catch (err) {
      console.error("Error deleting role:", err);
      alert("Failed to delete role");
    }
  };

  return (
    <div className="container-fluid">
      {/* Top Navbar or Sidebar Dashboard */}
      <Dashboard />

      {/* Main Content */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Manage Roles</h2>
          <Link to="/roleC" className="btn btn-success">
            + Add New Role
          </Link>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th style={{ width: "150px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role._id}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/roleC/${role._id}`}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteRole(role._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {roles.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      No roles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolelistK;
