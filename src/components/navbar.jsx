// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white font-bold text-xl">LacakUV</a>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-200">About</Link></li>
          <li><a href="/services" className="text-white hover:text-gray-200">Services</a></li>
          <li><a href="/contact" className="text-white hover:text-gray-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
