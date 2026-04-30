import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageName, setImageName] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);

  const loggedInUserId = localStorage.getItem("userId");

  // 🔥 Fetch post + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await API.get(`/posts/${postId}`);
        const catRes = await API.get("/categories/");

        const post = postRes.data;

        // ✅ OWNER CHECK
        if (parseInt(loggedInUserId) !== post.userId) {
          alert("Not allowed");
          navigate("/");
          return;
        }

        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.categoryId);
        setCategories(catRes.data.content);
        setImageName(post.imageName);

        // 🔥 show existing image
        setImagePreview(
          `http://localhost:8080/api/posts/image/${post.imageName}`
        );

      } catch (err) {
        console.error(err);
        alert("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  // 🔥 handle new image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 🔥 UPDATE POST
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Step 1: update text data
      const updatedPost = {
        title,
        content,
        categoryId: parseInt(categoryId),
        imageName,
      };

      await API.put(`/posts/${postId}`, updatedPost);

      // Step 2: upload new image (if selected)
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await API.post(`/posts/image/upload/${postId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Post updated successfully");
      navigate(`/post/${postId}`);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Edit Post</h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            className="w-full border p-3 rounded"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            className="w-full border p-3 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryTitle}
              </option>
            ))}
          </select>
        </div>

        {/* 🔥 IMAGE SECTION */}
        <div>
          <label className="block mb-2 font-semibold">
            Change Image (optional)
          </label>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-60 h-60 object-cover rounded"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;