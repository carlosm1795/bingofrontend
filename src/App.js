import React, { useEffect } from "react";
import "./index.css";
import ReactNotifications from "react-notifications-component";
import Carton from "./Components/Carton/Carton.js";
import Admin from "./Components/Admin/Admin.js";
import Login from "./Components/Login/Login.js";
import TypeGames from "./Components/TypeGames/TypeGames.js";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Movies from "./Components/Movies/Movies";
import MoviesConsumer from "./Components/Movies/MoviesConsumer";
import { getCarton } from "./actions/bingo.js";
import { selectUserName, selectUserPhoto } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    dispatch(getCarton());
  }, [dispatch]);
  return (
    <div className="App">
      <>
        <ReactNotifications />
        <Movies />
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Carton} /> */}
            {/* <Route path="/" component={MoviesConsumer} /> */}
            <Route path="/login/" component={Login} />
            <Route path="/admin/" component={Admin} />
            <Route path="/typeGames/" component={TypeGames} />
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default App;
