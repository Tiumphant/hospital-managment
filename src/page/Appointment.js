import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";

function Appointment() {
  const [patientSearch, setPatientSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [patient_id, setPatient_Id] = useState("");
  const [doctor_id, setDoctor_Id] = useState("");
  const [department_id, setDepartment_Id] = useState("");
  const [appointment_date, setAppointment_Date] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [reason, setReason] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);

  const api = `https://backend-hospital-managment.vercel.app/api/appointment`;
  const doctorApi = `https://backend-hospital-managment.vercel.app/api/role`;
  const patientApi = `https://backend-hospital-managment.vercel.app/api/patient`;
  const departmentApi = `https://backend-hospital-managment.vercel.app/api/department`;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorRes, patientRes, deptRes] = await Promise.all([
          axios.get(doctorApi),
          axios.get(patientApi),
          axios.get(departmentApi),
        ]);
        setDoctors(doctorRes.data);
        setPatients(patientRes.data);
        setDepartments(deptRes.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchData();

    if (id) {
      getOne();
    }
  }, [id]);

  useEffect(() => {
    const filtered = patients.filter((p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [patientSearch, patients]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patient_id) {
      alert("Please select a valid patient from the list.");
      return;
    }

    try {
      const payload = {
        patient_id,
        doctor_id,
        department_id,
        status,
        reason,
        appointment_date,
      };

      let response;
      if (id) {
        response = await axios.put(`${api}/${id}`, payload);
        console.log("Appointment updated", response.data);
      } else {
        response = await axios.post(api, payload);
        console.log("Appointment created", response.data);
      }

      navigate("/appointmentA");
    } catch (error) {
      console.error("Submission error", error);
      alert("An error occurred while saving the appointment.");
    }
  };

  const getOne = async () => {
    try {
      const res = await axios.get(`${api}/${id}`);
      const data = res.data;
      setPatient_Id(data.patient_id || "");
      setDoctor_Id(data.doctor_id || "");
      setDepartment_Id(data.department_id || "");
      setAppointment_Date(data.appointment_date?.substring(0, 10) || "");
      setStatus(data.status || "Scheduled");
      setReason(data.reason || "");

      // Set patient name for editing view
      const selectedPatient = patients.find((p) => p._id === data.patient_id);
      if (selectedPatient) {
        setPatientSearch(selectedPatient.name);
      }
    } catch (err) {
      console.error("Error fetching appointment by ID:", err);
    }
  };

  return (
    <>
      <PatientDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg rounded p-4">
          <h2 className="text-center text-primary mb-4">
            {id ? "Edit Appointment" : "Book an Appointment"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Search Patient by Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter patient name"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                />
                {filteredPatients.length > 0 && (
                  <ul className="list-group mt-2">
                    {filteredPatients.map((patient) => (
                      <li
                        key={patient._id}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          setPatient_Id(patient._id);
                          setPatientSearch(patient.name);
                          setFilteredPatients([]);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {patient.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Select Doctor</label>
                <select
                  className="form-select"
                  value={doctor_id}
                  onChange={(e) => setDoctor_Id(e.target.value)}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Select Department</label>
                <select
                  className="form-select"
                  value={department_id}
                  onChange={(e) => setDepartment_Id(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

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
            </div>

            <div className="mb-3">
              <label className="form-label">Reason for Appointment</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter the reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                {id ? "Update Appointment" : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Appointment;
