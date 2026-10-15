import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import AdminTableLayout from "./AdminTableLayout";
import DataTable from "../../components/table/DataTable";
import {
  deletePost,
  fetchAllPosts,
  togglePostActive,
} from "../../redux/apiCalls/postApiCalls";

const PostsTable = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(postId));
      }
    });
  };

  const columns = [
    {
      key: "user",
      header: "User",
      render: (post) => (
        <div className="data-table-user">
          <img
            src={post?.user?.profilePhoto?.url}
            alt=""
            className="data-table-avatar"
          />
          <span className="data-table-username">{post?.user?.username}</span>
        </div>
      ),
    },
    {
      key: "title",
      header: "Post Title",
      render: (post) => (
        <span className="data-table-truncate">{post?.title}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (post) => (
        <button
          onClick={() => dispatch(togglePostActive(post?._id))}
          className={`data-table-btn ${
            post?.isActive === false
              ? "data-table-btn--muted"
              : "data-table-btn--active"
          }`}
        >
          {post?.isActive === false ? "Inactive" : "Active"}
        </button>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (post) => (
        <div className="data-table-actions">
          <Link
            to={`/posts/details/${post?._id}`}
            className="data-table-btn"
          >
            View Post
          </Link>
          <button
            onClick={() => deletePostHandler(post?._id)}
            className="data-table-btn data-table-btn--danger"
          >
            Delete Post
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTableLayout title="Posts">
      <DataTable
        columns={columns}
        rows={posts}
        rowKey="_id"
        loading={loading}
        emptyText="No Posts Were Found"
      />
    </AdminTableLayout>
  );
};

export default PostsTable;
