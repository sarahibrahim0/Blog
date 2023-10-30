import request from "../../utils/reques";
import { categoryActions } from "../slices/categorySlice";
import {toast} from 'react-toastify';

export function fetchCategories() {
    return async (dispatch)=> {
try{
    const {data} = await request.get('/api/categories');
    console.log(data)
    dispatch(categoryActions.setCategories(data));

}catch (error) {
    toast.error(error.response.data.message);
    console.log(error)
  }
    }
}

export function setCategory(newCategory) {
    return async (dispatch, getState)=> {
try{
    const {data} = await request.post('/api/categories',newCategory,{
        headers: {Authorization: 'Bearer '+getState().auth.user.token,
            'Content-Type': 'application/json'}
    });
    console.log(data)
    dispatch(categoryActions.addCategory(data));
    toast.success("Category Added Successfully")

}catch (error) {
    toast.error(error.response.data.message);
    console.log(error)
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
    toast.error(error.response.data.message);
    console.log(error)
  }
    }
}

