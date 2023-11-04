import {passwordActions} from '../slices/passwordSlice'
import request from "../../utils/reques";
import { toast } from "react-toastify";

//forgot password
export function forgotPassword(userEmail) {
    console.log(userEmail)
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email: userEmail,
      });
      dispatch(passwordActions.clearError());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//get reset password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {

      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      console.log(error);
      dispatch(passwordActions.setError());
    }
  };
}

//reset the password
export function resetPassword(newPassword, user) {
  return async () => {
    try {
      const data = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      console.log()
      toast.success(data.data.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
