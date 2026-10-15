import {passwordActions} from '../slices/passwordSlice'
import request from "../../utils/reques";
import getErrMsg from "../../utils/errorMsg";
import { toast } from "react-toastify";

//forgot password
export function forgotPassword(userEmail) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email: userEmail,
      });
      dispatch(passwordActions.clearError());
      toast.success(data.message);
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };
}

//get reset password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {

      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
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
      toast.success(data.data.message)
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };
}
