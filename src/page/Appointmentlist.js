import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL;
  const api = `${BASE_URL}/api/appointment`;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(api);
      setAppointments(response.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${api}/${id}`);
      setAppointments((prev) => prev.filter((item) => item._id !== id));
      console.log("Appointment deleted successfully");
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <>
      <DoctorDashboard />
      <div className="container py-4">
        <h2 className="text-center text-primary mb-4">List of Appointments</h2>

        {loading ? (
          <p className="text-center">Loading appointments...</p>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load appointments.
          </p>
        ) : appointments.length === 0 ? (
          <p className="text-center">No appointments found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered shadow-sm">
              <thead className="table-primary">
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
                {appointments.map((item) => (
                  <tr key={item._id}>
                    <td>{item.patient_id?.name || "Not Assigned"}</td>
                    <td>{item.doctor_id?.name || "Not Assigned"}</td>
                    <td>{item.department_id?.name || "Not Assigned"}</td>
                    <td>{new Date(item.appointment_date).toLocaleString()}</td>
                    <td>{item.status}</td>
                    <td>{item.reason}</td>
                    <td>
                      <Link to={`/appointmentD/${item._id}`}>
                        <button className="btn btn-sm btn-primary me-2">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteAppointment(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AppointmentList;
