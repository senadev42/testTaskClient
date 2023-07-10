import { useEffect, useState } from "react";
import { Profile } from "./Profile";

import { Link, useLocation } from "react-router-dom";
import Logout from "../components/Logout";

// Subpages
import NearMe from "./ExplorePages/NearMe";
import Search from "./ExplorePages/Search";
import History from "./ExplorePages/History";

const Dashboard = () => {
  const [showNav, setShowNav] = useState(false);

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

    case "/dashboard/history":
      content = <History />;
      break;

    case "/dashboard/profile":
      content = <Profile />;
      break;

    default:
      content = <Search />;
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

      case "/dashboard/history":
        content = <History />;
        break;

      case "/dashboard/profile":
        content = <Profile />;
        break;

      default:
        content = <Search />;
        break;
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-row  h-screen ">
      {/* Tabs */}

      <button
        type="button"
        onClick={() => setShowNav(!showNav)}
        className="fixed top-4 right-4 z-50 sm:hidden bg-gray-200 p-2 rounded-md"
      >
        {showNav ? (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <nav
        className={`fixed inset-4 bg-white z-40 transform transition-all ease-in-out duration-500 ${
          showNav ? "translate-x-0" : "-translate-x-full"
        } sm:static sm:translate-x-0 sm:opacity-100 sm:bg-transparent sm:w-auto sm:flex sm:flex-col sm:space-y-1 sm:justify-between sm:pt-4 sm:pl-4`}
      >
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
            <Link to="/dashboard/search">
              <li>
                <button
                  className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm
                 text-gray-500 transition duration-200 ease-in-out transform rounded-lg 
                 focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                  onClick={() => {
                    setShowNav(!showNav);
                  }}
                >
                  <span className="ml-4">Search</span>
                </button>
              </li>
            </Link>
            <Link to="/dashboard/nearme">
              <li>
                <button
                  className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm
                 text-gray-500 transition duration-200 ease-in-out transform rounded-lg 
                 focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                  onClick={() => {
                    setShowNav(!showNav);
                  }}
                >
                  <span className="ml-4">Near Me</span>
                </button>
              </li>
            </Link>
            <Link to="/dashboard/history">
              {" "}
              <li>
                <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                  <span className="ml-4">History</span>
                </div>
              </li>
            </Link>
          </ul>
          {/*
           Tools
           */}
          {/* <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
            Explore
          </p>
          <ul>
            <Link to="/dashboard/search">
              <li>
                <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                  <span className="ml-4">Search</span>
                </div>
              </li>
            </Link>
            <Link to="/dashboard/nearme">
              <li>
                <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                  <span className="ml-4">Near Me</span>
                </div>
              </li>
            </Link>
            <li>
              <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                <span className="ml-4">History</span>
              </div>
            </li>
          </ul> */}
        </div>

        {/* the bottom part */}
        <div className="pb-4">
          {" "}
          {/* <hr></hr> */}
          <ul>
            <Link to="/dashboard/profile">
              <li>
                <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                  <span className="ml-4">Profile</span>
                </div>
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
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden p-6  ">
        {content}
        {/* teams */}
        {/* otherthing */}
      </div>
    </div>
  );
};

export default Dashboard;
