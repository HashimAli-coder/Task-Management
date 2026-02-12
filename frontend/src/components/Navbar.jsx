import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = ({ user, logout }) => {
  return (
    <nav className="sticky top-0 z-40 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left Section - Branding */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">
            Task Manager
          </h1>
          <span className="text-xs text-blue-200">
            Productivity Dashboard
          </span>
        </div>

        {/* Right Section - User */}
        <div className="flex items-center gap-5">
          
          {/* User Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || <FiUser />}
            </div>

            {/* Name */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium">
                {user?.name}
              </span>
              <span className="text-xs text-blue-200">
                Logged In
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 transition"
          >
            <FiLogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
