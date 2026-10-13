import "./Admin.css";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/apiCalls/categoryApiCalls";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";

const AddCategoryForm = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = (values) => {
    return dispatch(setCategory({ title: values["title"] }));
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title is too short - should be 2 chars minimum.")
      .max(50, "Title is too long - should be 50 chars maximum."),
  });

  const fields = [
    {
      name: "title",
      label: "Category name",
      placeholder: "Enter category title",
      labelClassName: "admin-category-label",
      outerClassName: "admin-category-group",
      rowClassName: "admin-category-row",
      inputClassName: "admin-category-input",
    },
  ];

  return (
    <div className="admin-panel admin-category-card">
      <h6 className="admin-category-title">Add New Category</h6>
      <p className="admin-category-sub">
        Create a new category to keep your posts organized.
      </p>

      <AppForm
        initialValues={{ title: "" }}
        validationSchema={schema}
        onSubmit={formSubmitHandler}
        fields={fields}
        formClassName="admin-category-form"
        submitLabel="Add Category"
        submitClassName="admin-category-submit"
      />
    </div>
  );
};

export default AddCategoryForm;
