import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem('userInfo')) : null,
        registerMessage : null
    },
    reducers: {
    login(state, action){
        state.user = action.payload;
        state.registerMessage = null;
    },
    logout(state){
        state.user = null;
    },
    register(state, action){
    state.registerMessage = action.payload;
    },
    setUserPhoto(state, action){
        state.user.profilePhoto = action.payload;
    },
    setUserName(state, action){
        state.user.username = action.payload;
    }
    }
})

const authReducer = authSlice.reducer;
const authActions = authSlice.actions


export {authActions, authReducer}