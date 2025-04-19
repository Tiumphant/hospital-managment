import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Rolelist() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value) ||
      item.number.toString().includes(value)
    );
    setFilteredData(filtered);
  };
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

  
  const delData = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/role/${id}`);
      setData((p) => p.filter((item) => item._id !== id));
      setFilteredData((p) => p.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

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
      <h1 className="text-center">Role List</h1>

      
      <div>
        Search:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type to search"
        />
      </div>
      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
              <Link to={`/Role/${item._id}`}>
                      <button>Edit</button>
                    </Link>
                <button onClick={() => delData(item._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rolelist;