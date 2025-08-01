import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DoctorDashboard from "./DoctorDashboard";
function Appointmentlist() {
    const [data, setData] = useState([])
    useEffect(() => {
<<<<<<< HEAD

        axios.get("http://localhost:8080/api/appointment")

        axios.get("http://localhost:8000/api/appointment")

=======
        axios.get("http://localhost:8000/api/appointment")
>>>>>>> 72d5d6d07f6484befc4275ff7903ef497da8b2e7
            .then((response) => {
                setData(response.data)
                console.log("Fetched data:", response.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            })
    }, []) 
    function Appointmentdelete(id) {
<<<<<<< HEAD

        axios.delete(`http://localhost:8080/api/appointment/${id}`)

        axios.delete(`http://localhost:8000/api/appointment/${id}`)

=======
        axios.delete(`http://localhost:8000/api/appointment/${id}`)
>>>>>>> 72d5d6d07f6484befc4275ff7903ef497da8b2e7
            .then((response) => {
                console.log("Data successfully deleted:", response.data)
                setData(prevData => prevData.filter(user => user._id !== id)) 
            })
            .catch((err) => {
                console.error("Error deleting data:", err)
            })
    }

    return (
        <>
        <DoctorDashboard/>
            <h1 className='text-center primary'>List of Appointments</h1>
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
                            <td>{item.appointment_date}</td>
                            <td>{item.status}</td>
                            <td>{item.reason}</td>
                            <td>
                                <Link to={`/appointmentD/${item._id}`}>
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
    )
}

export default Appointmentlist