import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
function PatientCardK(){
    const [viewPatient, setViewPatient] =useState(null)
    const { id } = useParams()

  useEffect(()=>{
    if(id){
        getOnePatient()
    }
  }, [id]) 
 const getOnePatient = async()=>{
 try{
    const res = await axios.get(`http://localhost:8000/api/patient/${id}`)
    const data = res.data ;
    console.log("Fetch Patient", data)

    setViewPatient({
        image: `http://localhost:8000/upload/${data.image}`,
        name: data.name,
        email: data.email,
        number: data.number,
        age: data.age,
        gender: data.gender,
        address: data.address,
        assignedDoctor: data.assignedDoctor,
    })

 }catch(err){
    console.log("error in get one ", err)
   
 }
}
if(!viewPatient){
    return <div>Loading Patient Details.....</div>
}

  return(
    <>
      <Dashboard />
      <div className="cover">
        <div className="card" style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
          <div style={{ width: '40%' }}>
            <img
              src={viewPatient.image}
              alt={viewPatient.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="rounded-start"
            />
          </div>
          <div className="card-body" style={{ width: '60%' }}>
            <p className="card-title">Name: {viewPatient.name}</p>
            <p className="card-text">Age: {viewPatient.age}</p>
            <p className="card-text">Gender: {viewPatient.gender}</p>
            <p className="card-text">Email: {viewPatient.email}</p>
            <p className="card-text">Contact Number: {viewPatient.number}</p>
            <p className="card-text">Address: {viewPatient.address}</p>
            <p className="card-text">
              <strong>Assigned Doctor:</strong> {viewPatient.assignedDoctor}
            </p>
          </div>
        </div>
      </div>
    </>
  )

}
export default PatientCardK