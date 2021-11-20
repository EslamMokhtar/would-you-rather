import { createSlice } from "@reduxjs/toolkit";
const initialState = { questions: {} };
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    fetchQuestions(state, action) {
      state.questions = action.payload;
    },
    answerQuestion(state, action) {
      state.questions[action.payload.id][action.payload.answer].votes.push(
        action.payload.user
      );
    },
    addNewQuestion(state, action) {
      const newQuestion = action.payload;
      const id = newQuestion.id;
      state.questions[id] = newQuestion;

    },
  },
});
export const questionActions = questionSlice.actions;
export default questionSlice;
