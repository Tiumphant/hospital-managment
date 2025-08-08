// src/components/AppointmentA.js

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";

function AppointmentA() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://backend-hospital-managment.vercel.app";
  const api = `${BASE_URL}/api/appointment`;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(api);
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      await axios.delete(`${api}/${id}`);
      setAppointments((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  return (
    <>
      <PatientDashboard />
      <div className="container py-4">
        <h2 className="text-center text-primary mb-4">List of Appointments</h2>

        {loading ? (
          <p className="text-center">Loading appointments...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((item) => (
                    <tr key={item._id}>
                      <td>{item.patient_id?.name || "Not Assigned"}</td>
                      <td>{item.doctor_id?.name || "Not Assigned"}</td>
                      <td>{item.department_id?.name || "Not Assigned"}</td>
                      <td>
                        {item.appointment_date
                          ? new Date(item.appointment_date).toLocaleDateString()
                          : "Not Set"}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.reason}</td>
                      <td>
                        <Link to={`/editappointment/${item._id}`}>
                          <button className="btn btn-sm btn-primary me-2">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AppointmentA;
