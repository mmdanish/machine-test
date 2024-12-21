import React from "react";
import { FaTimes } from "react-icons/fa";

const EmployeeForm = ({ onClose }) => {
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
      <form>
        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter First Name"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Last Name"
            />
          </div>
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Department</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Department"
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Designation
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Designation"
          />
        </div>

        {/* Date of Joining */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Date of Joining
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Salary</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Salary"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Upload Image
          </label>
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-[#032863] text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-blue-700"
            onClick={() => setIsModalOpen(false)}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
