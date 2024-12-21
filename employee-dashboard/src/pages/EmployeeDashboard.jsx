import React, { useState } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import Modal from '../components/Modal'
import EmployeeForm from '../components/EmployeeForm'
import { FaPlus } from 'react-icons/fa'


const EmployeeDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];
  
    const getRandomColor = (key) => {
      const index = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
      return colors[index];
    };
    
    const employees = [
        {
          id: "EMP00001",
          name: "Anthony B Renfroe",
          email: "isidrohonshi@armyspy.com",
          department: "Android",
          designation: "Designer",
          joiningDate: "Jan 14, 2020",
          salary: "$30,000.00",
          profileImage: "",
        },
        {
          id: "EMP00002",
          name: "Keire",
          email: "proton9@teleworm.us",
          department: "iOS",
          designation: "Developer",
          joiningDate: "Jan 14, 2020",
          salary: "$25,000.00",
          profileImage: "",
        },
        {
          id: "EMP00003",
          name: "Adrienne J Reed",
          email: "ldatmullen@armyspy.com",
          department: "PHP",
          designation: "Tester",
          joiningDate: "Feb 14, 2020",
          salary: "$20,000.00",
          profileImage: "",
        },
        {
          id: "EMP00004",
          name: "Teresa R McRae",
          email: "mcrae@teresa.co",
          department: "Android",
          designation: "Developer",
          joiningDate: "Jan 14, 2020",
          salary: "$25,000.00",
          profileImage: "",
        },
      ];

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl text-gray-700">Employee</h1>
        <button className="bg-white text-gray-700 rounded-full p-2 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center" onClick={() => setIsModalOpen(true)}>
          <FaPlus size={16} />
        </button>
      </div>

      <Modal isOpen={isModalOpen}>
        <EmployeeForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} getRandomColor={getRandomColor} />
        ))}
      </div>
    </div>
  )
}

export default EmployeeDashboard
