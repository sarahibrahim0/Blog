import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import "./PostDetails.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePost,
  deletePost,
  fetchPostById,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCalls";
const PostDetails = () => {
  const { id } = useParams();
  const initialValues = {
    image: "",
  };

  const [updatePost, setUpdatePost] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostById(id));
    window.scrollTo(0, 0);
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!image) return toast.warning("there is no image!");
    const imageFormData = new FormData();
    imageFormData.append("image", image);
    // for (let pair of imageFormData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    dispatch(updatePostImage(imageFormData, post?._id));
  };

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        console.log(post?._id)
        console.log(user?._id)
        dispatch(deletePost(post?.id));
        navigate(`/profile/${user?._id}`);
        swal("post has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          className="post-details-image"
          src={image ? URL.createObjectURL(image) : post?.image.url}
          alt="post"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label className="update-post-image" htmlFor="image">
              <i className="bi bi-image-fill"></i> select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description} ... Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
        ratione sint animi illo id accusamus obcaecati dolore voluptatibus
        aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
        Laboriosam rem quod, explicabo similique aliquam unde sed vel
        distinctio, fugiat ab aperiam odio nesciunt quas?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user && <AddComment postId={post?._id}/>} <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
