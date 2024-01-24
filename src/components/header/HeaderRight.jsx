import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const items = ["profile", "logout"];
  let myClassNames = ["active", "linkWrapper"];

  const handleClick = (index,item) => {
    // console.log(index,item, activeIndex)
    // setActiveIndex(index);
    if (item === "profile") {
      navigate(`/profile/${user?._id}`);
      setDropdown(false);
    } else if (item === "logout") {
      dispatch(logoutUser());
      setDropdown(false)


    }
  };



  return (
    <div>
      {user ? (
        <>
          <div className=" relative flex flex-row items-center justify-between">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="user-name whitespace-nowrap inline-block align-bottom uppercase mr-2  cursor-pointer lg:pointer-events-auto md:pointer-events-none sm:pointer-events-none"
            >
              <span className="mr-2 2xl:text-base xl:text-base lg:text-sm md:text-sm sm:text-sm whitespace-nowrap ">
              {user?.username}
              </span>
              <i className="fa-solid fa-angle-down  text-s lg:!inline-block md:!hidden sm:!hidden"></i>
            </span>
            <Avatar
              src={user?.profilePhoto?.url}
              alt="user"
              sx={{'width':'50px', 'height':'50px','borderRadius':'50%','objectFit':'cover','display':'inlineBlock'}}
            />
            <ul className={!dropdown ? "dropDown" : "activeDrop"} >
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleClick(index, item)}
                    className={dropdown? "linkWrapper pointer-events-auto" : "pointer-events-none linkWrapper"}>
                    <Link className="headerRightNavLink">
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              })}

            </ul>
          </div>
        </>
      ) : (
        <ul className="flex flex-row" >
          <Link to="/login" className="navLink mr-3 whitespace-nowrap  2xl:text-base xl:text-base lg:text-base md:text-base sm:text-2xs ">
            <i className="bi bi-box-arrow-in-right 2xl:text-base xl:text-base lg:text-sm md:text-xs sm:text-2xs"></i>
            <span className="ml-1 2xl:text-base xl:text-base lg:text-sm md:text-xs sm:text-2xs" >Login</span>
          </Link>
          <Link to="/register" className="navLink whitespace-nowrap 2xl:text-base xl:text-base lg:text-base md:text-base sm:text-2xs " style={{ marginRight: "0" }} >
            <i className="bi bi-person-plus 2xl:text-base xl:text-base lg:text-sm md:text-xs sm:text-2xs"></i>
            <span style={{ marginLeft: "4px" }} className="2xl:text-base xl:text-base lg:text-sm md:text-xs sm:text-2xs">Register</span>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default HeaderRight;
