import "./UpdateCommentModal.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const UpdateCommentModal = ({ setUpdateComment }) => {
  const [text, setText] = useState("this is so great");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
if(text.trim()==="") return toast.error("please write something");
    console.log({text});
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

