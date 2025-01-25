import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUser();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/logout`;
  };

  useEffect(() => {
    // console.log("User Data Updated:", user);
  }, [user]); 

  // console.log(user);

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border bg-gray-100 border-gray-400 bg-gray-100 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              <img
                className="h-12 w-auto"
                src="../cstm-assets/logo.svg"
                alt="Logo"
              />
              <p className="sr-only">Website Title</p>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-10">
            <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-gray-900 transition-all duration-200 hover:bg-violet-200 hover:text-gray-900"
              href="/"
            >
              Dashboard
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-gray-900 transition-all duration-200 hover:bg-violet-200 hover:text-gray-900"
              href="/profile"
            >
              Profile
            </a>
            {user.role == '0' && <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-gray-900 transition-all duration-200 hover:bg-violet-200 hover:text-gray-900"
              href="/create"
            >
              Create-Post
            </a>}

            <div className="relative">
              <button
                className="inline-flex items-center justify-center rounded-full bg-gray-200 p-1"
                onClick={toggleDropdown}
              >
                {user.image ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.image}
                    alt="Profile"
                  />
                
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    {/* Placeholder initials or spinner */}
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 px-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-violet-200">
                  <ul>
                    <li>
                      <button
                        className="block w-full px-2 py-2 font-medium text-lg text-gray-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
