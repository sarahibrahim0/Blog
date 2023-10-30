import "./UpdateCommentModal.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCalls";

const UpdateCommentModal = ({ setUpdateComment, updatedComment }) => {

  const [text, setText] = useState(updatedComment?.text);
  const dispatch = useDispatch()
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
if(text.trim()==="") return toast.error("please write something");
dispatch(updateComment(updatedComment?._id, {text}));
setUpdateComment(false);

  };


  return (
    <div className="update-comment">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="update-comment-input"
          placeholder="Update Comment"
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;

