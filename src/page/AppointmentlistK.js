import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function AppointmentlistK() {
  const [data, setData] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_URL;
  const api = `${BASE_URL}/api/appointment`;

  useEffect(() => {
    axios
      .get(api)
      .then((response) => {
        setData(response.data);
        console.log("Fetched data:", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [api]);

  const Appointmentdelete = (id) => {
    axios
      .delete(`${api}/${id}`)
      .then((response) => {
        console.log("Data successfully deleted:", response.data);
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
      });
  };

  return (
    <>
      <Dashboard />
      <h1 className="text-center primary">List of Appointments</h1>
      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Department Name</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.patient_id?.name || "Not Assigned"}</td>
              <td>{item.doctor_id?.name || "Not Assigned"}</td>
              <td>{item.department_id?.name || "Not Assigned"}</td>
              <td>{new Date(item.appointment_date).toLocaleDateString()}</td>
              <td>{item.status}</td>
              <td>{item.reason}</td>
              <td>
                <Link to={`/appointmentC/${item._id}`}>
                  <button className="btn btn-primary mx-2">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => Appointmentdelete(item._id)}
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

export default AppointmentlistK;
