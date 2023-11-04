import { createSlice } from "@reduxjs/toolkit";
import request from "../../utils/reques";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isError: false,
  },
  reducers: {
    setError(state) {
      state.isError = true;
    },
    clearError(state) {
      state.isError = false;
    },
  },
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export { passwordReducer, passwordActions };
