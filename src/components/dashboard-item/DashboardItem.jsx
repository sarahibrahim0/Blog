import { Link } from "react-router-dom";
import "./DashboardItem.css";

const DashboardItem = ({ title, number, link, icon }) => {
  return (
    <Link to={`/admin-dashboard/${link}`} className="admin-stat">
      <span className="admin-stat-icon">
        <i className={icon}></i>
      </span>
      <span className="admin-stat-title">{title}</span>
      <span className="admin-stat-number">{number ?? 0}</span>
      <span className="admin-stat-link">
        View more <i className="bi bi-arrow-right"></i>
      </span>
    </Link>
  );
};

export default DashboardItem;
