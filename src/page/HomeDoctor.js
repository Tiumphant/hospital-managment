import React, { useEffect } from "react";
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
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import DoctorDashboard from "./DoctorDashboard";
function HomeDoctor() {
  return (
    <>
      <DoctorDashboard />
      <section className="hero">
        <div className="container d-flex align-items-center justify-content-between py-5">
          <motion.div
            className="content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="display-4 fw-bold text-primary">Health Care</h1>
            <p className="lead">
              The goal of this Hospital Management System is to digitize and
              automate hospital workflows, reducing paperwork, eliminating
              errors, and enhancing the patient experience.
            </p>
            <Link to="/appointment">
              <button className="btn btn-primary btn-lg mt-3">
                Book an Appointment
              </button>
            </Link>
          </motion.div>
          <motion.div
            className="image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={doctorImage}
              alt="Doctor"
              className="img-fluid rounded shadow"
            />
          </motion.div>
        </div>
      </section>
      <section className="departments py-5 bg-light">
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Departments
          </motion.h2>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[
              { name: "🧠 Neurology", img: neurology },
              { name: "❤️ Cardiology", img: cardiology },
              { name: "🦴 Orthopedics", img: orthopadic },
              { name: "🧑‍⚕️ Pediatrics", img: Pediatrics },
              { name: "👩‍⚕️ Gynecology", img: Gynecology },
              { name: "🏥 Emergency & Trauma", img: Emergency },
            ].map((dept, idx) => (
              <motion.div
                key={idx}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <div style={{ height: "220px", overflow: "hidden" }}>
                    <img
                      src={dept.img}
                      alt={dept.name}
                      className="w-100"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <div className="card-body text-center bg-white">
                    <h5 className="card-title fw-semibold">{dept.name}</h5>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="appointment text-center py-5">
        <div className="container">
          <motion.h2
            className="fw-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Book an Appointment
          </motion.h2>
          <Link to="/appointment">
            <button className="btn btn-outline-primary btn-lg mt-3">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      <section className="contact py-5 bg-dark text-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Contact Us</h2>
          <p>📍 123, Main Street, Your City</p>
          <p>📞 Emergency: +1 800 123 4567</p>
          <p>📧 Email: contact@hospital.com</p>
        </div>
      </section>
    </>
  );
}

export default HomeDoctor;
