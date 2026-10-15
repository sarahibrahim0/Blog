import request from "../../utils/reques";
import getErrMsg from "../../utils/errorMsg";
import { categoryActions } from "../slices/categorySlice";
import {toast} from 'react-toastify';

export function fetchCategories() {
    return async (dispatch)=> {
dispatch(categoryActions.setLoading());
try{
    const {data} = await request.get('/api/categories');
    dispatch(categoryActions.setCategories(data));

}catch (error) {
    toast.error(getErrMsg(error));
  } finally {
    dispatch(categoryActions.clearLoading());
  }
    }
}



export function fetchAllCategories() {
    return async (dispatch, getState)=> {
dispatch(categoryActions.setLoading());
try{
    const {data} = await request.get('/api/categories/admin',{
        headers: {Authorization: 'Bearer '+getState().auth.user.token}
    });
    dispatch(categoryActions.setCategories(data));

}catch (error) {
    toast.error(getErrMsg(error));
  } finally {
    dispatch(categoryActions.clearLoading());
  }
    }
}

export function toggleCategoryActive(id) {
    return async (dispatch, getState)=> {
try{
    const {data} = await request.put(`/api/categories/active/${id}`,{},{
        headers: {Authorization: 'Bearer '+getState().auth.user.token}
    });
    dispatch(categoryActions.toggleCategoryActive(data));
    toast.success(data?.isActive === false ? "Category deactivated" : "Category activated")

}catch (error) {
    toast.error(getErrMsg(error));
  }
    }
}

export function fetchCategoryPosts(category, currentPage) {
    return async (dispatch) => {
      dispatch(categoryActions.setLoading());
      try {
        const { data } = await request.get(`/api/categories/category/${category}?pageNumber=${currentPage}`);
        //Must write the action in dispatch method
        dispatch(categoryActions.setCategoryPosts(data));
      } catch(error){ toast.error(getErrMsg(error));
      } finally {
        dispatch(categoryActions.clearLoading());
      }
    };
  }

export function setCategory(newCategory) {
    return async (dispatch, getState)=> {
try{
    const {data} = await request.post('/api/categories',newCategory,{
        headers: {Authorization: 'Bearer '+getState().auth.user.token,
            'Content-Type': 'application/json'}
    });
    dispatch(categoryActions.addCategory(data));
    toast.success("Category Added Successfully")

}catch (error) {
    toast.error(getErrMsg(error));
  }
    }
}

export function deleteCategory(id) {
    return async (dispatch, getState)=> {
try{
    const {data} = await request.delete(`/api/categories/${id}`,{
        headers: {Authorization: 'Bearer '+getState().auth.user.token}
    });
    dispatch(categoryActions.deleteCategory(data?.categoryId));
    toast.success(data?.message)

}catch (error) {
    toast.error(getErrMsg(error));
  }
    }
}

