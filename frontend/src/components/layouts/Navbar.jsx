import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, LogIn, UserPlus, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/app/features/authentication/authSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, username, user } = useSelector((state) => state.auth);

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-[#B6B09F]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-[#B6B09F]" />
            <span className="ml-2 text-xl font-bold text-black">ReWear</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-black hover:text-[#B6B09F] transition-colors">Home</Link>
            <Link to="/browse" className="text-black hover:text-[#B6B09F] transition-colors">Browse</Link>
            {isAuthenticated && (
              <Link to="/profile" className="text-black hover:text-[#B6B09F] transition-colors">Profile</Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="text-black hover:text-[#B6B09F] transition-colors flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Show user info and logout button when user is logged in
              <>
                {username && (
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {username}
                  </span>
                )}
                <Button 
                  variant="outline" 
                  className="flex items-center border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {loading ? 'Logging out...' : 'Logout'}
                </Button>
              </>
            ) : (
              // Show login and signup buttons when user is not logged in
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="flex items-center bg-black hover:bg-[#B6B09F] text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};