// Header.jsx
import React from 'react';

const Header = () => {
  return (
            
            <header className="bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex items-center space-x-4">
                
                <div className="flex items-center space-x-2">
                  <img src="../../sun1.png"  className="h-8 w-8 rounded-full" />
                  <span className="font-medium">Welcome, Admin</span>
                </div>
              </div>
            </div>
          </header>
  );
};

export default Header;
