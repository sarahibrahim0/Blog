import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
            >
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt="user"
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  onClick={() => setDropdown(false)}
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span
                    onClick={() => {
                      dispatch(logoutUser());
                      setDropdown(false);
                    }}
                  >
                    Log Out
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
