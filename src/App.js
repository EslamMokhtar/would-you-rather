import { useEffect, useState } from "react";
import { _getUsers, _getQuestions } from "./_DATA";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Question from "./components/Question";
import NewQuestion from "./components/NewQuestion";
import LeaderBoard from "./components/LeaderBoard";
import "./styles.css";

const App = () => {
  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState({});
  const [authUser, setAuthUser] = useState("");

  const getData = async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();
    setUsers(users);
    setQuestions(questions);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const loginClickHandler = (user) => {
    setAuthUser(user);
    navigate("/");
  };
  return (
    <div className="App">
      <NavBar users={users} authUser={authUser} />
      <Routes>
        <Route
          path="/login"
          element={
            <Login loginClickHandler={loginClickHandler} users={users} />
          }
        />
        <Route
          path="/"
          element={
            <Home questions={questions} users={users} authUser={authUser} />
          }
        />
        <Route
          path="/leader-board"
          element={<LeaderBoard users={users} authUser={authUser} />}
        />
        <Route
          path="/new-question"
          element={<NewQuestion authUser={authUser} />}
        />
        <Route
          path="/questions/:id"
          element={
            <Question questions={questions} users={users} authUser={authUser} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
