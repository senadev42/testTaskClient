import React, { useEffect, useState } from "react";
import { Profile } from "./Profile";

import { Link, useLocation } from "react-router-dom";
import Logout from "../components/Logout";

// Subpages
import NearMe from "./ExplorePages/NearMe";
import Search from "./ExplorePages/Search";

const Dashboard = () => {
  const [isdropupopen, setisdropupopen] = useState(false);

  // Where are we right now?
  const location = useLocation();

  let content;

  switch (location.pathname) {
    case "/dashboard/nearme":
      content = <NearMe />;
      break;

    case "/dashboard/search":
      content = <Search />;
      break;

    default:
      content = <Profile />;
      break;
  }

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/nearme":
        content = <NearMe />;
        break;

      case "/dashboard/search":
        content = <Search />;
        break;

      default:
        content = <Profile />;
        break;
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-row  h-screen ">
      {/* Tabs */}

      <nav className=" hidden sm:flex space-y-1 bg-white w-[30%] md:w-[20%] flex flex-col justify-between pt-4 pl-4">
        {/* the top part */}
        <div>
          <div className="flex-shrink-0 pl-4 py-4 ">
            <Link to="/">
              {" "}
              <p className="text-slate-700 font-bold text-xl">wanderlust</p>
            </Link>
          </div>{" "}
          {/* 
          Explore Tab 
          */}
          <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
            Explore
          </p>
          <ul>
            <li>
              <a
                className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                href="/dashboard/search"
              >
                <span className="ml-4">Search</span>
              </a>
            </li>
            <Link to="/dashboard/nearme">
              <li>
                <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                  <span className="ml-4">Near Me</span>
                </div>
              </li>
            </Link>
            <li>
              <a
                className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                href="/dashboard/history"
              >
                <span className="ml-4">History</span>
              </a>
            </li>
          </ul>
          {/*
           Tools
           */}
          {/* <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
            Tools
          </p>
          <ul>
            <li>
              <a
                className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                href="#"
              >
                <span className="ml-4">Currencies</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                href="#"
              >
                <span className="ml-4">Hotspots</span>
                <span className="inline-flex ml-auto items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500">
                  25
                </span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                href="#"
              >
                <span className="ml-4">Checklist</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                href="#"
              >
                <span className="ml-4">TLD</span>
              </a>
            </li>
          </ul> */}
        </div>

        {/* the bottom part */}
        <div className="pb-4">
          {" "}
          <hr></hr>
          <ul>
            <Link to="/dashboard/profile">
              <li>
                <a
                  className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                  href="#"
                >
                  <span className="ml-4">Profile</span>
                </a>
              </li>
            </Link>

            <li>
              <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                <span className="ml-4">
                  {" "}
                  <Logout />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* The overflow - Y Tab */}
      <div className="flex-1 h-full overflow-y-auto p-6">
        {content}
        {/* teams */}
        {/* otherthing */}
      </div>
    </div>
  );
};

export default Dashboard;
