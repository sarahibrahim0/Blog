import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        admin: null,
        profile: null,
        loading: false,
        isProfileDeleted : false,
        userCount:null,
        profiles:[],
        userPostsCount: null,
        userFilteredPosts : []

    },
    reducers:{

        setAdminProfile(state,action){
            state.admin = action.payload;
        },
setProfile(state,action){
    state.profile = action.payload;
},

setProfilePostsCount(state,action){
    state.userPostsCount = action.payload;
},

setProfileFilteredPosts(state,action){
    state.userFilteredPosts = action.payload;
},



setProfilePhoto(state,action){
    state.profile.profilePhoto = action.payload;
},
updateProfile(state,action){
    state.profile = action.payload;
},
setLoading(state){
    state.loading = true
},
clearLoading(state){
    state.loading = false;
},
setIsProfileDeleted(state,action){
    state.isProfileDeleted = true;
    state.loading = false;
},
clearIsProfileDeleted(state){
    state.isProfileDeleted = false;
},
setUserCount(state,action){
state.userCount = action.payload;
},
setProfiles(state,action){
    state.profiles=action.payload;
}
    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileReducer, profileActions};