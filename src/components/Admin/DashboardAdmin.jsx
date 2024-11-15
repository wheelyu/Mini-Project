// Dashboard.jsx
import React from 'react';
import Sidebar from './SideBarAdmin';
import Header from './Header';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow pl-64">
        <Header />
        <main className="p-6 bg-gray-100 flex-grow overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/admin/article"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-full h-10 bg-gray-200 rounded-full mb-4 hover:bg-green-600 transition-all duration-300"></div>
              <h3 className="text-lg font-semibold mb-2">Article</h3>
              <p>5 Posted article</p>
            </Link>
      
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
