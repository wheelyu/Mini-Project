// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-yellow-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white font-bold text-xl">LacakUV</a>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-200">Beranda</Link></li>
          <li><Link to="/check" className="text-white hover:text-gray-200">Cek UV Indeks</Link></li>
          <li><Link to="/check" className="text-white hover:text-gray-200">About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
