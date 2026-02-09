import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 text-white">
            <span className="text-4xl">💰</span>
            <span className="text-3xl font-bold">FinTracker</span>
          </div>
          <p className="mt-2 text-primary-100">
            Manage your finances with ease
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-primary-100 text-sm">
          © {new Date().getFullYear()} FinTracker. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
