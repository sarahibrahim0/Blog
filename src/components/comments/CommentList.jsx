import { useState } from "react";
import "./CommentList.css";
import Moment from "react-moment";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import {  useSelector } from "react-redux/es/hooks/useSelector";
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
    <div href="#comments" className="w-full h-auto">
     <h3 className="font-semibold text-blue-black">

        {comments?.length} Comments</h3>
      {comments?.map((comment) => (

        <div  key={comment?._id} className=" box-border w-full h-auto p-3 border-[1px] rounded-lg my-5 flex flex-col ">
          <div className="flex flex-row justify-between items-start ">
            <div className="flex flex-row space-x-2">
              <div className="authorImage ">
                <img
                  src={comment?.user?.profilePhoto?.url}
                  alt="author"
                  className="rounded-full w-12  h-12  object-cover "
                />
            </div>
             <span className="inline-block self-center font-semibold">{comment?.userName}</span>
            </div>
            <div className="self-center">
              <Moment fromNow ago>
            {comment?.createdAt}
            </Moment>{" "}
            ago
            </div>
          </div>
          <p className="my-4 font-light  text-pretty  ">{comment?.text}</p>
{comment?.user?._id === user?._id &&(
            <div className="flex flex-row space-x-2 justify-end items-start ">
            <i
              onClick={()=>updateCommentHandler(comment)}
              className="far fa-edit text-very-blue text-2xs cursor-pointer" title="edit comment"
            ></i>
            <i title="delete comment" onClick={()=> deleteCommentHandler(comment?._id)} className="cursor-pointer   fa-regular fa-trash-can text-2xs  text-very-blue"></i>

          </div>
)}
        </div>
      ))}


      {updateComment && (
        <div className=" overflow-auto">
        <UpdateCommentModal updatedComment={updatedComment} setUpdateComment={setUpdateComment} updateComment={updateComment} />

        </div>
      )}
    </div>
  );
};

export default CommentList;
