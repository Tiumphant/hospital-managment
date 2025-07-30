import axios from 'axios'
import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import DoctorDashboard from "./DoctorDashboard";

function AppointmentD(){
    const[patient_id, setPatient_Id]= useState("");
    const[doctor_id, setDoctor_Id] = useState("");
    const[department_id, setDepartment_Id] = useState("")
    const [appointment_date, setAppointment_Date] = useState("");
    const [status, setStatus] = useState("");
    const [reason, setReason] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [patient, setPatients] = useState([]);
    const [department, setDepartments] = useState([]);



    const api = "http://localhost:8000/api/appointment";
    const doctorApi = "http://localhost:8000/api/role";
    const patientApi = "http://localhost:8000/api/patient";
    const departmentApi = "http://localhost:8000/api/department";
    const {id} = useParams()
    const navigate = useNavigate(); 
    const Doctorfetch = async() =>{
        try{
            let result = await axios.get(doctorApi)
            setDoctors(result.data)
        }catch(error){
            console.error("Fetching error", error)
        }
    }
    const Patientfetch = async() =>{
        try{
            let result = await axios.get(patientApi)
            setPatients(result.data)

        }catch(error){
            console.error("Fetching error", error)
        }
    }
    const Departmentfetch = async() =>{
        try{
            let result = await axios.get(departmentApi)
            setDepartments(result.data)

        }catch(error){
            console.error("Fetching error", error)
        }
    }

  useEffect(()=>{
    Doctorfetch()
    Patientfetch()
    Departmentfetch()
    if(id){
        getOne();
    }
  }, [id]);
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post(api,{
        patient_id:patient_id || null ,doctor_id: doctor_id || null ,department_id: department_id || null , status, reason, appointment_date
       });
        console.log("form submitted successfuly", response.data)
        navigate("/appointmentlist");

    }catch(error){
        console.error("fetching error", error)

    }

}
const editData = async (e) => {
  e.preventDefault();
  if (!id) {
      console.error("Edit failed: No ID found");
      return;
  }
  try {
      let response = await axios.put(`${api}/${id}`, {
        patient_id:patient_id  ,doctor_id: doctor_id ,department_id: department_id  , status, reason , appointment_date   
      });
      console.log("Successfully edited data", response.data);
      navigate("/appointmentlist");
  } catch (error) {
      console.error("Error in edit API", error);
  }
};
const getOne = async () => {
  try {
    console.log("Fetching data for ID:", id);
    let response = await axios.get(`${api}/${id}`);
    console.log("Response Data:", response.data);

    if (response.data) {
      setPatient_Id(response.data.patient_id?._id );
      setDoctor_Id(response.data.doctor_id?._id );
      setDepartment_Id(response.data.department_id?._id || "");
      if (response.data.appointment_date) {
        const datePart = response.data.appointment_date.split('T')[0]
        setAppointment_Date(datePart);
      } else {
          setAppointment_Date('');
      }

      setStatus(response.data.status);
      setReason(response.data.reason);
    }
  } catch (error) {
    console.log("err in appointment", error.response?.data );
  }
};
const deleteData = async()=>{
  try{
      await axios.delete(`${api}/${id}`)
      console.log("deleted data successfuly")
      navigate("/appointmentlist")

  }catch{
    console.log("err in deleted data")

  }
}

return(
  <>
  <DoctorDashboard/>
<div className="container mt-5">
<div className="card shadow-lg pt-4 rounded">
<h2 className='text-center text-primary'>Appointment Form</h2>
<form onSubmit={handleSubmit}  className='mt-4'>
<div className="mb-3">
<select className="form-control" value={patient_id} onChange={(e) => setPatient_Id(e.target.value)}>
              <option value="">Select Patient</option>
              {patient.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
      
                </option>
              ))}
 </select>
<select className="form-control" value={doctor_id} onChange={(e) => setDoctor_Id(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
 </select>
<select className="form-control" value={department_id} onChange={(e) => setDepartment_Id(e.target.value)}>
              <option value="">Select Department</option>
              {department.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option> 
              ))}
</select>
</div>
<div className='mb-3'>
    <input type="date" placeholder='date' value={appointment_date} onChange= {(e) => setAppointment_Date(e.target.value)}  />
</div>
<div className='mb-3'>
    <input type="text" placeholder='status' value={status} onChange= {(e) => setStatus(e.target.value)}  />
</div>
<div className="mb-3">
     <textarea className="form-control" placeholder="Reason for Appointment" value={reason} onChange={(e) => setReason(e.target.value)} required></textarea>
    </div>
<div className="d-flex justify-content-between">
            <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-success btn-lg animate-button">Submit</button>
            {id && (
              <>
                <button type="button" onClick={editData} className="btn btn-warning btn-lg animate-button">Edit</button>
                <button type="button" onClick={deleteData} className="btn btn-danger btn-lg animate-button">Delete</button>
              </>
            )}
          </div>

</form>
</div>
</div>
</>
)}
export default AppointmentD;
