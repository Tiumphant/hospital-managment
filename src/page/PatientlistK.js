import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./patientlist.css";
import Dashboard from "./Dashboard";

function PatientlistK() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/patient`
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(value) ||
        item.email?.toLowerCase().includes(value) ||
        item.number?.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/patient/${id}`);
      alert("Patient deleted successfully.");
      const newData = data.filter((item) => item._id !== id);
      setData(newData);
      setFilteredData(newData);
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Error deleting patient.");
    }
  };

  return (
    <>
      <Dashboard />
      <h1 className="text-center">List Of Patients</h1>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, or number"
        />
      </div>

      <table className="table table-bordered shadow mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Assigned Doctor</th>
            <th>Actions</th>
            <th>Card</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                <td>{item.assignedDoctor?.name || "Not Assigned"}</td>
                <td>
                  <Link to={`/PatientC/${item._id}`}>
                    <button className="btn btn-warning btn-sm">Edit</button>
                  </Link>{" "}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/PatientCardK/${item._id}`}>
                    <button className="btn btn-info btn-sm">View</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default PatientlistK;
