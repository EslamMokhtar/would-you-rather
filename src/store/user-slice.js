import { createSlice } from "@reduxjs/toolkit";
const initialState = { users: {} };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers(state, action) {
      state.users = action.payload;
    },
    answerQuestion(state, action) {
      state.users[action.payload.user].answers[action.payload.id] =
        action.payload.answer;
    },
    addNewQuestion(state, action) {
      state.users[action.payload.author].questions.push(action.payload.qid);
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
