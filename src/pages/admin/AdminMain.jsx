
import AddCategoryForm from './AddCategoryForm';
import './Admin.css';
import { Link } from 'react-router-dom';
const AdminMain = () => {
    return (<div className="admin-main">
        <div className="admin-main-header">
            <div className="admin-main-card">
                <h5 className="admin-card-title">users</h5>
                <div className="admin-card-count">
                    120
                </div>
                <div className="admin-card-link-wrapper">
                    <Link to="/admin-dashboard/users-table" className="admin-card-link">
                    see all users
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-person">

                        </i>
                    </div>
                </div>
            </div>

            <div className="admin-main-card">
                <h5 className="admin-card-title">posts</h5>
                <div className="admin-card-count">
                    210
                </div>
                <div className="admin-card-link-wrapper">
                    <Link to="/admin-dashboard/posts-table" className="admin-card-link">
                    see all posts
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-file-post">

                        </i>
                    </div>
                </div>
            </div>

            <div className="admin-main-card">
                <h5 className="admin-card-title">categories</h5>
                <div className="admin-card-count">
                    10
                </div>
                <div className="admin-card-link-wrapper">
                    <Link to="/admin-dashboard/categories-table" className="admin-card-link">
                    see all categories
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-tag-fill">

                        </i>
                    </div>
                </div>
            </div>

            <div className="admin-main-card">
                <h5 className="admin-card-title">comments</h5>
                <div className="admin-card-count">
                    44
                </div>
                <div className="admin-card-link-wrapper">
                    <Link to="/admin-dashboard/comments-table" className="admin-card-link">
                    see all comments
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-chat-left-text">

                        </i>
                    </div>
                </div>
            </div>
        </div>

        <AddCategoryForm/>


    </div>  );
}

export default AdminMain;