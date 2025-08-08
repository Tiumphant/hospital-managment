import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

function AppointmentD() {
  const [patient_id, setPatient_Id] = useState("");
  const [doctor_id, setDoctor_Id] = useState("");
  const [department_id, setDepartment_Id] = useState("");
  const [appointment_date, setAppointment_Date] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatients] = useState([]);
  const [department, setDepartments] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_URL;
  const api = `${BASE_URL}/api/appointment`;
  const doctorApi = `${BASE_URL}/api/role`;
  const patientApi = `${BASE_URL}/api/patient`;
  const departmentApi = `${BASE_URL}/api/department`;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [doctorRes, patientRes, departmentRes] = await Promise.all([
          axios.get(doctorApi),
          axios.get(patientApi),
          axios.get(departmentApi),
        ]);
        setDoctors(doctorRes.data);
        setPatients(patientRes.data);
        setDepartments(departmentRes.data);
        if (id) getOne();
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchAll();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, {
        patient_id,
        doctor_id,
        department_id,
        appointment_date,
        status,
        reason,
      });
      console.log("Appointment submitted:", response.data);
      navigate("/appointmentlist");
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  const editData = async () => {
    try {
      const response = await axios.put(`${api}/${id}`, {
        patient_id,
        doctor_id,
        department_id,
        appointment_date,
        status,
        reason,
      });
      console.log("Appointment updated:", response.data);
      navigate("/appointmentlist");
    } catch (error) {
      console.error("Edit error", error);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${api}/${id}`);
      console.log("Appointment deleted");
      navigate("/appointmentlist");
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const getOne = async () => {
    try {
      const response = await axios.get(`${api}/${id}`);
      const data = response.data;
      setPatient_Id(data.patient_id?._id);
      setDoctor_Id(data.doctor_id?._id);
      setDepartment_Id(data.department_id?._id);
      setAppointment_Date(data.appointment_date?.split("T")[0] || "");
      setStatus(data.status);
      setReason(data.reason);
    } catch (error) {
      console.error("Get appointment error", error);
    }
  };

  return (
    <>
      <DoctorDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center text-primary mb-4">
            {id ? "Edit Appointment" : "New Appointment"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Select Patient</label>
                <select
                  className="form-select"
                  value={patient_id}
                  onChange={(e) => setPatient_Id(e.target.value)}
                  required
                >
                  <option value="">-- Choose Patient --</option>
                  {patient.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Doctor</label>
                <select
                  className="form-select"
                  value={doctor_id}
                  onChange={(e) => setDoctor_Id(e.target.value)}
                  required
                >
                  <option value="">-- Choose Doctor --</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Department</label>
                <select
                  className="form-select"
                  value={department_id}
                  onChange={(e) => setDepartment_Id(e.target.value)}
                  required
                >
                  <option value="">-- Choose Department --</option>
                  {department.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Appointment Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={appointment_date}
                  onChange={(e) => setAppointment_Date(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Scheduled / Completed"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Reason for Appointment</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Enter reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-12 d-flex justify-content-center gap-3 mt-4">
                {!id && (
                  <button type="submit" className="btn btn-success btn-lg">
                    Submit
                  </button>
                )}
                {id && (
                  <>
                    <button
                      type="button"
                      onClick={editData}
                      className="btn btn-warning btn-lg"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={deleteData}
                      className="btn btn-danger btn-lg"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AppointmentD;
