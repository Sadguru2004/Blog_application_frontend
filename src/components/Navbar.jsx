import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, loggedInUserId, username }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

 const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  setIsLoggedIn(false);

  navigate("/login"); 
};

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative z-50 flex justify-between items-center px-8 py-4 bg-linear-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 shadow-sm backdrop-blur-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-700">MyBlog</h1>

      {/* Links */}
      <div className="hidden md:flex gap-8 text-gray-700 font-medium">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link to="/categories" className="hover:text-indigo-600 transition">Categories</Link>
        <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
        {isLoggedIn && (
          <Link to="/create-post" className="hover:text-indigo-600 transition">Create Post</Link>
        )}
      </div>

      {/* Right side: login/logout/profile */}
      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {/* Font Awesome User Icon */}
            <div
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <i className="fas fa-user text-gray-700 text-xl"></i>
            </div>

            {showDropdown && (
  <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md text-gray-700 z-50">
    {/* Username */}
    <div className="px-4 py-2 border-b border-gray-100">
      <p className="font-semibold">{username || "User"}</p>
    </div>

    {/* My Profile */}
    <Link
     to={`/profile/${loggedInUserId || localStorage.getItem("userId")}`}
      className="block px-4 py-2 hover:bg-indigo-50 transition"
      onClick={() => setShowDropdown(false)}
    >
      My Profile
    </Link>

    {/* Logout */}
    <button
      className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
)}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;