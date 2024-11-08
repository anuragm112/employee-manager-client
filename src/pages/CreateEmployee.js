// src/pages/CreateEmployee.js
import React, { useState } from "react";
import axios from "../utils/axios";
import "../styles/CreateEmployee.css";

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("mobile", formData.mobile);
    submitData.append("designation", formData.designation);
    submitData.append("gender", formData.gender);
    submitData.append("course", formData.course);
    if (image) submitData.append("image", image);

    try {
      const response = await axios.post("/api/employee", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      alert("Employee created!");
    } catch (error) {
      console.error("Employee creation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile Number" type="tel" onChange={handleChange} required />
      <input name="designation" placeholder="Designation" onChange={handleChange} required />
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <input name="course" placeholder="Course" onChange={handleChange} required />
      <label htmlFor="imageUpload">Upload Image:</label>
      <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Create Employee</button>
    </form>
  );
}
