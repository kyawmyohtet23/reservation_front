import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { ThemeContext } from "../contexts/ThemeContext";
import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";
import useTheme from "../hooks/useTheme";
import Register from "./Register";
import Login from "./Login";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  let { theme, isDark, changeTheme } = useTheme();

  const [isRegisterModel, setIsRegisterModel] = useState(false);
  const [isLoginModel, setIsLoginModel] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  // useEffect(() => {
  //   const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (storedIsLoggedIn === "true") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const navigate = useNavigate();

  // const token = localStorage.getItem("token");

  // const handleLogout = async () => {
  //   try {
  //     axios
  //       .post(
  //         "http://127.0.0.1:8000/api/logout",
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.message === "Logout successful") {
  //           navigate("/");
  //         }
  //       });

  //     localStorage.removeItem("token");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isRegisterModel && <Register setIsRegisterModel={setIsRegisterModel} />}

      {isLoginModel && (
        <Login
          setIsLoginModel={setIsLoginModel}
          // setIsLoggedIn={setIsLoggedIn}
        />
      )}

      <nav
        className={`shadow sticky top-0 z-50 ${
          isDark ? "bg-dbg text-white" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
  Icon when menu is closed.

  Menu open: "hidden", Menu closed: "block"
*/}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/*
  Icon when menu is open.

  Menu open: "block", Menu closed: "hidden"
*/}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}

                  <NavLink
                    to={"/"}
                    className="hover:bg-gray-700 hover:text-white transition-all delay-150 rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/restaurants"}
                    className=" hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Restaurants
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div className="flex">
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {/*
  Dropdown menu, show/hide based on menu state.

  Entering: "transition ease-out duration-100"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100"
  Leaving: "transition ease-in duration-75"
    From: "transform opacity-100 scale-100"
    To: "transform opacity-0 scale-95"
*/}
                {/* <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex={-1}
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-0"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-1"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </div> */}
              </div>
            </div>

            {!isLoggedIn && (
              <div>
                <button
                  className="px-3 pb-1 rounded mx-2 bg-blue-500 text-white text-sm hover:bg-blue-400"
                  onClick={() => setIsLoginModel(true)}
                >
                  Login
                </button>

                <button
                  className="px-2 pb-1 rounded mx-2 bg-dbg text-white text-sm"
                  onClick={() => setIsRegisterModel(true)}
                >
                  Register
                </button>
              </div>
            )}

            {isLoggedIn && (
              <div>
                <button
                  className="px-3 pb-1 rounded mx-2 bg-red-500 text-white text-sm hover:bg-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}

            <div className="ms-5 cursor-pointer">
              {isDark && (
                <img
                  src={lightIcon}
                  alt=""
                  onClick={() => changeTheme("light")}
                />
              )}
              {!isDark && (
                <img
                  src={darkIcon}
                  alt=""
                  onClick={() => changeTheme("dark")}
                />
              )}
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        {/* <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      <a
        href="#"
        className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
        aria-current="page"
      >
        Dashboard
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
      >
        Team
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
      >
        Projects
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
      >
        Calendar
      </a>
    </div>
  </div> */}
      </nav>
    </>
  );
};

export default Navbar;
