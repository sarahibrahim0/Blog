import { useState } from "react";
import "./Admin.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/apiCalls/categoryApiCalls";
import { Field, Formik, Form , ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RotatingLines } from "react-loader-spinner";


const AddCategoryForm = () => {

  const dispatch = useDispatch();
  const formSubmitHandler = (values) => {
   return dispatch(setCategory({title : values['title']}))
  };

  const initialValues = {
    title: ""
  }

  const schema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title is too short - should be 2 chars minimum.')
      .max(50, 'Title is too long - should be 50 chars maximum.')
  });

  return (

    <div className="relative rounded-lg p-5 bg-[#dee3ff92] mt-10 text-center overflow-hidden " >

<div style={{"backgroundPosition":"10px 10px"}} className="z-0 absolute inset-0 bg-grid-slate-100  "></div>

      <h6 className="relative z-10 text-lg font-semibold mb-5 leading-tight text-blue-black">Add New Category</h6>

<Formik onSubmit={formSubmitHandler} initialValues={initialValues} validationSchema={schema}>
  {(formik)=>{
    return (
<Form  className="add-category-form  ">
        <div className="add-category-form-group ">
          <Field
          name="title"
            type="text"
            placeholder='Enter Category Title'
            className="!text-lg z-10"
          />
        </div>

        <ErrorMessage name="title" component="div" className="relative z-10  text-red-500 text-xs italic"/>
        <button disabled={formik.isSubmitting}  type='submit' className="relative z-10 !bg-gradient-to-r from-sky-500 to-indigo-500 my-5 text-white min-h-[41.6px] box-border  hover:!bg-custom-color  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2" >
    {formik.isSubmitting? (
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                  ):  <span className="text-inherit text-sm inline-block mr-1  ">
       Add Category
               </span>}
    </button>
      </Form>
    )
  }}

</Formik>

    </div>
  );
};

export default AddCategoryForm;
