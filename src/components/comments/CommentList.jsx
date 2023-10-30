import { useState } from "react";
import "./CommentList.css";
import Moment from "react-moment";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCalls";

const CommentList = ({comments}) => {
  console.log(comments)
  const [updateComment, setUpdateComment] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(null);

  const dispatch = useDispatch();

  const updateCommentHandler=(comment)=>{
    setUpdatedComment(comment);
    setUpdateComment(true)
    }


  const {user} = useSelector(state=>state.auth);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
       dispatch(deleteComment(commentId));
       
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (

        <div key={comment?._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-user-info">
              {/* <img
                src=
                alt=""
                className="comment-item-user-photo"
              /> */}
              <span className="comment-item-username">{comment?.userName}</span>
            </div>
            <div className="comment-item-time">
              <Moment fromNow ago>
            {comment?.createdAt}
            </Moment>{" "}
            ago
            </div>
          </div>
          <p className="comment-item-text">{comment?.text}</p>
{comment?.user === user?._id &&(
            <div className="comment-item-icon-wrapper">
            <i
              onClick={()=>updateCommentHandler(comment)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={()=> deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
          </div>
)}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal updatedComment={updatedComment} setUpdateComment={setUpdateComment} />
      )}
    </div>
  );
};

export default CommentList;
