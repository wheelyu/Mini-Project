// Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './SideBarAdmin';
import Header from './Header';
import useStore from '../../store/sideBarStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const { isOpen: sidebarOpen } = useStore();
  // Sample data untuk cards
  const statsCards = [
    { title: 'Articles', value: '1,234', icon: 'fa-users', change: '+12%', color: 'bg-blue-500' },
    { title: 'Total Visitor', value: '$12,345', icon: 'fa-dollar-sign', change: '+8%', color: 'bg-green-500' },

  ];



  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header  />

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((card, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <h3 className="mt-2 text-2xl font-bold">{card.value}</h3>
                    <span className="mt-2 text-sm text-green-600">{card.change} this month</span>
                  </div>
                  <div className={`rounded-full p-4 ${card.color}`}>
                    <i className={`fa-solid ${card.icon} text-2xl text-white`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>  
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
