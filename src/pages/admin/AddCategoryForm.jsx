import { useState } from "react";
import "./Admin.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/apiCalls/categoryApiCalls";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("category title is required");
    //send data to the server
    dispatch(setCategory({title}))
    setTitle("")
  };
  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            value={title}
            type="text"
            id="title"
            placeholder="Enter Category Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
