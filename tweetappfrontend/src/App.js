import "antd/dist/antd.css";
import React, { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"; 
import Register from "./components/Register";
import ViewMyTweets from "./components/ViewMyTweets";
import ViewAllTweets from "./components/ViewAllTweets";
import Users from "./components/Users";
import './App.css';
import ForgetPassword from "./components/ForgetPassword";

export default function App(props) {
  return (
    <div className="App">


      <Switch>
      
      <Route path="/register">
          <Register />
        </Route> 

      <Route path="/login">
          <Login />
      </Route> 

      <Route path="/tweets">
          <ViewMyTweets />
      </Route> 

      <Route path="/viewAlltweets">
          <ViewAllTweets />
      </Route> 

      <Route path="/viewUsers">
          <Users />
      </Route> 

      <Route path="/forgetPassword">
          <ForgetPassword />
      </Route> 

       <Route path="/">
         <Home />
       </Route>

      </Switch>

    </div>
  );
}

//export default App;
