import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./patientlist.css";
import Dashboard from "./Dashboard";

function PatientlistK() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch patient data
  const update = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patient");
      console.log("Fetched data:", response.data);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    update();
  }, []);

  // Search filter
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value) ||
      item.number.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  // Delete function
  const delData = async (id) => {
    try {
      console.log("Deleting patient with ID:", id);
      await axios.delete(`http://localhost:8000/api/patient/${id}`);
      
      alert("Patient deleted successfully");
      
      // Update the state after deletion
      setData((prevData) => prevData.filter((item) => item._id !== id));
      setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      alert("Error deleting user: " + (error.response?.data?.message ));
    }
  };
  
  return (
    <>
      <Dashboard/>
      <h1 className="text-center">List Of Patients</h1>
      <div>
        Search:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type to search"
        />
      </div>

      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Assigned Doctor</th>
            <th>Operation</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.number}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.address}</td>
              <td>{item.assignedDoctor?.name || "Not Assigned"}</td>

              <td>
                <button>
                  <Link to={`/PatientC/${item._id}`}>Edit</Link>
                </button>
                <button onClick={() => delData(item._id)}>Delete</button>
              </td>
              <td>
                <Link to={`/PatientCardK/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PatientlistK;
