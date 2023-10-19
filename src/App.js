import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home/Home";
import PostsPages from "./pages/posts-pages/postsPages";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer, toast } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />


        <Route path="posts">
        <Route index element={<PostsPages />} />
        <Route path="details/:id" element={<PostDetails />} />
        <Route path="categories/:category" element={<Category />} />
        <Route path="create-post" element={<CreatePost />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
