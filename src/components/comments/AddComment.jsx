
import './AddComment.css';
import {toast} from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setComment } from '../../redux/apiCalls/commentApiCalls';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const AddComment = ({postId}) =>{

    const dispatch = useDispatch();


     // Form Submit Handler
     const formSubmitHandler = (values) => {
      const newComment = {text: values['comment'], postId : postId}
       return dispatch(setComment(newComment));
     }

     const initialValues = {
     comment: ''
     }

     const validationSchema = Yup.object().shape({
      comment : Yup.string()
      .min(2, 'Comment must be at least 2 characters long')

     })
     return (
       <Formik onSubmit={formSubmitHandler} initialValues={initialValues} validationSchema={validationSchema} >
       {(formik)=>{
        return(
          <Form className=' flex flex-col items-start  j'>



             <div className='w-full h-auto'>
             <Field className="w-full  text-sm opacity-[.8]  p-5 font-extralight text-blue-black border-[1px] rounded-lg "
                    as="textarea"
                    id="comment"
                    name="comment"
                    rows="9"
                    placeholder="Comment"
                  />

<ErrorMessage name="comment" component="div" className="text-red-500 text-xs italic" />

             </div>



         <button disabled={formik.isSubmitting} type='submit' className="my-5 text-white min-h-[41.6px] box-border !bg-[#4776E6]  hover:!bg-blue-black  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2" >
    <span className="text-inherit text-sm inline-block mr-1">
        Post Comment
    </span>

</button>
          </Form>
        )
       }}
       </Formik>
     );
   };

export default AddComment;