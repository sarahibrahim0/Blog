import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";

import Sidenaav from "../../components/header/sidenav/Sidenaav";
import PostItem from "../../components/posts/PostItem";
import PostCardSkeleton from "../../components/skeleton/PostCardSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts(1));
    dispatch(fetchCategories());
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className=" w-full h-auto flex flex-col min-h-auto box-border ">
      <div className=" relative box-border w-full mb-11 px-5">
        <div className=" blogHero relative overflow-hidden box-border w-full rounded-3xl px-6 py-16 2xl:py-20 lg:py-16 md:py-12 sm:py-10 flex flex-col items-center text-center">
          <span className="blogHero__eyebrow">WELCOME TO THE BLOG</span>
          <h1 className="blogHero__title">Stories, Guides &amp; Ideas</h1>
          <p className="blogHero__subtitle">
            A place where I share my projects, guides, photos, videos and much
            more. Dive in and explore the latest articles.
          </p>

          {categories?.length > 0 && (
            <ul className="blogHero__tags">
              {categories.slice(0, 6).map((category) => (
                <li key={category?._id}>
                  <Link to={`/posts/categories/${category?.title}`}>
                    {category?.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link to="/posts" className="blogHero__cta">
            <i className="fa-solid fa-book-open mr-2"></i>
            Browse Posts
          </Link>
        </div>
      </div>

      {posts.length > 0 || loading ? (
        <div className=" flex flex-row items-center text-blue-black h-[30px]">
          <h4 className="home-latest-post">
            <span>Recent Posts</span>
          </h4>
        </div>
      ) : (
        <div className=" flex flex-row items-center text-blue-black h-[30px]">
          <h4 className="home-latest-post">
            <span>No Posts Yet</span>
          </h4>
        </div>
      )}
      <div className=" mt-11 px-5 2xl:pt-5 xl:p-5 lg:pt-5 md:pt-0 sm:pt-0 box-border grid gap-7 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 h-auto">
        {loading && posts.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
          : posts &&
            posts.map((post, index) => (
              <div key={index} className="">
                <PostItem post={post} />
              </div>
            ))}
      </div>

      <Link to="/posts" className=" self-center  mt-11 z-10">
        <button className="rounded-full border-[1px]  px-7 py-3	hover:text-white  hover:bg-[#4776E6] transition-all duration-500 ease-in-out text-normal">
          Load More
        </button>
      </Link>
    </section>
  );
};

export default Home;
