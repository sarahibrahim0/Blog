import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home/Home";
import PostsPages from "./pages/posts-pages/PostsPages";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import PostDetails from "./pages/post-details/PostDetails";
import Category from "./pages/category/Category";
import { ToastContainer, toast } from "react-toastify";

import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import Sidenaav from "./components/header/sidenav/Sidenaav";
import { useState , useEffect} from "react";
import Footer from "./components/footer/Footer";
import EmailSent from "./pages/verify-email/EmailSent";

function App() {
  const { user } = useSelector((state) => state.auth);
  const[dropButton , showDropButton] = useState(false);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
});

  const toggleVisibility = () => {
    if (window.scrollY > 150) { // Change 300 to the scroll position you want
        showDropButton(true);
    } else {
        showDropButton(false);
    }
};

const scrollToTop = ()=>{
  window.scrollTo(0, 0);
}

useEffect(() => {
  window.addEventListener("scroll", toggleVisibility);

  return () => window.removeEventListener("scroll", toggleVisibility);
}, []);


useEffect(() => {
  const handleResize = () => {
      setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight
      });
  };

  window.addEventListener('resize', handleResize);

  return () => {
      window.removeEventListener('resize', handleResize);
  };
}, []);

  return (
    <BrowserRouter >
      <ToastContainer theme="light" position="top-center" autoClose={3000}

/>


      {dropButton || windowDimensions.width < 769 ? (<div className="z-20  relative w-full h-full">
        <Sidenaav/>
      </div>): ''}

      {dropButton  ? (     <button
      onClick={()=>scrollToTop()}
  className="dropButton text-white fixed z-20 lg:right-[30px] sm:right-[8px] bottom-[60px]   inline-block rounded  2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-4 2xl:py-3 xl:py-3 lg:py-3 md:py-2 sm:py-2 text-lg font-medium uppercase leading-tight  shadow-md transition duration-150 ease-in-out bg-black  hover:bg-[#4776E6] onHover">
  <span className=" block text-inherit">
  <i className="fa-solid fa-chevron-up text-inherit" ></i>
    </span>
</button>): ''}
     <div className="transition-all  duration-100 ease-in-out  2xl:px-[50px] xl:px-[50px] xl:pt-[50px] 2xl:pt-[50px] lg:pt-0 lg:p-0 md:p-0 sm:p-0 box-border w-full ">

<div className="bg-white  lg:rounded-3xl h-max min-w-full w-full box-border   ">
<Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/api/auth/:userId/verify/:token"
            element={!user ? <VerifyEmail /> : <Navigate to="/" />}
          />

<Route
            path="/email-sent"
            element={<EmailSent/> }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />

          <Route path="/profile/:id" element={<Profile />} />

          <Route path="posts">
            <Route index element={<PostsPages />} />
            <Route path="details/:id" element={<PostDetails />} />
            <Route path="categories/:category" element={<Category />} />
            <Route
              path="create-post"
              element={user ? <CreatePost /> : <Navigate to="/" />}
            />
          </Route>

          <Route path="admin-dashboard">
            <Route
              index
              element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="users-table"
              element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
            />
            <Route
              path="posts-table"
              element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
            />
            <Route
              path="categories-table"
              element={
                user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />
              }
            />
            <Route
              path="comments-table"
              element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
</div>



</div>



    </BrowserRouter>
  );
}

export default App;
