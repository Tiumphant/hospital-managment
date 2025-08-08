import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";

function RoleA() {
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

  // Optional: Delete functionality
  // const delData = async (id) => {
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_API_URL}/api/role/${id}`);
  //     setData((prev) => prev.filter((item) => item._id !== id));
  //     setFilteredData((prev) => prev.filter((item) => item._id !== id));
  //   } catch (error) {
  //     console.error("Error deleting role:", error);
  //   }
  // };

  return (
    <div>
      <PatientDashboard />
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
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button
                  onClick={() => delData(item._id)}
                  className="btn btn-danger ml-2"
                >
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

export default RoleA;
