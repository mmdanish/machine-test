import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 px-6 py-4 flex items-center justify-between">
      
      <div className="flex items-center bg-gray-200 rounded-full px-2 py-1">
        <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          RI
        </div>
        <span className="ml-2 text-gray-700 text-sm font-medium">
          Rajodiya Infotech
        </span>
      </div>

      
      <div className="flex items-center w-[15rem]  mx-4">
        <div className="flex items-center bg-white rounded-full w-full border">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white px-4 py-2 rounded-full outline-none w-full text-gray-600"
          />
          <button className="p-2">
            <FaSearch className="text-gray-500" />
          </button>
        </div>
      </div>


      <div className="text-gray-600 text-sm">
        <a href="#dashboard" className="hover:text-gray-800">
          Dashboard
        </a>
        <span className="mx-2"> &gt; </span>
        <a href="#staff" className="hover:text-gray-800">
          Staff
        </a>
        <span className="mx-2"> &gt; </span>
        <a href="#employee" className="hover:text-gray-800">
          Employee
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
