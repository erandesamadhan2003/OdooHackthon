import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-[#B6B09F]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-[#B6B09F]" />
            <span className="ml-2 text-xl font-bold text-black">ReWear</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-black hover:text-[#B6B09F] transition-colors">Home</Link>
            <Link to="/browse" className="text-black hover:text-[#B6B09F] transition-colors">Browse</Link>
            <Link to="/login" className="text-black hover:text-[#B6B09F] transition-colors">Login</Link>
            <Link to="/signup" className="text-black hover:text-[#B6B09F] transition-colors">Sign Up</Link>
          </nav>
          <div className="flex items-center space-x-4 md:hidden">
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
          </div>
        </div>
      </div>
    </header>
  );
};