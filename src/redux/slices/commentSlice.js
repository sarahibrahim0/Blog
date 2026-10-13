import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:'comment',
    initialState: {
        comments :[],
        comment: null,
        loading: false
    },
    reducers:{
        setComments(state, action){
        state.comments = action.payload;
        },
        setLoading(state){
            state.loading = true;
        },
        clearLoading(state){
            state.loading = false;
        },
        deleteComment(state, action){
            state.comments = state.comments.filter(comment=>comment._id !== action.payload)
            },


    }
})

const commentActions = commentSlice.actions;
const commentReducer = commentSlice.reducer;

export {commentActions, commentReducer};