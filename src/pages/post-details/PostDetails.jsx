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

import {
  DeletePost,
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

  const [miniList, showMiniList] = useState(false);

  const [share, shareList] = useState(false);


useEffect(()=>{
  initTE({ Popover, Ripple });

},[]);



  const showLikesList = ()=>{
    if (post && post.likes.length >0){
      showLikes((prev)=>!prev)
    }
  }


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
        <p className=" text-pretty w-full p-6  ">
          {post?.description}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          magna id malesuada placerat, quam metus rutrum nibh, a bibendum nulla
          augue vel dolor. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed auctor, magna id malesuada placerat, quam metus rutrum nibh,
          a bibendum nulla augue vel dolor. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor, magna id malesuada placerat,
          quam metus rutrum nibh, a bibendum nulla augue vel dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id
          malesuada placerat, quam metus rutrum nibh, a bibendum nulla augue vel
          dolor. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor, magna id malesuada placerat,
          quam metus rutrum nibh, a bibendum nulla augue vel dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id
          malesuada placerat, quam metus rutrum nibh, a bibendum nulla augue vel
          dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor, magna id malesuada placerat, quam metus rutrum nibh, a
          bibendum nulla augue vel dolor. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor, magna id malesuada placerat,
          quam metus rutrum nibh, a bibendum nulla augue vel dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id
          malesuada placerat, quam metus rutrum nibh, a bibendum nulla augue vel
          dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor, magna id malesuada placerat, quam metus rutrum nibh, a
          bibendum nulla augue vel dolor. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor, magna id malesuada placerat,
          quam metus rutrum nibh, a bibendum nulla augue vel dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id
          malesuada placerat, quam metus rutrum nibh, a bibendum nulla augue vel
          dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor, magna id malesuada placerat, quam metus rutrum nibh, a
          bibendum nulla augue vel dolor. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor, magna id malesuada placerat,
          quam metus rutrum nibh, a bibendum nulla augue vel dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id
          malesuada placerat, quam metus rutrum nibh, a bibendum nulla augue vel
          dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor, magna id malesuada placerat, quam metus rutrum nibh, a
          bibendum nulla augue vel dolor. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed auctor, magna id malesuada placerat,
          quam metus rutrum nibh, a bibendum nulla augue vel dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id
          malesuada placerat, quam metus rutrum nibh, a bibendum nulla augue vel
          dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          auctor, magna id malesuada placerat, quam metus rutrum nibh, a
          bibendum nulla augue vel dolor. consectetur adipiscing elit. Sed
          auctor, magna id malesuada placerat, quam metus rutrum nibh, a
          bibendum nulla augue vel dolor.
        </p>

        <div className="px-6 flex ">
          {user && (
            <>
                        <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.some(userI => userI._id === user._id)
                  ? "fa-solid fa-thumbs-up cursor-pointer text-very-blue"
                  : "fa-regular fa-thumbs-up cursor-pointer text-very-blue"
              }
            ></i>
</>

          )}
          <small className="ml-1 text-very-blue cursor-pointer relative"  onMouseEnter={()=>showMiniList(true)} onMouseLeave={()=>showMiniList(false)} onClick={showLikesList}>{post?.likes.length} likes



          {
  (miniList && user) ?
  <div className="absolute -top-10 z-10 rounded p-3 right-0 bg-[#000000d9] h- auto w-auto flex flex-col space-y-2 text-[#f4f4f4] ">
 {
  post.likes.map((user, index)=>{

    return(<span key={index} className="text-xs whitespace-nowrap">
      {
        user.username? ( <span>{user.username} </span>) : <span> 'User Not Found' </span>
      }

    </span>)
  })
 }

</div> : ''
}
          </small>


          <div className="w-auto relative ml-3 flex flex-row space-x-1 items-center justify-center"
          onClick={()=>shareList(prev=> !prev)}>
            <i class="fa-solid fa-share text-very-blue"></i> <small className=" text-very-blue cursor-pointer">share</small>



            { share && user ? (

<ul className="activeDrop !w-[200px] !top-5 !z-10  !rounded !py-4 !left-0  !h-auto !items-start !space-y-0 ">
                  <li
                    className="linkWrapper pointer-events-auto text-start">
            <FacebookShareButton url={window.location.href} className="whitespace-nowrap w-full text-blue-black text-start">
            <i class="fa-brands fa-facebook text-very-blue"></i> share to facebook
          </FacebookShareButton>
                  </li>


                  <li
                    className="linkWrapper pointer-events-auto ">
       <TwitterShareButton url={window.location.href} className="whitespace-nowrap w-full text-blue-black text-start">
       <i class="fa-brands fa-twitter text-very-blue"></i> Share to Twitter
      </TwitterShareButton>
                  </li>
                      {/* <span  className="text-xs whitespace-nowrap">

    <TwitterShareButton url='https://banish.com/blogs/article/8-reasons-why-you-may-relapse-after-accutane'>
        Share to Twitter
      </TwitterShareButton>

</span> */}


            </ul>








):''



}
            </div>


          {/* <FacebookShareButton url='https://banish.com/blogs/article/8-reasons-why-you-may-relapse-after-accutane'>
          </FacebookShareButton>



          */}



          { likes && user ? (


<>


<div   className="z-20  fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full min-h-screen flex flex-col items-center justify-center xl:h-[60%] lg:h-[60%] md:h-full sm:h-full ">
                  <div onClick={()=>showLikes(false)}  className="w-full h-full absolute top-0 left-0 bg-transparent  ">
                  </div>

                   <div className={likes
                    ? 'modal !w-[50vh] !min-h-[60vh] md:!h-auto sm:!h-auto sm:!rounded-lg ': 'modalHidden'}>

                  <div className="w-full flex flex-row justify-between items-center border-b-[1px] pb-3 ">

                    <span className="inline-block text-very-blue text-sm">
                  {    post?.likes.length
                  } Likes </span>
                       <i
                     title="exit form"
                       className="box-border inline-block fa-solid fa-x text-sm cursor-pointer    text-very-blue"
                       onClick={() => showLikes(false)}
                     ></i>

                  </div>
                  <ul className="flex flex-col justify-between space-y-3 items-start mt-7 min-w-max overflow-auto">
                    {post.likes.map((user, index) => (
                       <li key={index} className="flex flex-row items-center space-x-2 ">

<img src={user.profilePhoto?.url} alt="user" className="inline-block rounded-full w-12 h-12  object-cover "  />

                                                <Link to={`/Profile/${user._id}`}>
                                                {user.username}
                                                </Link>
                    </li>
                    ))}


                    </ul>



                   </div>
                   </div>


</>


):''



}

        </div>
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
