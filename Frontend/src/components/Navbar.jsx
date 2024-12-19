import React, { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Logic for logging out
    console.log("User logged out");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add logic for search functionality if needed
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-400 bg-gray-50 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
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
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-m font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-m font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Profile
            </a>
            {/* Search Bar */}
            <div className="relative mx-4">
              <input
                type="text"
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <a
              className="hidden items-center justify-center rounded-xl bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href="/create-post"
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
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                  <ul>
                    <li>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
