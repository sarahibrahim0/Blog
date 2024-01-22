

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Sidenav, initTE } from 'tw-elements';
import './Sidenaav.css';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../redux/apiCalls/categoryApiCalls';
import { logoutUser } from '../../../redux/apiCalls/authApiCall';


  const Sidenaav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {categories} = useSelector((state)=>state.category);
    const {user} = useSelector((state)=>state.auth);


useEffect(()=>{
    initTE({Sidenav});
},[]);

const handleClick = ()=>{
dispatch(logoutUser())
navigate('/')
}

useEffect(()=>{
 dispatch(fetchCategories());
},[]);

    return (
 <>
<nav
  id="sidenav-1"
  className="absolute left-0 top-0 z-40 h-full w-60 -translate-x-full py-5 overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
  data-te-sidenav-init
  data-te-sidenav-hidden="true"
  data-te-sidenav-position="fixed">
  <ul className="relative m-0 list-none " data-te-sidenav-menu-ref>

  <li className="relative ">
      <Link
        to='/'
        className=" flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-blue-black outline-none transition-all duration-300 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref >

        <span>Home</span>
      </Link>
    </li>
    <li className="relative">
      <Link
        className="flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition-all duration-700 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref>
        <span>Categories</span>
        <span
          className="rotate-180 absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear  [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
          data-te-sidenav-rotate-icon-ref>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd" />
          </svg>
        </span>
      </Link>
      <ul
        className=" w-full !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block transition-all duration-300 ease-in-out "
        data-te-sidenav-collapse-ref
        >
{
categories?.map((category,index)=>{
  return ( <li key={index} className="relative w-full">
  <Link
    to={`posts/categories/${category.title}`}
    className="flex h-6 cursor-pointer items-center truncate rounded-sm py-4  px-6 pr-6 text-[0.78rem] text-blue-black outline-none transition duration-300 ease--in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none "
    data-te-sidenav-link-ref>
{      category?.title
}    </Link>
</li>)
})
}

      </ul>
    </li>

    <li className="relative ">
      <Link
        to='/posts'
        className=" flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-blue-black outline-none transition-all duration-300 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref >

        <span>Posts</span>
      </Link>
    </li>


    {user?.isAdmin && (

    <li className="relative ">
      <Link
            to="/posts/create-post"
            className=" flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-blue-black outline-none transition-all duration-300 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref >

        <span>Create Post</span>
      </Link>
    </li>)}

    {user?.isAdmin && (

    <li className="relative ">
      <Link
            to="/admin-dashboard"
            className=" flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-blue-black outline-none transition-all duration-300 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref >

        <span>Dashboard</span>
      </Link>
    </li>)}

{user &&     <li className="relative ">
      <Link
            to={`/profile/${user?._id}`}
            className=" flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-blue-black outline-none transition-all duration-300 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref >

        <span>Profile</span>
      </Link>
    </li>}


{user? (
      <li className="relative ">
      <Link
             onClick={handleClick}
            className=" flex h-12 cursor-pointer items-center truncate rounded-sm px-6 py-4 text-[0.875rem] text-blue-black outline-none transition-all duration-300 ease-in-out hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref >

        <span>Log Out</span>
      </Link>
    </li>
):
''}

      </ul>

</nav>


<button
  className="dropButton text-white fixed z-30 2xl:left-[30px] xl:left-[30px] lg:left-[30px] md:left-[8px] sm:left-[8px]  2xl:top-[60px] xl:top-[60px] lg:top-[60px] md:top-[147.5px] sm:top-[147.5px]  inline-block rounded  2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-4 2xl:py-3 xl:py-3 lg:py-3 md:py-2 sm:py-2 text-lg font-medium uppercase leading-tight  shadow-md transition duration-150 ease-in-out bg-black  hover:bg-[#4776E6]"
  data-te-sidenav-toggle-ref
  data-te-target="#sidenav-1"
  aria-controls="#sidenav-1"
  aria-haspopup="true">
  <span className=" block text-inherit">
  <i className="fa-solid fa-bars text-inherit" ></i>  </span>
</button>
</>
     )
    }

  export default Sidenaav;