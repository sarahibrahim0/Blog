import { authActions } from "../slices/authSlice";
import request from "../../utils/reques";
import { toast } from "react-toastify";
//login user
//Must return anonymous function

export function loginUser(user) {
  return async (dispatch) => {
    try {

      const { data } = await request.post("/api/auth/login", user);
      //Must write the action in dispatch method
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch(error){ toast.error(error.response.data.message);
   }
  };
}

export function logoutUser() {
    return  (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");

  }}


  export function registerUser(user) {
    return async (dispatch) => {
      try {
        const { data } = await request.post("/api/auth/register", user);
        //Must write the action in dispatch method
        dispatch(authActions.register(data.message));

      } catch(error){

        toast.error(error.response.data.message);
             }
    };
  }



  export function verifyEmail(userId, token) {
    return async (dispatch, getState) => {
      try {
        console.log(userId, token)
      await request.get(`/api/auth/${userId}/verify/${token}`);
        //Must write the action in dispatch method
        dispatch(authActions.setIseEmailVerified());
      } catch(error){
        console.log(error)

      }
    };
  }
