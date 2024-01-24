import { createSlice } from "@reduxjs/toolkit";
import request from "../../utils/reques";

const categorySlice = createSlice({
    name: 'category',
    initialState:{
        categories: [],
        categoryPosts : []
    },
    reducers:{
        setCategories(state,actions){
        state.categories = actions.payload;
        },
        addCategory(state,actions){
            state.categories.push(actions.payload);
            },
            deleteCategory(state,action){
             state.categories=   state.categories.filter(category=> category._id !== action.payload)
            },
            setCategoryPosts(state,action){
                state.categoryPosts = action.payload;
            },
    }
})


const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {categoryReducer, categoryActions};