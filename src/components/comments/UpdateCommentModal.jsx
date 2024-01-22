import "./UpdateCommentModal.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCalls";
import{Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const UpdateCommentModal = (props) => {

  const dispatch = useDispatch()
  // From Submit Handler
  const formSubmitHandler = (values) => {

  dispatch(updateComment(props.updatedComment?._id,{text: values['comment']}));
    props.setUpdateComment(false);

  };


  const commentSchema = Yup.object().shape({
    comment: Yup.string()
      .required('comment is required')
  });


  const initialValues = {
    comment: props.updatedComment?.text,

  };


  return (

<div   className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7) w-full flex flex-col items-center justify-center xl:h-[60%] lg:h-[60%] md:h-full sm:h-full ">
<div onClick={()=>props.setUpdateComment(false)}  className="w-full h-full absolute top-0 left-0 bg-transparent  ">
</div>

 <div className={props.updateComment
  ? 'modal': 'modalHidden'}>
   <i
   title="exit form"
     class="box-border fa-solid fa-x text-lg cursor-pointer absolute 2xl:right-4 xl:right-4 lg:right-4  md:m-auto sm:m-auto text-very-blue top-3"
     onClick={() => props.setUpdateComment(false)}
   ></i>
   <Formik
     onSubmit={formSubmitHandler}
     validationSchema={commentSchema}
     initialValues={initialValues}
     enableReinitialize
   >
     {(formik) => {
       return (
         <Form className="flex flex-col items-start justify-evenly m-auto relative xl:w-[80%] lg:w-[80%] md:w-full sm:w-full space-y-5 p-5   ">
           <div className="w-full flex flex-col space-y-1 items-center  ">
           <div className="w-full h-full flex flex-col  items-center space-y-5 ">

             <label htmlFor="comment" className="font-semibold text-blue-black">Comment</label>
             <Field
             as='textarea'
               name="comment"
               id="comment"
               placeholder="comment"
               rows="5"
               className='w-full h-full text-normal  text-blue-black border-[1px] rounded-lg p-2 '
             ></Field>
             </div>
             <ErrorMessage name="comment" component="div" className="text-red-500 text-xs italic" />
           </div>





           <div className="flex flex-row justify-between w-full items-center mt-5 ">

           <button type="submit"  className=  "text-white  box-border !bg-very-blue  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full px-3 py-2.5 text-sm" >
   update Comment

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

export default UpdateCommentModal;

