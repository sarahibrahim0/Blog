import { Link } from 'react-router-dom';
import './Admin.css'


const AdminSidebar = () => {
    return (
       <div className="border-[1px] w-full h-auto rounded-lg ">

<ul className="w-full flex flex-col h-auto py-5">
  <div className='h-12 w-full'>
  <Link
  className='inline-block p-3 rounded-sm font-semibold w-full transition-all duration-400 ease-in-out text-blue-black hover:text-white   hover:bg-gradient-to-r from-sky-500 to-indigo-500 '
    to="/admin-dashboard/users-table">
    <i className="fa-regular fa-user mr-3  text-sm text-very-blue "></i>
        <span className='text-sm text-inherit '>
        Users</span>
    </Link>
  </div>

  <div className='h-12 w-full'>

    <Link className='inline-block p-3 rounded-sm font-semibold w-full transition-all duration-400 ease-in-out text-blue-black hover:text-white   hover:bg-gradient-to-r from-sky-500 to-indigo-500' to="/admin-dashboard/posts-table ">
    <i className="fa-regular fa-newspaper mr-3 text-very-blue text-sm"></i>
        <span className="text-sm">Posts</span>
    </Link>
    </div>

    <div className='h-12 w-full'>
    <Link className='inline-block p-3 rounded-sm font-semibold w-full transition-all duration-400 ease-in-out text-blue-black hover:text-white   hover:bg-gradient-to-r from-sky-500 to-indigo-500' to="/admin-dashboard/categories-table">
    <i className="fa-solid fa-list-ul mr-3 text-very-blue text-sm"></i>
      <span className="text-sm">
        Categories
      </span>
    </Link>
    </div>
    <div className='h-12 w-full'>
    <Link  className='inline-block p-3 rounded-sm font-semibold w-full  text-blue-black hover:text-white hover:bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-400 ease-in-out '  to="/admin-dashboard/comments-table">
    <i className="fa-regular fa-comment mr-3 text-very-blue text-sm"></i>
      <span className="text-sm">
        Comments
      </span>
    </Link>
    </div>
</ul>
 </div> );
}

export default AdminSidebar;