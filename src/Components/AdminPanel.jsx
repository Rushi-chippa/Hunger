import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-white">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block p-3 rounded-lg hover:bg-gray-700 hover:text-white transition">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block p-3 rounded-lg hover:bg-gray-700 hover:text-white transition">
            Manage Users
          </Link>
          <Link to="/admin/donations" className="block p-3 rounded-lg hover:bg-gray-700 hover:text-white transition">
            Donations
          </Link>
          <Link to="/admin/requests" className="block p-3 rounded-lg hover:bg-gray-700 hover:text-white transition">
            Requests
          </Link>
          <Link to="/admin/settings" className="block p-3 rounded-lg hover:bg-gray-700 hover:text-white transition">
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
            <p className="text-2xl font-bold text-blue-600">$24,350</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-green-600">1,230</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-700">Total NGOs</h3>
            <p className="text-2xl font-bold text-purple-600">35</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
            <p className="text-2xl font-bold text-red-600">12</p>
          </div>
        </div>

        {/* Recent Donations Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Donations</h3>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 text-left text-gray-600">Donor Name</th>
                <th className="px-6 py-2 text-left text-gray-600">Amount</th>
                <th className="px-6 py-2 text-left text-gray-600">Date</th>
                <th className="px-6 py-2 text-left text-gray-600">NGO</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="px-6 py-3">John Doe</td>
                <td className="px-6 py-3">$200</td>
                <td className="px-6 py-3">April 10, 2025</td>
                <td className="px-6 py-3">Red Cross</td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="px-6 py-3">Jane Smith</td>
                <td className="px-6 py-3">$500</td>
                <td className="px-6 py-3">April 11, 2025</td>
                <td className="px-6 py-3">Food for All</td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="px-6 py-3">Alice Brown</td>
                <td className="px-6 py-3">$150</td>
                <td className="px-6 py-3">April 12, 2025</td>
                <td className="px-6 py-3">Global Aid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
