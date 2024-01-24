import "./UpdatePostModal.css";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import { Modal, initTE } from "tw-elements";
import { Formik, Form, Field, ErrorMessage } from "formik";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  DeletePost,
  deletePost,
  fetchPostById,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCalls";

const UpdatePostModal = (props) => {
  // const [title, setTitle] = useState(props.post.title);
  // const [description, setDescription] = useState(props.post.description);
  // const [category, setCategory] = useState(props.post.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);

  // From Submit Handler
  const formSubmitHandler = (values) => {
    dispatch(
      updatePost(
        {
          title: values["title"],
          description: values["description"],
          category: values["category"],
        },
        props.post?._id
      )
    );
    props.setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    initTE({ Modal });
  }, []);

  const postSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
  });

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("image is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 1024 * 1024 * 5;
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
    title: props.post.title,
    category: props.post.category,
    description: props.post.description,
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      background: "#fff",
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(props.post?.id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    // <div className="update-post">
    //   <ToastContainer theme="colored" />
    //   <form onSubmit={formSubmitHandler} className="update-post-form">
    //     <abbr title="close">
    //       <i
    //         onClick={() => setUpdatePost(false)}
    //         className="bi bi-x-circle-fill update-post-form-close"
    //       ></i>
    //     </abbr>
    //     <h1 className="update-post-title">Update Post</h1>
    //     <input
    //       onChange={(e) => setTitle(e.target.value)}
    //       value={title}
    //       type="text"
    //       className="update-post-input"
    //     />
    //     <select
    //       className="update-post-input"
    //       value={category}
    //       onChange={(e) => setCategory(e.target.value)}
    //     >
    //       <option disabled value="">
    //         Select A Category
    //       </option>
    //       {
    //    categories?.map(category=> <option key={category?._id} value={category?.title}>{category?.title}</option>)
    //       }

    //     </select>
    //     <textarea
    //       className="update-post-textarea"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       rows="5"
    //     ></textarea>
    //     <button type="submit" className="update-post-btn">
    //       Update Post
    //     </button>
    //   </form>
    // </div>
    <div className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] h-full w-full flex flex-col items-center justify-center ">
      <div
        onClick={() => props.setUpdatePost(false)}
        className="w-full h-full absolute top-0 left-0 bg-transparent "
      ></div>

      <div className={props.updatePost ? "modal" : "modalHidden"}>
        <i
          title="exit form"
          class="box-border fa-solid fa-x text-lg cursor-pointer absolute 2xl:right-4 xl:right-4 lg:right-4  md:m-auto sm:m-auto text-very-blue top-3"
          onClick={() => props.setUpdatePost(false)}
        ></i>
        <Formik
          onSubmit={formSubmitHandler}
          validationSchema={postSchema}
          initialValues={initialValues}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="flex flex-col items-start justify-evenly m-auto relative w-[80%] space-y-5 p-5  h-auto ">
                <div className="w-full flex flex-col space-y-1 items-center  ">
                  <div className="w-full flex flex-row  items-center space-x-3 ">
                    <label
                      htmlFor="title"
                      className="font-semibold text-blue-black"
                    >
                      title
                    </label>
                    <Field
                      name="title"
                      id="title"
                      placeholder="title"
                      className="w-full  text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2"
                    ></Field>
                  </div>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                  <div className="w-full flex flex-row  items-center space-x-3 ">
                    <label
                      htmlFor="category"
                      className="font-semibold text-blue-black"
                    >
                      category
                    </label>
                    <Field
                      className="w-full text-normal p-2  leading-tight text-blue-black border-[1px] rounded-lg "
                      as="select"
                      type="text"
                      id="category"
                      name="category"
                    >
                      {categories?.map((option) => {
                        return (
                          <option key={option?._id} value={option?.title}>
                            {option?.title}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                  <div className="w-full flex flex-row  items-center space-x-3 ">
                    <label
                      htmlFor="description"
                      className="font-semibold text-blue-black"
                    >
                      description
                    </label>
                    <Field
                      className="w-full text-normal p-2    leading-tight text-blue-black border-[1px] rounded-lg "
                      as="textarea"
                      id="description"
                      name="description"
                      rows="5"
                      placeholder="post description"
                    />
                  </div>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div className="flex flex-row justify-between w-full items-center  ">
                  <button
                    type="submit"
                    className="text-white  box-border !bg-very-blue  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full px-3 py-2.5 text-sm"
                  >
                    update Post
                  </button>

                  <button
                    className="delete"
                    type="button"
                    href=""
                    data-title="Delete Post"
                    onClick={deletePostHandler}
                  >
                    <i class="bi bi-trash-fill text-xl inline-block text-very-blue"></i>
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePostModal;
