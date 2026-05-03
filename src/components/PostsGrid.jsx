import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const PostsGrid = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    API.get("/categories/")
      .then((res) => setCategories(res.data.content))
      .catch((err) => console.error(err));
  }, []);

  // ✅ COMMON FETCH (ALL + CATEGORY)
  const fetchPosts = (page = 0, category = selectedCategory) => {
    setLoading(true);

    let url =
      category === "all"
        ? `/posts/?pageNumber=${page}&pageSize=${pageSize}`
        : `/posts/category/${category}?pageNumber=${page}&pageSize=${pageSize}`;

    API.get(url)
      .then((res) => {
        setPosts(res.data.content); // ✅ FIX
        setPageNumber(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Run when category changes
  useEffect(() => {
    fetchPosts(0, selectedCategory);
  }, [selectedCategory]);

  const handlePrevious = () => {
    if (pageNumber > 0) fetchPosts(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1)
      fetchPosts(pageNumber + 1);
  };

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="px-6 md:px-16 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        All Articles
      </h2>

      {/* Categories */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.categoryId}
            onClick={() => setSelectedCategory(cat.categoryId)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === cat.categoryId
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {cat.categoryTitle}
          </button>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-center">No posts found</p>
      ) : (
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
                <h3 className="text-lg font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {post.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ✅ Pagination (FOR ALL + CATEGORY) */}
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

export default PostsGrid;