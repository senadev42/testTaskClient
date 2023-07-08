import React, { useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

//import Link
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              {" "}
              <p className="text-white font-bold text-xl">wanderlust</p>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              {/* <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Welcome
              </a> */}
              <Link to="/login">
                {" "}
                <p className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </p>
              </Link>

              <Link to="/register">
                {" "}
                <p className="bg-white text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </p>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
