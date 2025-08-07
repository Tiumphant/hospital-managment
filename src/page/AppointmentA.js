import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";

function AppointmentA() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointment")
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  // Optional: delete functionality
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    axios
      .delete(`http://localhost:8080/api/appointment/${id}`)
      .then((res) => {
        setAppointments((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting appointment:", err);
      });
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
                        {new Date(item.appointment_date).toLocaleDateString()}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.reason}</td>
                      <td>
                        <Link to={`/appointment/${item._id}`}>
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
