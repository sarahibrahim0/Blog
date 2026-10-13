import AdminSidebar from "./AdminSidebar";
import "../../components/table/DataTable.css";

const AdminTableLayout = ({ title, children }) => {
  return (
    <section className="admin-table-page">
      <aside className="admin-dashboard-aside">
        <AdminSidebar />
      </aside>
      <main className="admin-table-main">
        <span className="admin-table-title">{title}</span>
        {children}
      </main>
    </section>
  );
};

export default AdminTableLayout;
