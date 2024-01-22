import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreatePost.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCalls";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
const CreatePost = (props) => {
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const {categories} = useSelector(state=>state.category)


  const initialValues = {
    image: null,
    title: "",
    category: "",
    description: "",
};

useEffect(()=>{
  window.scrollTo(0, 0);

},[])

  const validationSchema= Yup.object().shape({
    image: Yup.mixed()
    .required("image is required")
      .test('fileSize', 'File size is too large', (value) => {
        return value && value.size <= 7000000;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        return (
          value &&
          ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/jfif'].includes(
            value.type
          )
        );
      }),
    title: Yup.string()
      .required('Post title is required'),
    category: Yup.string()
      .required('Post category is required'),
    description: Yup.string()
      .required('Post description is required'),

  });
  const onSubmit = async (values) => {
    // console.log(values)
    const postFormData = new FormData();

    for (let value in values) {
      postFormData.append(value, values[value]);
    }

    dispatch(createPost(postFormData));
  };

  const navigate = useNavigate();
  useEffect(()=>{
    if(isPostCreated){
      navigate("/");
    }
  },[isPostCreated, navigate]);
  useEffect(()=>{
    dispatch(fetchCategories())
  },[])

  return (
    <section className="box-border min-h-[80vh] 2xl:h-screen xl:h-screen lg:h-screen  md:h-[85vh] sm:h-[85vh] w-full flex flex-col items-center 2xl:px-5 xl:px-5 lg:px-5 md:px-2  sm:px-2">

<span className="inline-block text-blue-black leading-tight text-2xl mt-10 font-semibold">Create Post</span>
        <div className="relative box-border bg-[#dee3ff92]  2xl:w-[80%] xl:w-[80%] lg:w-[80%] md:w-full sm:w-full lg:px-0 md:px-2 sm:px-2 2xl:h-[70%] xl:h-[70%]  lg:h-[70%] md:h-full sm:h-full  flex flex-col items-center rounded-xl border-[1px] mt-10  ">

        <div style={{"backgroundPosition":"10px 10px"}} className="z-0 absolute inset-0 bg-grid-slate-100  "></div>


<Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          {(formik) => {
            return (
              <Form  className="flex flex-col   space-y-1 items-start justify-evenly py-4 relative 2xl:w-[80%] xl:w-[80%] lg:w-[80%] md:w-full sm:w-full h-full "
              >
                <div className="w-full flex flex-col space-y-1 items-center ">
                <div className="w-full flex flex-row   justify-center items-center space-x-3 ">
                  <label htmlFor="title" className="font-semibold text-blue-black">title</label>
                  <Field
                    placeholder="post title"
                    className="w-full p-2 h-[37.6px]  text-normal leading-tight text-blue-black border-[1px] rounded-lg '"
                    type="text"
                    id="title"
                    name="title"
                  />
                  </div>

                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs italic" />
                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                <div className="w-full flex flex-row justify-center  items-center space-x-3 ">
                  <label htmlFor="category" className="font-semibold text-blue-black">category</label>
                  <Field
                    className="w-full text-normal p-2  leading-tight text-blue-black border-[1px] rounded-lg "
                    as="select"
                    id="category"
                    name="category"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories?.map(option=> {
                      return (
                        <option key={option?._id} value={option?.title}>
                          {option?.title}
                        </option>
                      );
                    })}
                  </Field>
                  </div>

                  <ErrorMessage name="category" component="div" className="text-red-500 text-xs italic"/>
                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                <div className="w-full  flex flex-row  items-center space-x-3 ">
<label htmlFor="description" className="font-semibold text-blue-black">description</label>
                  <Field className="w-full text-normal p-2  leading-tight text-blue-black border-[1px] rounded-lg "
                    as="textarea"
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="post description"
                  />
</div>

                  <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic" />
                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                <div className="w-full flex flex-row  items-center space-x-3 ">
                  <label htmlFor="image" className="font-semibold text-blue-black">image</label>
                  <Field
                    name="image"

                  >
                    {(field)=>{
                              return(
                                <input
                                id="image"
                                 {...field} type="file" onChange={(e)=>{
                                  formik.setFieldValue('image',e.currentTarget.files[0]);
                                  }}
                                />
                              )
                            }}
                  </Field>
                  </div>
               <ErrorMessage name="image" >
                {(msg)=>{
                  return(
                    <p className="text-red-500 text-xs italic" >
                      {msg}
                    </p>
                  )
                }}
               </ErrorMessage>
      </div>

      <button disabled={formik.isSubmitting}  type='submit' className="  relative self-center z-10 !bg-gradient-to-r from-sky-500 to-indigo-500 my-5 text-white min-h-[41.6px] box-border  hover:!bg-custom-color  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"
                  // disabled={!formik.isValid}
                >
                  {loading? (
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                  ):  <span className="text-inherit text-sm inline-block mr-1  ">
                  Create Post
               </span>}
                </button>


              </Form>
            );
          }}
        </Formik>
</div>




    </section>
  );
};

export default CreatePost;
