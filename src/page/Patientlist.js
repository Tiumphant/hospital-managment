import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./patientlist.css";
import DoctorDashboard from "./DoctorDashboard";

function Patientlist() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const update = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patient");
      if (Array.isArray(response.data)) {
        setData(response.data);
        setFilteredData(response.data); 
      } else {
        setData([]);
        setFilteredData([]);
        console.warn("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    update();
  }, []);

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

  const delData = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/patient/${id}`);
      const updatedList = data.filter((item) => item._id !== id);
      setData(updatedList);
      setFilteredData(updatedList);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <>
      <DoctorDashboard />
      <h1 className="text-center">List Of Patients</h1>
      <div style={{ margin: "10px" }}>
        <label>Search: </label>
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
            <th>Operations</th>
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
                <Link to={`/PatientD/${item._id}`}>
                  <button className="btn btn-warning m-1">Edit</button>
                </Link>
                <button
                  onClick={() => delData(item._id)}
                  className="btn btn-danger m-1"
                >
                  Delete
                </button>
              </td>
              <td>
              <Link to={`/patientCard/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Patientlist;


