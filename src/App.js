import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchQuestionData, fetchUserData } from "./store/data-actions";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Question from "./components/Question";
import NewQuestion from "./components/NewQuestion";
import LeaderBoard from "./components/LeaderBoard";
import RequireAuth from "./components/RequireAuth";
import Error from "./components/Error";

import "./styles.css";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const questions = useSelector((state) => state.questions.questions);
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchQuestionData());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar users={users} />
      <Routes>
        <Route path="/login" element={<Login users={users} />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home questions={questions} users={users} />
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <LeaderBoard users={users} />
            </RequireAuth>
          }
        />
        <Route
          path="/add"
          element={
            <RequireAuth>
              <NewQuestion />
            </RequireAuth>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <RequireAuth>
              <Question questions={questions} users={users} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
