import React from "react";
import { Link } from "react-router-dom";
import doctorImage from "../page/doctor.jpg";
import neurology from "../page/neurology.jpeg";
import cardiology from "../page/cardiology.jpg";
import orthopadic from "../page/orthepadic.png";
import Gynecology from "../page/Gynecology.jpeg";
import pmanagment from "../page/pmanagment.jpg";
import paymentmanagment from "../page/paymentmanagment.webp";
import labmanagment from "../page/labmanagment.jpeg";
import pharmecymanagment from "../page/pharmecymanagment.jpg";
import Pediatrics from "../page/Pediatrics.jpg";
import Emergency from "../page/Emergency.jpeg";
import PatientDashboard from "./PatientDashboard";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
    <PatientDashboard/>
      <section className="hero">
        <div className="container">
          <div className="content">
            <h1 className="design">Health Care</h1>
            <p>
              The goal of this Hospital Management System is to digitize and automate hospital workflows, reducing paperwork, eliminating errors, and enhancing the patient experience.
            </p>
            <Link to="/appointment">
              <button className="btn-primary">Book an Appointment</button>
            </Link>
          </div>
          <div className="image-container">
            <img src={doctorImage} alt="Doctor" />
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="departments">
        <h2 className="section-title">Our Departments</h2>
        <div className="container department-grid">
          <div className="department-card">
            🧠 Neurology
            <img className="neurology" src={neurology} alt="Neurology" />
          </div>
          <div className="department-card">
            ❤️ Cardiology
            <img className="cardiology" src={cardiology} alt="Cardiology" />
          </div>
          <div className="department-card">
            🦴 Orthopedics
            <img className="orthopedic" src={orthopadic} alt="Orthopedics" />
          </div>
          <div className="department-card">
            🧑‍⚕️ Pediatrics
            <img className="pediatrics" src={Pediatrics} alt="Pediatrics" />
          </div>
          <div className="department-card">
            👩‍⚕️ Gynecology
            <img className="gynecology" src={Gynecology} alt="Gynecology" />
          </div>
          <div className="department-card">
            🏥 Emergency & Trauma
            <img className="emergency" src={Emergency} alt="Emergency & Trauma" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section className="services">
        <div className="left">left</div>
        <div className="right">right
          <MDBCarousel showIndicators showControls fade>
            <MDBCarouselItem>
              <img src={pmanagment} className="d-block w-100" alt="Patient Management" />
              <MDBCarouselCaption>
                <h5>Patient Management</h5>
                <p>Streamline patient record management efficiently.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem>
              <img src={paymentmanagment} className="d-block w-100" alt="Payment Management" />
              <MDBCarouselCaption>
                <h5>Payment Management</h5>
                <p>Seamless billing and payment processing.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem>
              <img src={pharmecymanagment} className="d-block w-100" alt="Pharmacy Management" />
              <MDBCarouselCaption>
                <h5>Pharmacy Management</h5>
                <p>Manage medicines and prescriptions efficiently.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem>
              <img src={labmanagment} className="d-block w-100" alt="Lab Management" />
              <MDBCarouselCaption>
                <h5>Lab Management</h5>
                <p>Efficient tracking of lab tests and results.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarousel>
        </div>
      </section> */}

      {/* Appointment Booking Section */}
      <section className="appointment">
        <div className="container">
          <h2>Book an Appointment</h2>
          <button className="btn-primary">Get Started</button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>📍 123, Main Street, Your City</p>
          <p>📞 Emergency: +1 800 123 4567</p>
          <p>📧 Email: contact@hospital.com</p>
        </div>
      </section>
    </>
  );
}

export default Home;
