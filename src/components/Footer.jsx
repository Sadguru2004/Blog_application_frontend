import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">MyBlog</h2>
          <p className="text-gray-400">
            Sharing knowledge, travel tips, tech trends, and recipes with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-indigo-500 transition">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/categories/1" className="hover:text-indigo-500 transition">
                Technology
              </Link>
            </li>
            <li>
              <Link to="/categories/2" className="hover:text-indigo-500 transition">
                Travel
              </Link>
            </li>
            <li>
              <Link to="/categories/3" className="hover:text-indigo-500 transition">
                Food
              </Link>
            </li>
            <li>
              <Link to="/categories/4" className="hover:text-indigo-500 transition">
                Programming
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400">123 Street, Pune, India</p>
          <p className="text-gray-400 mt-2">Email: info@myblog.com</p>
          <p className="text-gray-400 mt-2">Phone: +91 9876543210</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-indigo-500 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 py-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;