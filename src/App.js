import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Login from "./page/Login";
import Registration from "./page/Registration";
import Patient from "./page/Patient";
import PatientD from "./page/PatientD";
import PatientA from "./page/PatientA";
import PatientC from "./page/PatientC";
import PatientCardK from "./page/PatientCardK";
import PatientList from "./page/Patientlist";
import PatientlistK from "./page/PatientlistK";
import Department from "./page/Department";
import DepartmentC from "./page/DepartmentC";
import Departmentlist from "./page/Departmentlist";
import DepartmentlistK from "./page/DepartmentlistK";
import Appointment from "./page/Appointment";
import AppointmentD from "./page/AppointmentD";
import AppointmentC from "./page/AppointmentC";
import AppointmentA from "./page/AppointmentA";
import Appointmentlist from "./page/Appointmentlist";
import AppointmentlistK from "./page/AppointmentlistK";
import Role from "./page/Role";
import RoleC from "./page/RoleC";
import RoleA from "./page/RoleA";
import RoleD from "./page/RoleD";
import Rolelist from "./page/Rolelist";
import RolelistK from "./page/RolelistK";
import PatientDashboard from "./page/PatientDashboard";
import DoctorDashboard from "./page/DoctorDashboard";
import Dashboard from "./page/Dashboard";
import PatientCard from "./page/PatientCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Dashboards */}
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Patient */}
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/:id" element={<Patient />} />
        <Route path="/patientD" element={<PatientD />} />
        <Route path="/patientD/:id" element={<PatientD />} />
        <Route path="/patientC" element={<PatientC />} />
        <Route path="/patientC/:id" element={<PatientC />} />
        <Route path="/patientA" element={<PatientA />} />
        <Route path="/patientA/:id" element={<PatientA />} />
        <Route path="/patientlist" element={<PatientList />} />
        <Route path="/patientlistK" element={<PatientlistK />} />
        <Route path="/patientlistK/:id" element={<PatientlistK />} />
        <Route path="/patientcard" element={<PatientCard />} />
        <Route path="/patientcard/:id" element={<PatientCard />} />
        <Route path="/patientcardK" element={<PatientCardK />} />
        <Route path="/patientcardK/:id" element={<PatientCardK />} />

        {/* Department */}
        <Route path="/department" element={<Department />} />
        <Route path="/department/:id" element={<Department />} />
        <Route path="/departmentC" element={<DepartmentC />} />
        <Route path="/departmentC/:id" element={<DepartmentC />} />
        <Route path="/departmentlist" element={<Departmentlist />} />
        <Route path="/departmentlistK" element={<DepartmentlistK />} />

        {/* Appointment */}
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointmentA" element={<AppointmentA />} />
        <Route path="/appointmentD" element={<AppointmentD />} />
        <Route path="/appointmentD/:id" element={<AppointmentD />} />
        <Route path="/appointmentC" element={<AppointmentC />} />
        <Route path="/appointmentC/:id" element={<AppointmentC />} />
        <Route path="/appointmentlist" element={<Appointmentlist />} />
        <Route path="/appointmentlistK" element={<AppointmentlistK />} />

        {/* Role */}
        <Route path="/role" element={<Role />} />
        <Route path="/roleA" element={<RoleA />} />
        <Route path="/roleA/:id" element={<RoleA />} />
        <Route path="/roleC" element={<RoleC />} />
        <Route path="/roleC/:id" element={<RoleC />} />
        <Route path="/roleD" element={<RoleD />} />
        <Route path="/roleD/:id" element={<RoleD />} />
        <Route path="/rolelist" element={<Rolelist />} />
        <Route path="/rolelistK" element={<RolelistK />} />
      </Routes>
    </Router>
  );
}

export default App;
