import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CreatePost.css";
import { ToastContainer, toast } from 'react-toastify';


const CreatePost = (props) => {
  const options = [
    { key: "select an option", value: "" },
    { key: "option 1", value: "option 1" },
    { key: "option 2", value: "option 2" },
    { key: "option 3", value: "option 3" },
  ];

  const initialValues = {
    title: "",
    category: "",
    description: "",
    image: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required(' required'),
    description: Yup.string().required(' required'),
    category: Yup.string().required(' required'),
    image: Yup.string().nullable().required(' required'),
  });
  const onSubmit = (values) => {
   toast.success('post created successfully')
  };

  return (
    <section>
      <div className="section create-post">
        <h1 className="create-post-title">Create New Post</h1>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          {formik => {
            console.log(formik, 'formik');
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
                            {options.map((option) => {
                              return (
                                <option
                                  key={option?.value}
                                  value={option?.value}
                                >
                                  {option.key}
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
                            type="file"
                            id="image"
                            name="image"
                          />
                          <ErrorMessage name="image" />
                        </div>


                <button
                  type="submit"
                  className="create-post-btn"
                  disabled={!formik.isValid}
                >
                  {" "}
                  Create
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
