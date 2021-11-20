import { createSlice } from "@reduxjs/toolkit";
const initialState = { isAauth: false, authUser: "" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAauth = true;
      state.authUser = action.payload;
    },
    logout(state) {
      state.isAauth = false;
      state.authUser = "";
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
