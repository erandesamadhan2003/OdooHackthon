import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B6B09F] mx-auto"></div>
          <p className="text-[#B6B09F] mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black mb-2">Access Denied</h1>
          <p className="text-[#B6B09F] mb-4">
            You need admin privileges to access this page. Please contact an administrator if you believe this is an error.
          </p>
          <div className="flex items-center justify-center text-sm text-[#B6B09F]">
            <Shield className="h-4 w-4 mr-2" />
            Admin Access Required
          </div>
        </div>
      </div>
    );
  }

  // Render the admin component if user is authenticated and is admin
  return children;
}; 