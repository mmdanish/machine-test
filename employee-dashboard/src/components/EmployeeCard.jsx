import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const EmployeeCard = ({ employee, getRandomColor }) => {
  return (
    <div
      key={employee.id}
      className="bg-white shadow-md rounded-lg p-4 relative flex flex-col items-center text-center cursor-pointer"
    >
      <div className="absolute top-2 right-2 bg-[#032863] text-white text-xs px-2 py-1 rounded">
        {employee.id}
      </div>

      {employee.profileImage ? (
        <img
          src={employee.profileImage}
          alt={employee.name}
          className="w-24 h-24 rounded-full mb-4"
        />
      ) : (
        <div
          className={`w-24 h-24 ${getRandomColor(
            employee.id
          )} rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-4`}
        >
          {`${employee.name.split(" ")[0][0] || ""}${
            employee.name.split(" ")[1]?.[0] || ""
          }`}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-600">{employee.name}</h3>
      <p className="text-sm text-gray-400">{employee.email}</p>

      <div className="flex justify-between items-center w-full my-4">
        <FaEdit
          className="text-gray-500 cursor-pointer hover:text-blue-500"
          size={20}
        />
        <FaEye
          className="text-gray-500 cursor-pointer hover:text-green-500"
          size={20}
        />
        <FaTrash
          className="text-gray-500 cursor-pointer hover:text-red-500"
          size={20}
        />
      </div>

      <hr className="w-full border-gray-300 mb-4" />

      <div className="grid grid-cols-2 gap-4 w-full text-sm text-gray-600">
        <div className="text-center">
          <p className="text-base font-medium text-gray-600">
            {employee.department}
          </p>
          <p className="text-xs text-gray-400">Department</p>
        </div>
        <div className="text-center">
          <p className="text-base font-medium text-gray-600">
            {employee.designation}
          </p>
          <p className="text-xs text-gray-400">Designation</p>
        </div>
        <div className="text-center">
          <p className="text-base font-medium text-gray-600">
            {employee.joiningDate}
          </p>
          <p className="text-xs text-gray-400">Date of Joining</p>
        </div>
        <div className="text-center">
          <p className="text-base font-medium text-gray-600">
            {employee.salary}
          </p>
          <p className="text-xs text-gray-400">Salary</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
