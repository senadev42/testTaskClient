import { Link } from "react-router-dom";

import { RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

import { useLocation } from "react-router-dom";

//global state
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
//store
import { RootState } from "../store";
import { useEffect, useState, useRef } from "react";

import { toast } from "react-toastify";

const Header: React.FC = () => {
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsLoggedoutDropdownOpen(false);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  //redux
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  //both sets of drop downs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedoutDropdownOpen, setIsLoggedoutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    console.log("button clicked");
    try {
      // send log out api call
      await logoutApiCall();
      // clear local storage
      dispatch(logout());
      //back to homepage
      navigate("/");
      //tell user
      toast.success("You're Logged Out");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const Dropdown = (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        type="button"
        className="text-white  rounded-sm flex flex-row items-center text-sm px-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Welcome {userInfo?.name}
        <RiArrowDropDownLine className=" text-2xl m-2  mt-3" />
      </button>

      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          onBlur={() => {
            setIsDropdownOpen(false);
          }}
        >
          <div
            className=""
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              type="button"
              className=" w-full  py-4 px-12  text-sm text-gray-700 hover:text-teal-500"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <hr></hr>
            <button
              type="button"
              className="block py-4 px-12 text-sm text-gray-700 hover:text-teal-500"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const loggedout = (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center">
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
  );

  //check if location contains /dashboard and if so return <></>

  if (location.pathname.includes("/dashboard")) {
    return <></>;
  }

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

          {userInfo == null ? loggedout : Dropdown}
        </div>
      </div>
    </nav>
  );
};

export default Header;
