import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";

function AppointmentC() {
  const [patient_id, setPatient_Id] = useState("");
  const [doctor_id, setDoctor_Id] = useState("");
  const [department_id, setDepartment_Id] = useState("");
  const [appointment_date, setAppointment_Date] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);

  const api = "http://localhost:8080/api/appointment";
  const doctorApi = "http://localhost:8080/api/role";
  const patientApi = "http://localhost:8080/api/patient";
  const departmentApi = "http://localhost:8080/api/department";

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (id) getOne();
  }, [id]);

  const fetchData = async () => {
    try {
      const [doctorRes, patientRes, departmentRes] = await Promise.all([
        axios.get(doctorApi),
        axios.get(patientApi),
        axios.get(departmentApi),
      ]);
      setDoctors(doctorRes.data);
      setPatients(patientRes.data);
      setDepartments(departmentRes.data);
    } catch (error) {
      console.error("Fetching error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        patient_id: patient_id || null,
        doctor_id: doctor_id || null,
        department_id: department_id || null,
        appointment_date,
        status,
        reason,
      };
      const response = await axios.post(api, data);
      console.log("Form submitted successfully", response.data);
      navigate("/appointmentlistK");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    if (!id) return;
    try {
      const data = {
        patient_id,
        doctor_id,
        department_id,
        appointment_date,
        status,
        reason,
      };
      const response = await axios.put(`${api}/${id}`, data);
      console.log("Data edited successfully", response.data);
      navigate("/appointmentlistK");
    } catch (error) {
      console.error("Error editing data", error);
    }
  };

  const getOne = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      const a = response.data;
      setPatient_Id(a.patient_id || "");
      setDoctor_Id(a.doctor_id || "");
      setDepartment_Id(a.department_id || "");
      setAppointment_Date(a.appointment_date);
      setStatus(a.status);
      setReason(a.reason);
    } catch (error) {
      console.log("Error fetching appointment", error);
    }
  };

  const deleteData = async () => {
    if (!id) return;
    try {
      await axios.delete(`${api}/${id}`);
      console.log("Data deleted successfully");
      navigate("/appointmentlistK");
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <>
      <Dashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center text-primary mb-4">Appointment Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Select Patient</label>
                <select
                  className="form-control"
                  value={patient_id}
                  onChange={(e) => setPatient_Id(e.target.value)}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Doctor</label>
                <select
                  className="form-control"
                  value={doctor_id}
                  onChange={(e) => setDoctor_Id(e.target.value)}
                  required
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Department</label>
                <select
                  className="form-control"
                  value={department_id}
                  onChange={(e) => setDepartment_Id(e.target.value)}
                  required
                >
                  <option value="">-- Select Department --</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Appointment Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={appointment_date}
                  onChange={(e) => setAppointment_Date(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Scheduled"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Reason for Appointment</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Describe the reason for appointment"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="d-flex justify-content-between mt-4">
              {!id ? (
                <button type="submit" className="btn btn-success btn-lg">
                  Submit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={editData}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={deleteData}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AppointmentC;
