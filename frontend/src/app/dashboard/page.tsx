'use client';

import React from 'react';
import useUser from '@/hooks/user/useUser';

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-teal-600 text-white text-center py-8">
        <h1 className="text-3xl font-semibold">Welcome, {user?.firstName}!</h1>
        <p className="mt-1 text-md">
          Manage your account and view your information below.
        </p>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">
          Your Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.email}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Gender</p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.gender || 'Not specified'}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Role</p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.role}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} MediaHive. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
