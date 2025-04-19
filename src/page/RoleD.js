import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard"
function RoleD() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  
  const update = async () => {
    try {
      let api = await axios.get("http://localhost:8000/api/role");
      let result = api.data; 
      console.log("Fetched API successfully:", result);
      
      setData(result);
      setFilteredData(result); 
    } catch (err) {
      console.log("Error in fetching:", err);
    }
  };

  useEffect(() => {
    update();
  }, []);

  
//   const delData = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/role/${id}`);
//       setData((p) => p.filter((item) => item._id !== id));
//       setFilteredData((p) => p.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error("Error deleting role:", error);
//     }
//   };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  return (
    <div>
        <DoctorDashboard/>
      <h1 className="text-center">Role List</h1>

      
      <input
        type="text"
        placeholder="Search role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              {/* <td>
              <Link to={`/Role/${item._id}`}>
                      <button>Edit</button>
                    </Link>
                <button onClick={() => delData(item._id)} className="btn btn-danger">
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleD;