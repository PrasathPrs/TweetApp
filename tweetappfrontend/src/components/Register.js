import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message,DatePicker } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      firstName: "",
      lastName: "",
      contactNumber:"",
      email:"",
      password:"",
      confirmPassword: "",
    };
  }
  performAPICall = async () => {
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try{
    response = await(
      await fetch(`http://localhost:8081/tweets/register`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
            password: this.state.password,
          })
      })
      ).json()
    } catch (e) {
      errored = true;
    }
    this.setState({
      loading: false,
    });
   
    if (this.validateResponse(errored, response)) {
      return response;
    }
  };

  validateInput = () => {

    if (!this.state.firstName) {
      message.error("FirstName is a required field");
      return false;
    }

    if (!this.state.lastName) {
        message.error("LastName is a required field");
        return false;
    }

    if (!this.state.contactNumber) {
        message.error("ContactNumber is a required field");
        return false;
    }

    if (!this.state.email) {
        message.error("ContactNumber is a required field");
        return false;
    }
    
    if (!this.state.password) {
      message.error("Password is a required field");
      return false;
    }
    if (this.state.password.length < 6) {
      message.error("Password must be at least 6 characters");
      return false;
    }
    if (this.state.password.length > 32) {
      message.error("Password must be at most 32 characters");
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      message.error("Passwords do not match");
      return false;
    }
    return true;
  };

  
  validateResponse = (errored, response) => {
    
    console.log(response);
    if (!response.loginId) {
      message.error("This Account is Already Registered");
      return false;
    }

    // if (errored || (!response.success && !response.message)) {
    //   message.error(
    //     "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
    //   );
    //   return false;
    //}
    return true;
  };

  register = async () => {
    if(this.validateInput()){
      const response = await this.performAPICall();
      if(response){
        this.setState({
            loading: false,
            firstName: "",
            lastName: "",
            contactNumber:"",
            email:"",
            password:"",
            confirmPassword: "",
        });
        message.success("Registered successfully");
        this.props.history.push("/login");
      }
    }
     
  };

  render() {
    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history} >
        
         </Header> 

        {/* Display Register fields */}
        <div className="flex-container">
          <div className="register-container container">
            <h1>Make an account</h1>

            {/* Antd component which renders a formatted <input type="text"> field */}
            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="FirstName"
              onChange={(e) => {
                this.setState({
                  firstName: e.target.value,
                });
              }}
            />

            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="LastName"
              onChange={(e) => {
                this.setState({
                  lastName: e.target.value,
                });
              }}
            />

            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="ContactNumber"
              onChange={(e) => {
                this.setState({
                  contactNumber: e.target.value,
                });
              }}
            />

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
            
            {/* Antd component which renders a formatted <input type="password"> field */}
            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />

            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
              onChange={(e) => {
                this.setState({
                  confirmPassword: e.target.value,
                });
              }}
            />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.register}
            >
              Register
            </Button>
          </div>
        </div>

        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(Register);