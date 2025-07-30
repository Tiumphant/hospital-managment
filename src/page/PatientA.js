import React, { useEffect, useState } from "react";
import "./patientlist.css";
import axios from "axios";
import PatientDashboard from "./PatientDashboard";

function PatientA() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/patient");
        setData(response.data); // Correct way to get data from axios response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = data.filter((user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  }, [searchItem, data]);

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <>
      <PatientDashboard />
      <h1 className="text-center">List Of Patients</h1>
      <div>
        Search:
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
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
              <td colSpan="7" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default PatientA;
