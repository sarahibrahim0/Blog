import { useEffect } from "react";
import { Field } from "formik";
import * as Yup from "yup";
import "./CreatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCalls";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCalls";
import AppForm from "../../components/form/AppForm";
import FormField from "../../components/form/FormField";
import RichTextEditor from "../../components/form/RichTextEditor";
import { isRichTextEmpty } from "../../utils/stripHtml";

const CreatePost = () => {
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const initialValues = {
    image: null,
    title: "",
    category: "",
    description: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("image is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 7000000;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jfif",
          ].includes(value.type)
        );
      }),
    title: Yup.string().required("Post title is required"),
    category: Yup.string().required("Post category is required"),
    description: Yup.string()
      .required("Post description is required")
      .test(
        "not-empty",
        "Post description is required",
        (value) => !isRichTextEmpty(value)
      ),
  });

  const onSubmit = async (values) => {
    const postFormData = new FormData();

    for (let value in values) {
      postFormData.append(value, values[value]);
    }

    dispatch(createPost(postFormData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const fields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Enter a compelling title",
      layout: "stacked",
      labelClassName: "create-post-label",
      outerClassName: "create-post-group",
      rowClassName: "create-post-row",
      inputClassName: "create-post-input",
    },
    {
      name: "category",
      label: "Category",
      as: "select",
      placeholder: "Select a category",
      options: (categories || []).map((option) => ({
        value: option?.title,
        label: option?.title,
      })),
      layout: "stacked",
      labelClassName: "create-post-label",
      outerClassName: "create-post-group",
      rowClassName: "create-post-row",
      inputClassName: "create-post-input",
    },
  ];

  return (
    <section className="create-post-page">
      <div className="create-post-shell">
        <header className="create-post-header">
          <span className="create-post-eyebrow">New story</span>
          <h1 className="create-post-heading">Create Post</h1>
          <p className="create-post-sub">
            Craft your article, add a cover image, and share it with the world.
          </p>
        </header>

        <div className="create-post-card">
          <AppForm
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
            fields={fields}
            formClassName="create-post-form"
            submitLabel="Publish Post"
            loading={loading}
            submitClassName="create-post-submit"
          >
            {(formik) => (
              <>
                <FormField
                  name="description"
                  label="Description"
                  labelClassName="create-post-label"
                  outerClassName="create-post-group"
                  rowClassName="create-post-row"
                >
                  <RichTextEditor
                    value={formik.values.description}
                    onChange={(html) =>
                      formik.setFieldValue("description", html, true)
                    }
                    error={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </FormField>

                <FormField
                  name="image"
                  label="Cover image"
                  labelClassName="create-post-label"
                  outerClassName="create-post-group"
                  rowClassName="create-post-row"
                >
                  <Field name="image">
                    {(field) => (
                      <label className="create-post-upload">
                        <input
                          id="image"
                          {...field}
                          value={undefined}
                          type="file"
                          className="create-post-file"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "image",
                              e.currentTarget.files[0]
                            );
                          }}
                        />
                        <i className="bi bi-cloud-arrow-up create-post-upload-icon"></i>
                        <span className="create-post-upload-text">
                          {formik.values.image?.name ||
                            "Click to upload an image"}
                        </span>
                        <span className="create-post-upload-hint">
                          JPG, PNG or GIF · up to 7MB
                        </span>
                      </label>
                    )}
                  </Field>
                </FormField>
              </>
            )}
          </AppForm>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
