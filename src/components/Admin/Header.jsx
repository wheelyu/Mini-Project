// Header.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
const Header = () => {
  return (
            
            <header className="bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex items-center space-x-4">
                
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                  <span className="font-medium">Welcome, Admin</span>
                </div>
              </div>
            </div>
          </header>
  );
};

export default Header;
