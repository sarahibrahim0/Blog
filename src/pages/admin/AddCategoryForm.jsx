import './Admin.css'

const AddCategoryForm = () => {
    return ( <div className="add-category">
    <h6 className="add-category-title">Add New Category</h6>
    <form  className="add-category-form">
      <div className="add-category-form-group">
        <label htmlFor="title">Category Title</label>
        <input

          type="text"
          id="title"
          placeholder="Enter Category Title"
        />
      </div>
      <button type="submit" className="add-category-btn">
        Add
      </button>
    </form>
  </div>);
}

export default AddCategoryForm;