import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminTableLayout from "./AdminTableLayout";
import DataTable from "../../components/table/DataTable";
import {
  deleteComment,
  fetchComments,
} from "../../redux/apiCalls/commentApiCalls";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  const columns = [
    {
      key: "user",
      header: "User",
      render: (comment) => (
        <div className="data-table-user">
          <img
            src={comment?.user?.profilePhoto?.url}
            alt=""
            className="data-table-avatar"
          />
          <span className="data-table-username">{comment?.user?.username}</span>
        </div>
      ),
    },
    {
      key: "text",
      header: "Comment",
      render: (comment) => (
        <span className="data-table-truncate">{comment?.text}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (comment) => (
        <div className="data-table-actions">
          <button
            onClick={() => deleteCommentHandler(comment?._id)}
            className="data-table-btn data-table-btn--danger"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTableLayout title="Comments">
      <DataTable
        columns={columns}
        rows={comments}
        rowKey="_id"
        loading={loading}
        emptyText="No Comments Were Found"
      />
    </AdminTableLayout>
  );
};

export default CommentsTable;
