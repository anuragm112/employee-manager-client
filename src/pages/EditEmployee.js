// src/pages/EditEmployee.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import "../styles/EditEmployee.css";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [employeeData, setEmployeeData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "",
    f_Course: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the current employee data
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("f_Name", employeeData.f_Name);
    formData.append("f_Email", employeeData.f_Email);
    formData.append("f_Mobile", employeeData.f_Mobile);
    formData.append("f_Designation", employeeData.f_Designation);
    formData.append("f_Gender", employeeData.f_Gender);
    formData.append("f_Course", employeeData.f_Course);
    if (image) formData.append("image", image);

    try {
      await axios.put(`/api/employee/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee. Please check your input.");
    }
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="edit-employee-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="f_Name"
            value={employeeData.f_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="f_Email"
            value={employeeData.f_Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="text"
            name="f_Mobile"
            value={employeeData.f_Mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation</label>
          <input
            type="text"
            name="f_Designation"
            value={employeeData.f_Designation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="f_Gender"
            value={employeeData.f_Gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Course</label>
          <input
            type="text"
            name="f_Course"
            value={employeeData.f_Course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload Image</label>
          <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
