import "./UpdatePostModal.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../../redux/apiCalls/postApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";
import FormField from "../../components/form/FormField";
import RichTextEditor from "../../components/form/RichTextEditor";
import { isRichTextEmpty } from "../../utils/stripHtml";

const UpdatePostModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);

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
  }, []);

  const postSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string()
      .required("Description is required")
      .test(
        "not-empty",
        "Description is required",
        (value) => !isRichTextEmpty(value)
      ),
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

  const inlineField = {
    layout: "inline",
    outerClassName: "w-full flex flex-col space-y-1 items-center",
    rowClassName: "w-full flex flex-row items-center space-x-3",
    labelClassName: "font-semibold text-blue-black",
  };

  const fields = [
    {
      ...inlineField,
      name: "title",
      label: "title",
      placeholder: "title",
      inputClassName:
        "w-full  text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2",
    },
    {
      ...inlineField,
      name: "category",
      label: "category",
      as: "select",
      options: (categories || []).map((option) => ({
        value: option?.title,
        label: option?.title,
      })),
      inputClassName:
        "w-full text-normal p-2  leading-tight text-blue-black border-[1px] rounded-lg ",
    },
  ];

  return (
    <div className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] h-full w-full flex flex-col items-center justify-center ">
      <div
        onClick={() => props.setUpdatePost(false)}
        className="w-full h-full absolute top-0 left-0 bg-transparent "
      ></div>

      <div className={props.updatePost ? "modal" : "modalHidden"}>
        <i
          title="exit form"
          className="box-border fa-solid fa-x text-lg cursor-pointer absolute 2xl:right-4 xl:right-4 lg:right-4  md:m-auto sm:m-auto text-very-blue top-3"
          onClick={() => props.setUpdatePost(false)}
        ></i>

        <AppForm
          onSubmit={formSubmitHandler}
          validationSchema={postSchema}
          initialValues={initialValues}
          enableReinitialize
          fields={fields}
          showSubmit={false}
          formClassName="flex flex-col items-start justify-evenly m-auto relative w-[80%] space-y-5 p-5  h-auto "
          renderActions={() => (
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
                data-title="Delete Post"
                onClick={deletePostHandler}
              >
                <i className="bi bi-trash-fill text-xl inline-block text-very-blue"></i>
              </button>
            </div>
          )}
        >
          {(formik) => (
            <FormField
              name="description"
              label="description"
              labelClassName="font-semibold text-blue-black mb-1"
              outerClassName="w-full flex flex-col items-start"
              rowClassName="w-full flex flex-col items-start"
            >
              <RichTextEditor
                value={formik.values.description}
                onChange={(html) =>
                  formik.setFieldValue("description", html, true)
                }
                error={formik.touched.description && formik.errors.description}
              />
            </FormField>
          )}
        </AppForm>
      </div>
    </div>
  );
};

export default UpdatePostModal;
