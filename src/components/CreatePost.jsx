import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Assume logged-in user ID is stored in localStorage
  const userId = localStorage.getItem("userId"); // or from auth context

  // Fetch categories on mount
  useEffect(() => {
    API.get("/categories/")
      .then((res) => setCategories(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !categoryId) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create post
      console.log("userId:", userId);
    console.log("categoryId:", categoryId);
      const postData = {
        title,
        content,
        userId: parseInt(userId),
        categoryId: parseInt(categoryId),
      };
      const postRes = await API.post("/posts/", postData);
      const postId = postRes.data.postId;

      // Step 2: Upload image if selected
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await API.post(`/posts/image/upload/${postId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Post created successfully!");
      navigate(`/post/${postId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Post</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Content
          </label>
          <textarea
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-500"
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

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Post Image (optional)
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-48 h-48 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;