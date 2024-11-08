// src/pages/EmployeeList.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Header from "../components/Header";
import "../styles/EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employee", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/employee/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setEmployees(employees.filter((employee) => employee.f_Id !== id));
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  return (
    <div className="employee-list-container">
      <Header />
      <h1>Employee List</h1>
      <div className="actions">
        <input
          type="text"
          placeholder="Search employees"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/employees/create" className="add-employee">Add Employee</Link>
      </div>
      <p className="total-employees">Total Employees: {filteredEmployees.length}</p>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.f_Id}>
              <td>{employee.f_Id}</td>
              <td>
                <img src={employee.f_Image} alt="employee" className="employee-image" />
              </td>
              <td>{employee.f_Name}</td>
              <td>{employee.f_Email}</td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_Gender}</td>
              <td>{employee.f_Course}</td>
              <td>{employee.f_Createdate}</td>
              <td>
                <button onClick={() => handleEdit(employee.f_Id)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(employee.f_Id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
