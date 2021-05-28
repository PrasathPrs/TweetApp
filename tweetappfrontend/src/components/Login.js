import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { Link,withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      password: "",
    };
  }

  performAPICall = async () => {
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (
        await fetch(`http://localhost:8081/tweets/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }
    console.log("login response ",response);
    this.setState({
      loading: false,
    });
    if (this.validateResponse(errored, response)) {
      return response;
    }
  };

  validateInput = () => {
    if (!this.state.email) {
      message.error("Username is a required field");
      return false;
    }
    if (!this.state.password) {
      message.error("Password is a required field");
      return false;
    }
    return true;
  };

  validateResponse = (errored, response) => {
    console.log(response);
    if (!response.loginId) {
      message.error("Email and Password are Incorrect");
      return false;
    }
    return true;
  };

  persistLogin = (email,loginId) => {
    localStorage.setItem("email", email);
    localStorage.setItem("loginId", loginId);
  };

  
  login = async () => {
    if (this.validateInput()) {
      const response = await this.performAPICall();
      if (response) {
        this.persistLogin(response.email,response.loginId);
        this.setState({
          email: "",
          password: "",
        });
        message.success("Logged in successfully");
        this.props.history.push("/tweets");
      }
    }
  };

  
  render() {
    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history} />

        {/* Display Login fields */}
        <div className="flex-container">
          <div className="login-container container">
            <h1>Login to Tweet App</h1>

            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => {
                this.setState({
                  email: e.target.value,
                });
              }}
            />

            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }
              
            }
            />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.login}
            >
              Login
            </Button>
            <br></br>
            <br></br>
            <Link to="/forgetPassword">
               <center><Button id="login-button" className="btn-block" type="primary" block={true}
               style={{
                width: "20%",
              }}>
                Forget Password
              </Button> </center>
            </Link>
          </div>
        </div>

        {/* Display the footer */}
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(Login);