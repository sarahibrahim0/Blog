import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import './Admin.css'

const AdminDashboard = () => {


    useEffect(()=>{
        window.scrollTo(0, 0);

      },[])
    return (
        <div className=" px-2 grid gap-5 grid-cols-12 mt-10 min-h-[80vh] ">
            <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-3 md:col-span-12 sm:col-span-12 h-auto">
            <AdminSidebar/>
            </div>
            <div className="2xl:col-span-10 xl:col-span-10 lg:col-span-9 md:col-span-12 sm:col-span-12">
            <AdminMain/>
            </div>
        </div>

    );
}

export default AdminDashboard;