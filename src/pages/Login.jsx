import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validation function
  useEffect(() => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return; // prevent submission

    try {
      const res = await axios.post("https://blog-application-backend-1-mvva.onrender.com/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.userId);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setErrors({ submit: "Invalid email or password" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border rounded focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
        </div>

        {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full p-3 rounded text-white ${
            isValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;