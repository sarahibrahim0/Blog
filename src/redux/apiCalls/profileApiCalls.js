import request from "../../utils/reques";
import { profileActions } from "../slices/profileSlice";
import {toast} from 'react-toastify';
import { authActions } from "../slices/authSlice";


export function getUserProfile(userId) {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`/api/users/profile/${userId}`);
        //Must write the action in dispatch method
        dispatch(profileActions.setProfile(data));
        dispatch(profileActions.setProfilePostsCount(data.posts.length))
      } catch(error){
        toast.error(error.response.data);
      }
    };
  }

  export function getUserPosts(userId, currentPage) {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`/api/users/user/${userId}?pageNumber=${currentPage}`);
        //Must write the action in dispatch method
        console.log(data + 'dataa')
        dispatch(profileActions.setProfileFilteredPosts(data));
      } catch(error){ toast.error(error.response.data);
      }
    };
  }
  export function getAdmin() {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`/api/users/profile/64fe389e629a527b361cfff3`);
        dispatch(profileActions.setAdminProfile(data));
      } catch(error){ toast.error(error.response.data);
      }
    };
  }

  export function uploadProfilePhoto(newphoto) {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.post(`/api/users/profile/profile-photo`, newphoto
        , {
          headers: {
           Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type" : "multipart/form-data"
          }
        });
        //Must write the action in dispatch method
        dispatch(profileActions.setProfile(data?.profilePhoto));
        dispatch(authActions.setUserPhoto(data?.profilePhoto));
        toast.success(data.message);
        const user = JSON.parse(localStorage.getItem("userInfo"));
        user.profilePhoto = data?.profilePhoto;
        localStorage.setItem('userInfo',JSON.stringify(user));

      } catch(error){ toast.error(error.response.data);
      }
    };
  }

  export function updateProfile(id, profile) {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.put(`/api/users/profile/${id}`, profile
        , {
          headers: {
           Authorization: "Bearer " + getState().auth.user.token
          }
        });
        //Must write the action in dispatch method
        dispatch(profileActions.updateProfile(data));
        dispatch(authActions.setUserName(data?.username));
        toast.success("profile updated successfully");
        const user = JSON.parse(localStorage.getItem("userInfo"));
        user.username= data.username;
        localStorage.setItem('userInfo',JSON.stringify(user));

      } catch(error){ toast.error(error.response.data);
      }
    };
  }

  export function deleteProfile(userId){
    return async (dispatch, getState)=>{
      try{
        dispatch(profileActions.setLoading())
        const {data}=await request.delete(`/api/users/profile/${userId}`,
        {
          headers: { Authorization: "Bearer " + getState().auth.user.token},
        });
        dispatch(profileActions.setIsProfileDeleted());
        toast.success(data?.message);
        setTimeout(()=>{
          dispatch(profileActions.clearIsProfileDeleted());
        },2000)
      }
      catch(error){
        toast.error(error.response.data.message)
      }
    }
  }



  export function getUsersCount() {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.get(`/api/users/count`,{
          headers:{Authorization:"Bearer "+ getState().auth.user.token}});
        //Must write the action in dispatch method
        dispatch(profileActions.setUserCount(data?.userCount));
      } catch(error){ toast.error(error.response.data);
      }
    };
  }


  export function getUsersProfiles() {
    return async (dispatch, getState) => {
      try {
        const { data } = await request.get(`/api/users/profile`,{
          headers:{Authorization:"Bearer "+ getState().auth.user.token}});
        //Must write the action in dispatch method
        dispatch(profileActions.setProfiles(data));
      } catch(error){ toast.error(error.response.data);
      }
    };
  }