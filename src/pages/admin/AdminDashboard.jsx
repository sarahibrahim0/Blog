import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import './Admin.css'

const AdminDashboard = () => {


    useEffect(()=>{
        window.scrollTo(0, 0);

      },[])
    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard-grid">
                <aside className="admin-dashboard-aside">
                    <AdminSidebar/>
                </aside>
                <main className="admin-dashboard-content">
                    <AdminMain/>
                </main>
            </div>
        </div>

    );
}

export default AdminDashboard;