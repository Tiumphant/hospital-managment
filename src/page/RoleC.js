import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";

function RoleC() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const urlapi = "http://localhost:8000/api/role";
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
      navigate("/rolelistK")
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
      navigate("/rolelistK")
    } catch (error) {
      console.error("Error updating role:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Dashboard/>
      <form onSubmit={handleSubmit} className="container ">
        <label className="text-center " >
         Name <input
            type="text"value={name} placeholder="Name"onChange={(event) => setName(event.target.value)}
          />
          {isEmpty && !name && <span style={{ color: "red" }}>Must not be empty</span>}
        </label>
        <br /><br />
        <label>
         Description <input
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

export default RoleC;