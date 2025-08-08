import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function DepartmentlistK() {
  const [data, setData] = useState([]);

  const API_URL =
    "https://backend-hospital-managment.vercel.app/api/department";

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((response) => {
        setData(response.data);
        console.log("Fetched data:", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [API_URL]);

  function Departmentdelete(id) {
    axios
      .delete(`${API_URL}/${id}`)
      .then((response) => {
        console.log("Data successfully deleted:", response.data);
        setData((prevData) => prevData.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
      });
  }

  return (
    <>
      <Dashboard />
      <h1 className="text-center primary">List of Departments</h1>
      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Head Doctor</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.head_doctor_id?.name || "Not Assigned"}</td>
              <td>
                <Link to={`/departmentC/${item._id}`}>
                  <button className="btn btn-primary mx-2">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => Departmentdelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DepartmentlistK;
