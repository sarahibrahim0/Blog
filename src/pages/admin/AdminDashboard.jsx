import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import './Admin.css'

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
                    <AdminSidebar/>
        <AdminMain/>
        </div>

    );
}

export default AdminDashboard;