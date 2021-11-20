import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import questionSlice from "./question-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    questions: questionSlice.reducer,
    users: userSlice.reducer,
  },
});

export default store;
