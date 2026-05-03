import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

const CategoryPosts = () => {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // ✅ Fetch posts with pagination
  const fetchPosts = (page = 0) => {
    setLoading(true);

    API.get(
      `/posts/category/${categoryId}?pageNumber=${page}&pageSize=${pageSize}`
    )
      .then((res) => {
        setPosts(res.data.content); // ✅ IMPORTANT FIX
        setPageNumber(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts(0);
  }, [categoryId]);

  // Fetch category name
  useEffect(() => {
    API.get("/categories")
      .then((res) => {
        const cat = res.data.content.find(
          (c) => c.categoryId === parseInt(categoryId)
        );
        setCategoryName(cat?.categoryTitle || "this category");
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  const handlePrevious = () => {
    if (pageNumber > 0) fetchPosts(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) fetchPosts(pageNumber + 1);
  };

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;
  if (posts.length === 0)
    return <p className="text-center mt-10">No posts found.</p>;

  return (
    <div className="px-6 md:px-16 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Posts in {categoryName}
      </h2>

      {/* Posts */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.postId}
            to={`/post/${post.postId}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={`https://blog-application-backend-1-mvva.onrender.com/api/posts/image/${post.imageName}`}
              alt={post.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.content}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={handlePrevious}
          disabled={pageNumber === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span>
          Page {pageNumber + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={pageNumber === totalPages - 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPosts;