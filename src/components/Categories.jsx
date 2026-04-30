import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/categories/")
      .then((res) => {
        setCategories(res.data.content); 
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;
  if (categories.length === 0) return <p className="text-center mt-10">No categories found.</p>;

  return (
    <div className="px-6 md:px-16 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">All Categories</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            to={`/categories/${cat.categoryId}`} 
            key={cat.categoryId}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800">{cat.categoryTitle}</h3>
            <p className="text-gray-600 text-sm mt-2">
              {cat.categoryDescription || "No description available"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;