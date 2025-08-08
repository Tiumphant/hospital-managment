import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientDashboard from "./PatientDashboard";
import "./patientlist.css";

function PatientA() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend-hospital-managment.vercel.app/api/patient`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = data.filter((user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  }, [searchItem, data]);

  return (
    <>
      <PatientDashboard />
      <h1 className="text-center mt-3">List Of Patients</h1>

      <div className="search-box text-center mb-3">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search by patient name"
        />
      </div>

      <div className="table-responsive px-3">
        <table className="table table-bordered shadow">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Assigned Doctor</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.address}</td>
                  <td>{item.assignedDoctor?.name || "Not Assigned"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-danger">
                  No patient found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PatientA;
