import React from 'react';

function FormLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
