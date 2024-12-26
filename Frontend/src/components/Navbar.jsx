import React, { useState } from "react";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Logic for logging out
    // console.log(ServerUrl)
     window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/logout`;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add logic for search functionality if needed
  };

  return (
    
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-400 bg-gray-100 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
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
              aria-current="page"
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
            {/* Search Bar */}
            {/* <div className="relative mx-4">
              <input
                type="text"
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 bg-violet-200 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div> */}
            <a
              className="hidden items-center justify-center rounded-xl bg-violet-200 px-3 py-2 text-m font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href="/create"
            >
              Create Post
            </a>
            <div className="relative">
              <button
                className="inline-flex items-center justify-center rounded-full bg-gray-200 p-1"
                onClick={toggleDropdown}
              >
                <img
                  className="h-10 w-10 rounded-full m-0"
                  src="../cstm-assets/blog.jpg" // replace with dynamic image URL if needed
                  alt="Profile"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 px-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-violet-200">
                  <ul>
                    <li>
                      <button
                        className="block w-full px-2 py-2 font-medium text-lg text-gray-700 "
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
