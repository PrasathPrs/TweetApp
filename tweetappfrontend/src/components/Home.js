import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function App() {
  return (
    <>
      {/* Display "Home" page content */}
      <div className="flex-container">
        <div className="home-container container">
          <h1 className="home-welcome-text">
            Welcome to Tweet App
          </h1>

          <p>Please select an option from below</p>

          <div className="home-buttons">
            <Link to="/register">
              <Button id="register-button" className="btn-block" type="primary" block={true}>
                Register
              </Button>
            </Link>

            <Link to="/login">
              <Button id="login-button" className="btn-block" type="primary" block={true}>
                Login
              </Button>
            </Link>

            {/* <Link to="/forgetPassword">
              <Button id="login-button" className="btn-block" type="primary" block={true}>
                Forget Password
              </Button>
            </Link> */}

          </div>
        </div>
      </div>
    </>
  );
}
