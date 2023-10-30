

import PostList from "../../components/posts/PostList";
import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";


const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const {categories} = useSelector(state=>state.category)

  useEffect(() => {
    dispatch(fetchPosts(1));
    dispatch(fetchCategories())
  }, []);

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to Blog</h1>
        </div>
      </div>
{    posts.length>0 ? ( <div className="home-latest-post">Latest Posts</div>) :  (<div className="home-latest-post">No Posts Yet</div>)
}
<div className="home-container">
        <PostList posts={posts} />
        <Sidebar categories= {categories} />
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
