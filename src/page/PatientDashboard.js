import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useNavigate,useLocation} from "react-router-dom";
import { useEffect } from "react";
import logo from "../page/logohm.webp";
import "bootstrap/dist/css/bootstrap.min.css";

function PatientDashboard() {
  let auth = localStorage.getItem("token");
  const location = useLocation();
  let navigate = useNavigate()
 
  useEffect(() => {
    const publicRoutes = ["/login", "/registration"]; 
   
    if (!auth && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [auth, location.pathname, navigate]);
  
  function handleLogout() {
    console.log("handleLogout");
    localStorage.clear();
    navigate("/login")
  }

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container>
        <img src={logo} alt="Health Care Logo" style={{ height: "40px", marginRight: "10px" }} />
        <Navbar.Brand as={Link} to="">Health-care</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!auth ? (
              <>
                <Link className="nav-link" to="/registration">Registration</Link>
                <Link className="nav-link" to="/login">Login</Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>

                <NavDropdown title="Patient" id="patient-dropdown">
                  <NavDropdown.Item as={Link} to="/patient">Add Patient</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/patientA">Patient List</NavDropdown.Item>
                </NavDropdown>
             {/* 
                <NavDropdown title="Department" id="department-dropdown">
                  <NavDropdown.Item as={Link} to="/department">Add Department</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/departmentlist">Department List</NavDropdown.Item>
                </NavDropdown> */}

                <NavDropdown title="Appointment" id="appointment-dropdown">
                  <NavDropdown.Item as={Link} to="/appointment">Add Appointment</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/appointmentA">Appointment List</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Doctor" id="doctor-dropdown">
                  {/* <NavDropdown.Item as={Link} to="/role">Add Role</NavDropdown.Item> */}
                  <NavDropdown.Item as={Link} to="/roleA">Doctor List</NavDropdown.Item>
                </NavDropdown>

                <Link className='nav-link text-danger fw-bold' to="/login" onClick={handleLogout}>
                Logout ({auth?.firstName || "Patient"})
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PatientDashboard;
