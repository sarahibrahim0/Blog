import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {  useSelector , useDispatch} from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import { useNavigate } from "react-router-dom";


const Navbar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const  {categories} = useSelector((state) => state.category);

  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (item) => {


      navigate(`posts/categories/${item.title}`);
      setDropdown(false);

  };

  useEffect(() => {
    dispatch(fetchCategories());

  }, []);


  return (
    <nav className="box-border  px-4  flex flex-row justify-center" >
      <ul className="w-full flex flex-row justify-between items-center  2xl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-sm">
        <Link className="navLink 2xl:mr-3 xl:mr-3 lg:mr-3 md:mr-1 sm:mr-1 2xl:text-base xl:text-base lg:text-sm" to="/" onClick={() => setToggle(false)}>
          Home
        </Link>

        <Link onClick={() => setToggle(false)} className="navLink 2xl:mr-3 xl:mr-3 lg:mr-3 md:mr-1 sm:mr-1 2xl:text-base xl:text-base lg:text-sm " onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}>

Categories
          <ul className={!dropdown ? "dropdown mt-1" : "activedrop mt-1"} >
              {categories?.map((item, index) => {
                return (
                  <Link
                  key={index}
                  to={`posts/categories/${item.title}`}
                  className={!dropdown ?"linkWrapperHidden": "linkWrapper"} >

                  <li key={index}
                  // onClick={() => handleClick(item)}
                   className="headerRightNavLink">
                    <span className="">{item?.title}</span>
                  </li>

                </Link>
                );
              })}

            </ul>
</Link>

        <Link to="/posts" onClick={() => setToggle(false)} className="navLink 2xl:mr-3 xl:mr-3 lg:mr-3 md:mr-1 sm:mr-1  2xl:text-base xl:text-base lg:text-sm">
          <span>
          Posts
          </span>
        </Link>


        {user?.isAdmin && (
          <Link
            to="/posts/create-post"
            onClick={() => setToggle(false)}
            className="navLink 2xl:mr-3 xl:mr-3 lg:mr-3 md:mr-1 sm:mr-1 2xl:text-base xl:text-base lg:text-sm"
          >
            Create
          </Link>
        )}


        {user?.isAdmin && (
          <Link
            to="/admin-dashboard"
            onClick={() => setToggle(false)}
            className="navLink whitespace-nowrap 2xl:mr-3 xl:mr-3 lg:mr-3 md:mr-1 sm:mr-1 2xl:text-base xl:text-base lg:text-sm"
          >
            Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
