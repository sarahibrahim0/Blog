import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState:{
        categories: [],
        categoryPosts : [],
        loading: false
    },
    reducers:{
        setCategories(state,actions){
        state.categories = actions.payload;
        },
        setLoading(state){
            state.loading = true;
        },
        clearLoading(state){
            state.loading = false;
        },
        addCategory(state,actions){
            state.categories.push(actions.payload);
            },
            deleteCategory(state,action){
             state.categories=   state.categories.filter(category=> category._id !== action.payload)
            },
            toggleCategoryActive(state,action){
                const updated = action.payload;
                state.categories = state.categories.map(category =>
                    category._id === updated._id
                        ? { ...category, isActive: updated.isActive }
                        : category
                );
            },
            setCategoryPosts(state,action){
                state.categoryPosts = action.payload;
            },
    }
})


const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {categoryReducer, categoryActions};