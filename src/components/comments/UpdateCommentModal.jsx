import "./UpdateCommentModal.css";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCalls";
import * as Yup from "yup";
import AppForm from "../form/AppForm";

const UpdateCommentModal = (props) => {
  const dispatch = useDispatch();

  const formSubmitHandler = (values) => {
    dispatch(
      updateComment(props.updatedComment?._id, { text: values["comment"] })
    );
    props.setUpdateComment(false);
  };

  const commentSchema = Yup.object().shape({
    comment: Yup.string().required("comment is required"),
  });

  const fields = [
    {
      name: "comment",
      label: "Comment",
      as: "textarea",
      rows: 5,
      placeholder: "comment",
      outerClassName: "w-full flex flex-col items-center space-y-5",
      rowClassName: "w-full h-full flex flex-col items-center space-y-5",
      labelClassName: "font-semibold text-blue-black",
      inputClassName:
        "w-full h-full text-normal  text-blue-black border-[1px] rounded-lg p-2 ",
    },
  ];

  return (
    <div className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7) w-full flex flex-col items-center justify-center xl:h-[60%] lg:h-[60%] md:h-full sm:h-full ">
      <div
        onClick={() => props.setUpdateComment(false)}
        className="w-full h-full absolute top-0 left-0 bg-transparent  "
      ></div>

      <div className={props.updateComment ? "modal" : "modalHidden"}>
        <i
          title="exit form"
          className="box-border fa-solid fa-x text-lg cursor-pointer absolute 2xl:right-4 xl:right-4 lg:right-4  md:m-auto sm:m-auto text-very-blue top-3"
          onClick={() => props.setUpdateComment(false)}
        ></i>

        <AppForm
          initialValues={{ comment: props.updatedComment?.text }}
          validationSchema={commentSchema}
          onSubmit={formSubmitHandler}
          fields={fields}
         enableReinitialize
          formClassName="flex flex-col items-start justify-evenly m-auto relative xl:w-[80%] lg:w-[80%] md:w-full sm:w-full space-y-5 p-5   "
          submitLabel="update Comment"
          submitClassName="text-white  box-border !bg-very-blue  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full px-3 py-2.5 text-sm"
        />
      </div>
    </div>
  );
};

export default UpdateCommentModal;
