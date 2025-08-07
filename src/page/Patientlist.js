import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./patientlist.css";
import DoctorDashboard from "./DoctorDashboard";

function Patientlist() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/patient`
      );
      const patients = response.data;

      if (Array.isArray(patients)) {
        setData(patients);
        setFilteredData(patients);
      } else {
        console.warn("Unexpected response structure", patients);
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (patient) =>
        patient.name.toLowerCase().includes(value) ||
        patient.email.toLowerCase().includes(value) ||
        patient.number?.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  // Delete functionality
  const deletePatient = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/patient/${id}`);
      const updatedList = data.filter((patient) => patient._id !== id);
      setData(updatedList);
      setFilteredData(updatedList);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <>
      <DoctorDashboard />
      <div className="container">
        <h2 className="text-center my-3">List of Patients</h2>
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, email or number"
            className="form-control"
          />
        </div>

        <table className="table table-bordered table-striped shadow">
          <thead className="table-dark">
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
            {filteredData.length > 0 ? (
              filteredData.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.number}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.address}</td>
                  <td>{patient.assignedDoctor?.name || "Not Assigned"}</td>
                  <td>
                    <Link to={`/PatientD/${patient._id}`}>
                      <button className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePatient(patient._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/patientCard/${patient._id}`}>View</Link>
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
      </div>
    </>
  );
}

export default Patientlist;
