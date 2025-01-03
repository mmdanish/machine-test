import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const EmployeeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    department: "",
    designation: "",
    joiningDate: new Date(),
    salary: "",
    email: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        employeeData.append(key, formData[key]);
      }
    }
    console.log(employeeData)

    try {
      const response = await axios.post(
        "http://localhost:4000/api/employees",
        employeeData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      alert("Employee created successfully!");
      onClose(); 
    } catch (error) {
      alert("Error creating employee");
      console.log(error.message);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-gray-500">Create New Employee</h2>
        <FaTimes
          className="text-gray-400 cursor-pointer hover:text-gray-700"
          size={18}
          onClick={onClose}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Employee ID */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Employee ID
          </label>
          <input
            type="text"
            name="id"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Employee ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Department</label>
          <input
            type="text"
            name="department"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Joining */}
        <label className="block text-gray-600 text-sm mb-1">
          Date of Joining
        </label>
        <input
          type="text"
          name="joiningDate"
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formatDate(formData.joiningDate)} 
          readOnly
        />

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="profileImage"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#032863] text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
