import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");

  const loggedInUserId = localStorage.getItem("userId");
  const isLoggedIn = !!localStorage.getItem("token");

  
  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      setError("Failed to fetch post details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${postId}`);
      alert("Post deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  
  const handleAddComment = async () => {
    if (!newComment || !isLoggedIn) return;

    try {
      await API.post("/comments/", {
        content: newComment,
        userId: parseInt(loggedInUserId),
        postId: post.postId,
      });

      setNewComment("");
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}/user/${loggedInUserId}`);
      fetchPost();
    } catch (err) {
      console.error(err);
      alert("Not allowed to delete");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Meta Info */}
      <p className="text-gray-600 mb-4">
        <strong>By:</strong> {post.userName} |{" "}
        <strong>Category:</strong> {post.categoryName} |{" "}
        <strong>Date:</strong>{" "}
        {new Date(post.addDate).toLocaleDateString()}
      </p>

      {/* Image */}
      <img
        src={`http://localhost:8080/api/posts/image/${post.imageName}`}
        alt={post.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      {/* Content */}
      <p className="text-gray-700 mb-6">{post.content}</p>

      {/* OWNER ACTIONS */}
      {parseInt(loggedInUserId) === post.userId && (
        <div className="flex gap-4 mb-6">
          <Link
            to={`/edit-post/${post.postId}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      <hr className="my-6" />

      {/* COMMENTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Comments ({post.comments.length})
        </h3>

      
        {!isLoggedIn && (
          <p className="text-sm text-gray-500 mb-4">
            Please{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              login
            </Link>{" "}
            to write a comment
          </p>
        )}

        {/* ADD COMMENT */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder={
              isLoggedIn ? "Write a comment..." : "Login to write a comment"
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isLoggedIn}
            className="flex-1 border p-2 rounded disabled:bg-gray-100"
          />

          <button
            onClick={handleAddComment}
            disabled={!isLoggedIn}
            className={`px-4 py-2 rounded text-white ${
              isLoggedIn
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>

        {/* COMMENT LIST */}
        {post.comments.length === 0 && <p>No comments yet.</p>}

        <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
         <ul className="space-y-4">
          {post.comments.map((c) => (
            <li
              key={c.commentId}
              className="border p-3 rounded bg-gray-50 flex justify-between items-start"
            >
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  {c.userName}
                </p>
                <p>{c.content}</p>
              </div>

              {/* DELETE BUTTON (ONLY POST OWNER) */}
              {isLoggedIn &&
                parseInt(loggedInUserId) === post.userId && (
                  <button
                    onClick={() => handleDeleteComment(c.commentId)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                )}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;