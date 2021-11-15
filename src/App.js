import { useEffect, useState } from "react";
import { _getUsers, _getQuestions } from "./_DATA";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState({});

  const getData = async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();
    setUsers(users);
    setQuestions(questions);
  };

  useEffect(() => {
    getData();
  }, []);
  const authUser = "tylermcginnis";
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar users={users} authUser={authUser} />
        <Routes>
          <Route path="/login" element={<Login users={users} />} />
          <Route
            path="/"
            element={
              <Home questions={questions} users={users} authUser={authUser} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
