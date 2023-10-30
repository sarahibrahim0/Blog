import { authActions } from "../slices/authSlice";
import request from "../../utils/reques";
import { toast } from "react-toastify";
//login user
//Must return anonymous function

export function loginUser(user) {
  return async (dispatch) => {
    try {
      // const response = await fetch("http://localhost:8000/api/auth/login",{
      //     method:"POST",
      //     body: JSON.stringify(user),
      //     headers: {
      //         "Content-Type": "application/json"
      //     }
      // });
      // const data = await response.json();
      const { data } = await request.post("/api/auth/login", user);
      //Must write the action in dispatch method
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch(error){ toast.error(error.response.data);
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
        dispatch(authActions.register(data));
      } catch(error){ toast.error(error.response.data);
      }
    };
  }

