// Sidebar.jsx
import React, { useState } from 'react';
import useStore from '../../store/sideBarStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faNewspaper, faSignOut, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useStore();
  const menuItems = [
    { title: 'Dashboard', icon: faHome, path: '/admin/dashboard' },

    { title: 'Articles', icon: faNewspaper, path: '/admin/article' },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    alert("Logout successfully");
    window.location.href = "/";
};
  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-20 items-center justify-between px-4">
          <h1 className={`text-xl font-bold ${!isOpen && 'hidden'}`} >Admin Panel</h1>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} className={`h-6 w-6 transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center rounded-lg p-3 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          <button className="flex w-full items-center rounded-lg p-3 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="h-6 w-6" />
            <span className={`ml-4 ${!isOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
