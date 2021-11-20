import { _getUsers, _getQuestions, _saveQuestion } from "../_DATA";
import { questionActions } from "./question-slice";
import { userActions } from "./user-slice";

export const fetchQuestionData = () => {
  return async (dispatch) => {
    try {
      const questions = await _getQuestions();
      dispatch(questionActions.fetchQuestions(questions));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const users = await _getUsers();
      dispatch(userActions.fetchUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveQuestion = (question) => {
  return async (dispatch) => {
    try {
      const newQuestion = await _saveQuestion(question);
      dispatch(questionActions.addNewQuestion(newQuestion));
      dispatch(
        userActions.addNewQuestion({
          author: question.author,
          qid: newQuestion.id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
