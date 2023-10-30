
import './AddComment.css';
import {toast} from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setComment } from '../../redux/apiCalls/commentApiCalls';
const AddComment = ({postId}) =>{

    const [text, setText] = useState("");
    const dispatch = useDispatch();


     // Form Submit Handler
     const formSubmitHandler = (e) => {
       e.preventDefault();
       if(text.trim() === "") return toast.error("Please write something")

       dispatch(setComment({text , postId }))
       setText("");
     }

     return (
       <form onSubmit={formSubmitHandler} className="add-comment">
         <input
           type="text"
           placeholder="Add a comment"
           className="add-comment-input"
           value={text}
           onChange={e => setText(e.target.value)}
         />
         <button type="submit" className="add-comment-btn">
           Comment
         </button>
       </form>
     );
   };

export default AddComment;