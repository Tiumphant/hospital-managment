import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'
function DepartmentlistK(){
    const[data, setData] = useState([])

    useEffect(()=>{
      axios.get("http://localhost:8000/api/department").then((response)=>{
        setData(response.data)
        console.log("fetch get data", response.data)
      })
      .catch((err)=>{
       console.log(err)
      })
    }, [])
    function Departmentdelete(id){
        axios.delete(`http://localhost:8000/api/department/${id}`).then((response)=>{
            console.log("data succesfully deleted", response.data)
            setData(data.filter(user => user._id !=id))
        })
        .catch((err)=>{
            console.log("error in fetching data", err)
        })
    }
    return(
     <>
    < Dashboard/>
     <h1 className='text-center primary'>List of Table</h1>
     <table className="table table-bordered shadow">
       <thead>
     <tr>
     <th>Name</th>
     <th>description</th> 
     <th>head_doctor_name</th>
     <th>operation</th>
     </tr>
</thead>
<tbody>
      {data.map((item)=>(
     <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.head_doctor_id?.name ||"not assign"}</td>
          <td>
           <button><Link to={`/departmentC/${item._id}`}>Edit</Link></button>
        <button onClick={(()=> Departmentdelete(item._id))}>Delete</button>
          </td>

     </tr>


      )

      )}


</tbody>





     </table>
     
     
     
     
     </>




    )

}
export default DepartmentlistK
