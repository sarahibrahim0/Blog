import "./AddComment.css";
import { useDispatch } from "react-redux";
import { setComment } from "../../redux/apiCalls/commentApiCalls";
import * as Yup from "yup";
import AppForm from "../form/AppForm";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  const formSubmitHandler = (values) => {
    const newComment = { text: values["comment"], postId: postId };
    return dispatch(setComment(newComment));
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string().min(2, "Comment must be at least 2 characters long"),
  });

  const fields = [
    {
      name: "comment",
      as: "textarea",
      rows: 9,
      placeholder: "Comment",
      outerClassName: "w-full h-auto",
      inputClassName:
        "w-full  text-sm opacity-[.8]  p-5 font-extralight text-blue-black border-[1px] rounded-lg ",
    },
  ];

  return (
    <AppForm
      initialValues={{ comment: "" }}
      validationSchema={validationSchema}
      onSubmit={formSubmitHandler}
      fields={fields}
      formClassName=" flex flex-col items-start  j"
      submitLabel="Post Comment"
      submitClassName="my-5 text-white min-h-[41.6px] box-border !bg-[#4776E6]  hover:!bg-blue-black  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"
    />
  );
};

export default AddComment;
