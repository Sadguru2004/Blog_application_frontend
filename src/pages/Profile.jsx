import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

const Profile = () => {
  const params = useParams();

  // ✅ Fallback: URL → localStorage
  const userId = params.userId || localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH USER + POSTS SAFELY
  useEffect(() => {
    if (!userId || userId === "undefined") {
      setError("Invalid user. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    Promise.allSettled([
      API.get(`/users/${userId}`),
      API.get(`/posts/user/${userId}?pageNumber=0&pageSize=${pageSize}`)
    ])
      .then(([userRes, postRes]) => {
        // 👤 USER
        if (userRes.status === "fulfilled") {
          setUser(userRes.value.data);
        } else {
          setError("Unable to load user profile.");
        }

        // 📝 POSTS
        if (postRes.status === "fulfilled") {
          const data = postRes.value.data;
          setPosts(data.content || []);
          setPageNumber(data.pageNumber || 0);
          setTotalPages(data.totalPages || 0);
          setTotalElements(data.totalElements || 0);
        } else {

          setPosts([]);
        }
      })
      .finally(() => setLoading(false));

  }, [userId]);

  // ✅ PAGINATION
  const fetchPosts = (page = 0) => {
    if (!userId) return;

    setLoading(true);

    API.get(`/posts/user/${userId}?pageNumber=${page}&pageSize=${pageSize}`)
      .then((res) => {
        const data = res.data;
        setPosts(data.content || []);
        setPageNumber(data.pageNumber || 0);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
      })
      .catch((err) => {
        console.error(err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  };

  const handlePrevious = () => {
    if (pageNumber > 0) fetchPosts(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) fetchPosts(pageNumber + 1);
  };

  // ❗ No userId
  if (!userId) {
    return (
      <p className="text-center mt-10 text-red-500">
        User not found. Please login again.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* 🔥 PROFILE HEADER */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-6 mb-10">
        
        {/* Avatar */}
        <div className="w-20 h-20 bg-indigo-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {user?.name?.charAt(0) || "U"}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name || "User"}
          </h2>

          <p className="text-gray-500">
            {user?.email || ""}
          </p>

          <div className="flex gap-6 mt-2 text-sm text-gray-600">
            <span>
              <strong>{totalElements}</strong> Posts
            </span>
          </div>
        </div>
      </div>

      {/* 🔥 POSTS */}
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        User Posts
      </h3>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* ✅ NO NESTED LINK ISSUE */}
              <Link to={`/post/${post.postId}`}>
                <img
                  src={`https://blog-application-backend-1-mvva.onrender.com/api/posts/image/${post.imageName}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </Link>

              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">
                  <Link to={`/post/${post.postId}`}>
                    {post.title}
                  </Link>
                </h4>

                <p className="text-sm text-gray-600">
                  {post.content.substring(0, 80)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={handlePrevious}
            disabled={pageNumber === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>

          <span className="text-gray-700">
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
      )}
    </div>
  );
};

export default Profile;