import { createSlice } from "@reduxjs/toolkit";
import request from "../../utils/reques";

const commentSlice = createSlice({
    name:'comment',
    initialState: {
        comments :[],
        comment: null
    },
    reducers:{
        setComments(state, action){
        state.comments = action.payload;
        },
        deleteComment(state, action){
            state.comments.filter(comment=>comment._id !== action.payload)
            },


    }
})

const commentActions = commentSlice.actions;
const commentReducer = commentSlice.reducer;

export {commentActions, commentReducer};