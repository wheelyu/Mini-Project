// Dashboard.jsx
import React from 'react';
import Sidebar from './SideBarAdmin';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="p-6 bg-gray-100 flex-grow overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <p>100 registered users</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Posts</h3>
              <p>50 posts created</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <p>150 comments</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
