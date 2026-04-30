import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-24 px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Discover & Share Amazing Blogs
      </h1>
      <p className="text-lg md:text-xl mb-6 text-gray-200">
        Read, write and explore ideas from people around the world
      </p>
      <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300">
        Explore Blogs
      </button>
    </div>
  );
};

export default Hero;