import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./PostDetails.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

import swal from "sweetalert";
import {
  Popover,
  Ripple,
  initTE,
} from "tw-elements";

import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, Field, ErrorMessage, useFormik } from "formik";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import DOMPurify from "dompurify";

import {
  deletePost,
  fetchPostById,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCalls";
const PostDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const profileLink = `/profile/${post?.user._id}`;
  const [updatePost, setUpdatePost] = useState(false);
  const [img, setImg] = useState();

  const [likes, showLikes] = useState(false);

  const [share, shareList] = useState(false);

  const isLiked =
    user && post
      ? post.likes.some((likedUser) => likedUser._id === user._id)
      : false;


useEffect(()=>{
  initTE({ Popover, Ripple });

},[]);



  const showLikesList = () => {
    if (post && post.likes.length > 0) {
      showLikes((prev) => !prev);
    }
  };


  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("image is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= (1024 * 1024 * 5);
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jfif",
          ].includes(value.type)
        );
      }),
  });


  const initialValues = {
    image: null,
  };



  useEffect(() => {
    dispatch(fetchPostById(id));

    window.scrollTo(0, 0);
  }, [id]);


  // Update Image Submit Handler
  const formHandler = ( values) => {
   const formData = new FormData();
    formData.append("image", values["image"]);
      return dispatch(updatePostImage(formData, post?._id));
  };





  return (
    <section className="w-full h-full flex flex-col  ">
      <div className=" relative   flex xl:flex-row lg:flex-row md:flex-col sm:flex-col   h-auto mt-10 px-2  items-center ">
        <div className="box-border flex flex-row justify-center items-center p-6  xl:w-[704px] lg:w-[704] md:w-full sm:w-full xl:absolute lg:absolute  md:static sm:static lg:min-h-[50vh] h-auto rounded-lg xl:bg-[#f4f7f957] lg:bg-[#f4f7f957] sm:bg-[#d3e6f257] backdrop-blur-[15px] 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-5 sm:mb-5	">
<div className=" w-full  flex flex-col justify-between items-start">
<div className="w-full mb-4 truncate ...">
            <span className="font-semibold !text-sm  text-blue-black navLink !mr-1 !normal-case cursor-pointer pb-1">
              Home
            </span>
            <span className="text-light text-sm mr-1 text-blue-black">/</span>
            <span className="font-semibold !text-sm  text-blue-black navLink !mr-1 !normal-case cursor-pointer pb-1">{`${post?.category}`}</span>
            <span className="text-light text-sm mr-1 text-blue-black">/</span>
            <span className=" text-sm opacity-[.8] font-thin ">{`${post?.title}`}</span>
          </div>

          <Link to={`/posts/categories/${post?.category}`} className="mb-4">
            <span className=" inline-block w-auto   hover:bg-very-blue  transition-all duration-500 ease-in-out  hover:text-white bg-black text-white px-4 py-[7px] text-xs whitespace-normal">
              {" "}
              {post?.category}
            </span>
          </Link>

          <h3 className=" h-auto w-full text-clip	mb-4 ">
            <p
              className="w-full break-normal "
              href={`/posts/details/${post?._id}`}
            >
              <span className="break-words text-pretty text-blue-black font-bold text-lg ">
                {post?.title}
              </span>
            </p>
          </h3>

          <div className="info flex flex-row space-x-1 justify-start items-start italic flex-nowrap min-h-[48px] mb-4">
            <div className="author flex flex-row items-center">
              <div className="authorImage ">
                <img
                  src={post?.user?.profilePhoto?.url}
                  alt="author"
                  className="rounded-full w-12  h-12  object-cover "
                />
              </div>
            </div>
            <div className=" whitespace-nowrap">
              <div>
                <span className=" text-[13px] whitespace-nowrap mr-1 ">By</span>
                <Link
                  className="font-bold !text-[13px] whitespace-nowrap navLink0 pb-1"
                  to={profileLink}
                >
                  {post?.user.username}
                </Link>
              </div>
              <span className="text-[13px] mr-2 ">
                {new Date(post?.createdAt).toDateString()}
              </span>
              <span className="text-light text-sm mr-2 text-blue-black">/</span>
              <a  href='#comments' className="text-[13px]">{post?.comments?.length} comments</a>
            </div>
          </div>
</div>
        </div>

        <div className="  w-full h-[556px] grow flex flex-row justify-end items-center">
          <div className=" rounded-lg xl:w-[70%] lg:w-[70%] md:w-full sm:w-full h-full flex flex-col">
            <img
              src={img ? URL?.createObjectURL(img) : post?.image?.url}
              alt=""
              className="w-full h-full object-cover rounded-lg shadow-[0_0px_35px_#70798b38]"
            />

            {user?._id === post?.user?._id && (
              <div className="self-end">
                <Formik
                  onSubmit={formHandler}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {(formik) => {
                    return (
                      <Form
                        className="flex flex-row w-auto "
                        title="upload new photo"
                      >
                        <div>
                          <label
                            htmlFor="image"
                            className="text-center mt-2  cursor-pointer inline-block  mr-2 rounded-full bg-[#ffffff] "
                          >
                            {formik.isSubmitting? (
                              <i className="loading fa-solid fa-spinner  text-very-blue text-lg"></i>
                            ) : (
                              <i className=" fa-solid fa-camera text-very-blue text-lg"></i>
                            )}
                          </label>
                          <Field name="image">
                            {(field) => {
                              return (
                                <input
                                  style={{ display: "none" }}
                                  id="image"
                                  {...field}
                                  type="file"
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "image",
                                      e.currentTarget.files[0]
                                    );
                                    setImg(e.currentTarget.files[0]);


                                  }}
                                />
                              );
                            }}
                          </Field>

                          {/* <ErrorMessage name="image">
                            {(msg) => (
                              <p className="text-red-500 text-xs italic">
                                {msg}
                              </p>
                            )}
                          </ErrorMessage> */}
                        </div>

                        <button
                          disabled={!formik.isValid }
                          type="submit "
                          className=" text-very-blue text-sm font-normal mr-2 mt-2"
                        >
                   upload
                        </button>

                        {user?._id === post?.user?._id && (
  <div className="flex flex-row space-x-2 mt-2 cursor-pointer">
    <i
      onClick={() => setUpdatePost(true)}
      className="far fa-edit text-very-blue text-lg cursor-pointer" title="edit post">
      </i>
    {/* <i onClick={deletePostHandler} className="bi bi-trash-fill"></i> */}
  </div>
)}
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="xl:w-[70%] lg:w-[70%] md:w-full sm:w-full  self-center my-5 post-content">
<div
          className="post-content w-full p-6"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.description || ""),
          }}
        />

        <div className="px-6 mt-2 flex flex-row items-center flex-wrap gap-3">
          {user && (
            <button
              type="button"
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={`flex flex-row items-center gap-2 rounded-full px-5 py-2 border-[1px] text-sm transition-all duration-300 ${
                isLiked
                  ? "!bg-very-blue text-white border-very-blue"
                  : "!bg-[#f4f7ff] text-very-blue border-[#e7e9f3] hover:border-very-blue"
              }`}
            >
              <i className={isLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
              <span className="font-semibold">{post?.likes?.length} likes</span>
            </button>
          )}

          {user && post?.likes?.length > 0 && (
            <button
              type="button"
              onClick={showLikesList}
              className="text-sm text-faint-gray hover:text-very-blue transition-all duration-300"
            >
              View likes
            </button>
          )}

          <div className="relative ml-auto">
            <button
              type="button"
              onClick={() => shareList((prev) => !prev)}
              className="flex flex-row items-center gap-2 rounded-full px-5 py-2 border-[1px] text-sm !bg-[#f4f7ff] text-very-blue border-[#e7e9f3] hover:border-very-blue transition-all duration-300"
            >
              <i className="fa-solid fa-share"></i>
              <span className="font-semibold">Share</span>
            </button>

            {share && user && (
              <ul className="absolute right-0 top-11 z-10 w-[190px] bg-white rounded-xl py-3 shadow-[0_8px_30px_rgba(49,61,93,0.18)] border-[1px] border-[#e7e9f3] flex flex-col items-start">
                <li className="w-full px-4 py-2 hover:bg-[#f4f7ff] transition-all duration-200 cursor-pointer">
                  <FacebookShareButton
                    url={window.location.href}
                    className="whitespace-nowrap w-full text-blue-black text-start flex flex-row items-center gap-2"
                  >
                    <i className="fa-brands fa-facebook text-very-blue"></i> Share to Facebook
                  </FacebookShareButton>
                </li>
                <li className="w-full px-4 py-2 hover:bg-[#f4f7ff] transition-all duration-200 cursor-pointer">
                  <TwitterShareButton
                    url={window.location.href}
                    className="whitespace-nowrap w-full text-blue-black text-start flex flex-row items-center gap-2"
                  >
                    <i className="fa-brands fa-twitter text-very-blue"></i> Share to Twitter
                  </TwitterShareButton>
                </li>
              </ul>
            )}
          </div>
        </div>


        {likes && user && (
          <div className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full h-full flex flex-col items-center justify-center">
            <div
              onClick={() => showLikes(false)}
              className="w-full h-full absolute top-0 left-0 bg-transparent"
            ></div>

            <div className="relative w-[320px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6">
              <div className="w-full flex flex-row justify-between items-center border-b-[1px] border-[#e7e9f3] pb-3">
                <span className="inline-block text-very-blue text-sm font-semibold">
                  {post?.likes?.length} Likes
                </span>
                <i
                  title="Exit form"
                  className="box-border inline-block fa-solid fa-x text-sm cursor-pointer text-very-blue"
                  onClick={() => showLikes(false)}
                ></i>
              </div>
              <ul className="flex flex-col space-y-3 items-start mt-5 overflow-auto max-h-[50vh]">
                {post?.likes?.map((likedUser, index) => (
                  <li key={index} className="flex flex-row items-center space-x-2">
                    <img
                      src={likedUser.profilePhoto?.url}
                      alt="user"
                      className="inline-block rounded-full w-12 h-12 object-cover"
                    />
                    <Link to={`/profile/${likedUser._id}`}>{likedUser.username}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>



      <div className=" xl:w-[70%] lg:w-[70%] md:w-full sm:w-full self-center xl:px-6 lg:px-6 md:px-2 sm:px-2  ">
        {post?.comments?.length < 1 && (
        <h3 className="text-blue-black font-semibold">
          No Comments Yet! Be the first one.
        </h3>

        )}


        <h3 className="font-semibold text-blue-black">
          Leave a Reply

        </h3>

        <div className="mt-5">


        {user && <AddComment postId={post?._id}/>}

<div id="comments">
<CommentList comments={post?.comments} />

</div>
      {updatePost && (
        <div className="h-auto overflow-auto">
                  <UpdatePostModal updatePost={updatePost} post={post} setUpdatePost={setUpdatePost} />

        </div>
      )}

          {/* <Formik>
            {(formik) => { return (
              <>
              <Form>
                <Field type='text' name='name' placeholder='Name*' />
              </Form>
              </>
            ) }}

          </Formik> */}
        </div>
      </div>

      {/*


      <div className="post-details-icon-wrapper">

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
      )} */}
    </section>
  );
};

export default PostDetails;
