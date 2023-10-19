import { useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import './PostDetails.css';
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
const PostDetails = () => {
  const { id } = useParams();
  const post = posts.find((post) => post._id === parseInt(id));
  const initialValues = {
    image: "",
  };

  const [updatePost, setUpdatePost] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file!");

    console.log("image uploaded successfully")
  }

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  };


  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img src={file ? URL.createObjectURL(file) : post.image} alt="" className="post-details-image" />
        <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
          <label className="update-post-image" htmlFor="file">
            <i className="bi bi-image-fill"></i> select new image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={e => setFile(e.target.files[0])}
          />
          <button type="submit">upload</button>
        </form>
      </div>
      <h1 className="post-details-title">{post.title}</h1>
      <div className="post-details-user-info">
        <img src={post.user.image} alt="" className="post-details-user-image" />
        <div className="post-details-user">
          <strong>
            <Link to="/profile/1">{post.user.username}</Link>
          </strong>
          <span>{post.createdAt}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post.description} ... Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
        ratione sint animi illo id accusamus obcaecati dolore voluptatibus
        aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
        Laboriosam rem quod, explicabo similique aliquam unde sed vel
        distinctio, fugiat ab aperiam odio nesciunt quas?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          <i className="bi bi-hand-thumbs-up"></i>
          <small>{post.likes.length} likes</small>
        </div>
        <div>
          <i
            onClick={() => setUpdatePost(true)}
            className="bi bi-pencil-square"
          ></i>
          <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
        </div>
      </div>
     <AddComment />
      <CommentList />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
