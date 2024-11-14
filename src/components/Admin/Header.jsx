// Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, Admin</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
