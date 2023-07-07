import React, { useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">
              wanderlust
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Welcome
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </a>
              <a
                href="#"
                className="bg-white text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
