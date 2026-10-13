import { NavLink } from "react-router-dom";
import "./Admin.css";

const links = [
  {
    to: "/admin-dashboard/users-table",
    icon: "fa-regular fa-user",
    label: "Users",
  },
  {
    to: "/admin-dashboard/posts-table",
    icon: "fa-regular fa-newspaper",
    label: "Posts",
  },
  {
    to: "/admin-dashboard/categories-table",
    icon: "fa-solid fa-list-ul",
    label: "Categories",
  },
  {
    to: "/admin-dashboard/comments-table",
    icon: "fa-regular fa-comment",
    label: "Comments",
  },
];

const AdminSidebar = () => {
  return (
    <div className="admin-panel admin-sidebar-card">
      <span className="admin-sidebar-heading">Manage</span>
      <nav className="admin-sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "admin-nav-link--active" : ""}`
            }
          >
            <i className={`${link.icon} admin-nav-icon`}></i>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
