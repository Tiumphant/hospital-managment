import axios from "axios";
import { useEffect, useState } from "react";
import DoctorDashboard from "./DoctorDashboard";

function RoleD() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const update = async () => {
    try {
      const urlapi = `https://backend-hospital-managment.vercel.app/api/role`;
      const response = await axios.get(urlapi);
      const result = response.data;
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
    <>
      <DoctorDashboard />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded">
          <h2 className="text-center text-primary mb-4">Doctor Role List</h2>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Search by role name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>

          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Description</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    {/* 
                    <td>
                      <Link to={`/Role/${item._id}`}>
                        <button className="btn btn-warning btn-sm me-2">Edit</button>
                      </Link>
                      <button
                        onClick={() => delData(item._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td> 
                    */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-muted">
                    No matching roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RoleD;
