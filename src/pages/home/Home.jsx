import "./Home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";

import { getAdmin } from "./../../redux/apiCalls/profileApiCalls";
import Sidenaav from "../../components/header/sidenav/Sidenaav";
import PostItem from "../../components/posts/PostItem";
import { Avatar } from "@mui/material";

const Home = () => {


  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const { admin } = useSelector((state) => state.profile);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts(1));
    dispatch(fetchCategories());
    dispatch(getAdmin());
      window.scrollTo(0, 0);

  }, []);

  return (
    <section className=" w-full h-auto flex flex-col min-h-auto box-border ">
      <div className=" relative box-border w-full h-[564px] mb-11  ">

        <div className="  h-[560px] mt-1 pt-3  box-border flex flex-col justify-end items-center  text-center bg-white absolute top-0 right-0 w-full ">

          <img className=" adminPic object-cover inline-block rounded-full mb-6"
           src={admin?.profilePhoto?.url} />
          <span className=" text-black font-semibold lg:text-4xl md:text-2xl sm:text-lg mb-6">I'm Sarah Ibrahim</span>
          <ul
            className="scaleUp flex flex-row justify-center w-{250.625px} mb-6  "
          >
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">F</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">r</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">o</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">n</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">t</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">e</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">n</li>
            <li className=" lg:text-4xl mr-4 md:text-2xl sm:text-lg">d</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">D</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">e</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">v</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">e</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">l</li>
            <li className=" lg:text-4xl md:text-2xl sm:text-lg">o</li>
            <li className="lg:text-4xl md:text-2xl sm:text-lg">p</li>
            <li className="lg:text-4xl md:text-2xl sm:text-lg">e</li>
            <li className="lg:text-4xl md:text-2xl sm:text-lg">r</li>
          </ul>

          <span className="font-normal text-center sm:px-5 md:px-5 mb-6 text-faint-gray whitespace-wrap lg:text-lg leading-8 md:text-base sm:text-sm">
            Welcome to my blog! This is a site where I share my projects,
            guides, photos, videos, and much more.
          </span>
          <div className="w-full flex flex-row items-center justify-center z-10">

            <button className="smIcon" href='https://www.linkedin.com/in/sarahibrahim0' target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in lg:text-xl md:text-base sm:text-base"></i>
                        </button>
                        <button className="smIcon" href='https://github.com/sarahibrahim0' target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github lg:text-xl md:text-base sm:text-base" ></i>
            </button>
            <button className="smIcon" href="mailto:sarahibrahimabdelhaimd@gmail.com" >
            <i className="fa-brands fa-google lg:text-xl md:text-base sm:text-base"></i>
            </button>
            <button className="smIcon" href='#' >
            <i className="fa-brands fa-facebook lg:text-xl md:text-base sm:text-base"></i>
            </button>
            <button className="smIcon" href="#" >
            <i className="fa-brands fa-whatsapp lg:text-xl md:text-base sm:text-base"></i></button>

          </div>
        </div>

      </div>


      {posts.length > 0 ? (
        <div className=" flex flex-row items-center text-blue-black h-[30px]">
          <h4 className="home-latest-post" >
            <span >Recent Posts</span>
       </h4>
        </div>
      ) : (

        <div className=" flex flex-row items-center text-blue-black h-[30px]">
      <h4 className="home-latest-post">
                    <span >No Posts Yet</span>
</h4>
      </div>

      )}
      <div className=" mt-11 px-5 2xl:pt-5 xl:p-5 lg:pt-5 md:pt-0 sm:pt-0 box-border grid gap-7 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 h-auto">
      {posts &&
        posts.map((post,index) =>
           <div key={index} className="">
            <PostItem post={post}/>
            </div>

        )}
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
