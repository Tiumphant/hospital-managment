import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import PatientDashboard from "./PatientDashboard";

function Role() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const urlapi = "http://localhost:8000/api/role";
  const { id } = useParams();

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
      console.error("Error fetching role:", error.response?.data || error.message);
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
    } catch (error) {
      console.error("Error creating role:", error.response?.data || error.message);
    }
  };

  const updateRole = async (id) => {
    try {
      const response = await axios.put(`${urlapi}/${id}`, { name, description });
      if (response.status === 200) {
        console.log("Role updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating role:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <PatientDashboard/>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"value={name} placeholder="Name"onChange={(event) => setName(event.target.value)}
          />
          {isEmpty && !name && <span style={{ color: "red" }}>Must not be empty</span>}
        </label>
        <br />
        <label>
          <input
            type="text"  value={description} placeholder="Description"onChange={(event) => setDescription(event.target.value)}
          />
          {isEmpty && !description && <span style={{ color: "red" }}>Must not be empty</span>}
        </label>
        <br />
        <button type="submit">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default Role;