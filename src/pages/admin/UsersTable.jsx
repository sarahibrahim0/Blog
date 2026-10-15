import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AdminTableLayout from "./AdminTableLayout";
import DataTable from "../../components/table/DataTable";
import {
  deleteProfile,
  getUsersProfiles,
  toggleUserActive,
} from "../../redux/apiCalls/profileApiCalls";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted, loading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getUsersProfiles());
  }, [isProfileDeleted]);

  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  const columns = [
    {
      key: "user",
      header: "User",
      render: (profile) => (
        <div className="data-table-user">
          <img
            src={profile?.profilePhoto?.url}
            alt=""
            className="data-table-avatar"
          />
          <span className="data-table-username">{profile?.username}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (profile) => profile?.email,
    },
    {
      key: "status",
      header: "Status",
      render: (profile) => (
        <button
          onClick={() => dispatch(toggleUserActive(profile?._id))}
          className={`data-table-btn ${
            profile?.isActive === false
              ? "data-table-btn--muted"
              : "data-table-btn--active"
          }`}
        >
          {profile?.isActive === false ? "Inactive" : "Active"}
        </button>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (profile) => (
        <div className="data-table-actions">
          <Link to={`/profile/${profile?._id}`} className="data-table-btn">
            View Profile
          </Link>
          <button
            onClick={() => deleteUserHandler(profile?._id)}
            className="data-table-btn data-table-btn--danger"
          >
            Delete User
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTableLayout title="Users">
      <DataTable
        columns={columns}
        rows={profiles}
        rowKey="_id"
        loading={loading}
        emptyText="No Users Were Found"
      />
    </AdminTableLayout>
  );
};

export default UsersTable;
