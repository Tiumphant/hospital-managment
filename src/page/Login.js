import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './registration.css';
import "bootstrap/dist/css/bootstrap.min.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient"); 
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const Api = "http://localhost:8000/api/login";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post(Api, { email:email,password:password });
              console.log("err", response); 
              let data = JSON.stringify(response.data)
              localStorage.setItem("token", data);
              localStorage.setItem("role", response.data.role);
             console.log("Login successful:", data);
            if (response.data.role === "patient") {
                navigate("/patientdashboard");
            } else if (response.data.role === "doctor") {
                navigate("/doctordashboard");
            } else if (response.data.role === "admin"){
                navigate("/dashboard");
            } else{
                  //console.log("please select role")
                  setError("This role is not registered")
            }
        } catch (err) {
            setError("err in login",err);
        }
    };


    return (
        <div className="registration">
            <div className="left">
                <h2 className="h2">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Role</label>
                        <select 
                            className="w-full border px-3 py-2 rounded"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-primary transition duration-200"
                    >
                        Login
                    </button>
                    <p className="mt-3 text-center">
                 if you dont have an account register it? <Link to="/registration">Registration</Link>
          </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
