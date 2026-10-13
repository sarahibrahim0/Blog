import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useEffect } from "react";
import AdminTableLayout from "./AdminTableLayout";
import DataTable from "../../components/table/DataTable";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCalls";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      background: "#ffff",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
      buttonStyling: false,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (category) => <b>{category?.title}</b>,
    },
    {
      key: "action",
      header: "Action",
      render: (category) => (
        <div className="data-table-actions">
          <button
            onClick={() => deleteCategoryHandler(category?._id)}
            className="data-table-btn data-table-btn--danger"
          >
            Delete Category
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTableLayout title="Categories">
      <DataTable
        columns={columns}
        rows={categories}
        rowKey="_id"
        loading={loading}
        emptyText="No Categories Were Found"
      />
    </AdminTableLayout>
  );
};

export default CategoriesTable;
