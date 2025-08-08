// EditAppointment.js (or AppointmentForm.js)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://backend-hospital-managment.vercel.app/api/appointment/${id}`
      )
      .then((res) => setAppointment(res.data))
      .catch((err) => console.error("Error loading appointment:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://backend-hospital-managment.vercel.app/api/appointment/${id}`,
        appointment
      );
      alert("Appointment updated");
      navigate("/appointmentA");
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Reason</label>
          <input
            type="text"
            name="reason"
            value={appointment.reason}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            value={appointment.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {/* Add other fields as needed */}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditAppointment;
