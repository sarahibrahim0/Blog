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
    title: "",
    category: "",
    description: "",
    image: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required(" required"),
    description: Yup.string().required(" required"),
    category: Yup.string().required(" required"),
    image: Yup.string().nullable().required(" required"),
  });
  const onSubmit = async (values) => {
    // console.log(values)
    const postFormData = new FormData();

    for (let value in values) {
      postFormData.append(value, values[value]);
    }

    //   for (let pair of postFormData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }

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
    <section>
      <div className="section create-post">
        <h1 className="create-post-title">Create New Post</h1>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          {(formik) => {
            console.log(formik, "formik");
            return (
              <Form>
                <div>
                  <label htmlFor="title">title</label>
                  <Field
                    placeholder="post title"
                    className="create-post-input"
                    type="text"
                    id="title"
                    name="title"
                  />
                  {<ErrorMessage name="category" />}
                </div>

                <div>
                  <label htmlFor="category">category</label>
                  <Field
                    className="create-post-input"
                    as="select"
                    type="text"
                    id="category"
                    name="category"
                  >
                    {categories?.map(option=> {
                      return (
                        <option key={option?._id} value={option?.title}>
                          {option?.title}
                        </option>
                      );
                    })}
                  </Field>
                  {<ErrorMessage name="category" />}
                </div>

                <div>
                  <label htmlFor="description">description</label>
                  <Field
                    className="create-post-textarea"
                    as="textarea"
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="post description"
                  />

                  <ErrorMessage name="description" />
                </div>

                <div>
                  <label htmlFor="image">image</label>
                  <Field
                    className="create-post-upload"
                    name="image"
                  >
                    {(field)=>{
                              console.log(field, 'field')
                              return(
                                <input className="create-post-upload" {...field} type="file" onChange={(e)=>formik.setFieldValue('image',e.currentTarget.files[0])}/>
                              )
                            }}
                  </Field>

                  <ErrorMessage name="file" />
                </div>

                <button
                  type="submit"
                  className="create-post-btn"
                  disabled={!formik.isValid}
                >
                  {loading? (
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                  />
                  ): "Create"}
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
