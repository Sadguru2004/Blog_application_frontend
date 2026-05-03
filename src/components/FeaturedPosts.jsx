import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts/?pageNumber=0&pageSize=2")
      .then((res) => setPosts(res.data.content))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 md:px-16 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Posts</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            to={`/post/${post.postId}`} // <-- make the whole card clickable
            key={post.postId}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block"
          >
            <img
              src={`https://blog-application-backend-1-mvva.onrender.com/api/posts/image/${post.imageName}`}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.userName}</span>
                <span>{post.categoryName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;