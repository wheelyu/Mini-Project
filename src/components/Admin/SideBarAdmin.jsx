// Sidebar.jsx
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faStreetView, faSignOut } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    alert("Logout successfully");
    window.location.href = "/";
};
  return (
    <div className="bg-gray-800 h-screen w-64 text-white flex flex-col">
      <h2 className="text-2xl font-semibold p-4 border-b border-gray-700">Admin Dashboard</h2>
      <nav className="mt-4 flex flex-col space-y-2 px-4">
        <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
          <FontAwesomeIcon icon={faHome} className="mr-3" /> Dashboard
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
          <FontAwesomeIcon icon={faUser} className="mr-3" /> Users
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
          <FontAwesomeIcon icon={faStreetView} className="mr-3" /> Settings
        </a>
      </nav>
      <div className="mt-auto p-4">
        <button className="flex items-center w-full p-2 text-red-500 hover:bg-gray-700 rounded-md" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} className="mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
