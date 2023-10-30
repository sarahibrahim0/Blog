import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCalls";


const CategoriesTable = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {categories} = useSelector(state=>state.category);

  useEffect(()=>{
    dispatch(fetchCategories());
  },[])
  // Delete Category Handler
  const deleteCategoryHandler = (CategoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
      dispatch(deleteCategory(CategoryId));
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => (
              <tr key={category?._id}>
                <td>{index+1}</td>
                <td>
                  <b>{category?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={()=>deleteCategoryHandler(category?._id)}>
                      Delete Category
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTable;
