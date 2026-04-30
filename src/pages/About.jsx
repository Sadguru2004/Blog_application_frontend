import React from "react";
import girlImage from "../images/girl.jpg";
import boyImage from "../images/boy.png";
import missionImage from "../images/work.avif";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src={missionImage} // replace with your image
            alt="About Hero"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About MyBlog</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Sharing knowledge, stories, and insights on technology, travel, food, and lifestyle.
          </p>
        </div>
      </section>

      {/* Mission / Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={missionImage}
            alt="Our Story"
            className="rounded-lg shadow-lg w-full h-80 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              At MyBlog, we aim to inspire and educate our readers by sharing meaningful content that enriches their lives. From tech tutorials to travel guides, recipes, and lifestyle tips, we strive to cover topics that matter.
            </p>
            <p>
              Founded in 2024, our blog has grown into a vibrant community where readers and authors connect, share, and learn together.
            </p>
          </div>
        </div>
      </section>

      {/* Team / Author Info */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {/* Example Team Member */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={girlImage}
                alt="Author"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Sneha Joshi</h3>
              <p className="text-gray-500">Founder & Tech Writer</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={boyImage}
                alt="Author"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
              <p className="text-gray-500">Travel Blogger</p>
            </div>
            {/* Add more members here */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-20 text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Community
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss an update from MyBlog.
        </p>
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition">
          Subscribe Now
        </button>
      </section>
    </div>
  );
};

export default About;