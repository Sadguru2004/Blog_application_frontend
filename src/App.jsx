import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedPosts from "./components/FeaturedPosts";
import PostsGrid from "./components/PostsGrid"; 
import PostDetail from "./components/PostDetail";
import Categories from "./components/Categories";
import CategoryPosts from "./components/CategoryPosts";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditPost from "./pages/EditPost";
import { useState,useEffect, use } from "react";
import { jwtDecode } from "jwt-decode";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
   const [username, setUsername] = useState("");

   const token = localStorage.getItem("token");
useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub); 
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUsername("");
      }
    }
  }, [token]);


  return (
    <div className="flex flex-col min-h-screen">
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}    
        username={username}
      />
      <div className="flex-1">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedPosts />
              <PostsGrid />
            </>
          }
        />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/categories/" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<CategoryPosts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/about" element={<About />} />
       <Route path="/profile/:userId" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App;