import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { Input, message, DatePicker } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Tweet from "./Tweet";
import { Row, Col,Form, Collapse } from "antd";
import { Navbar,Button, Card, Rate } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
//import { Navbar, Button, Card, Row, Col, Form, Collapse } from 'react-bootstrap';
import Moment from 'react-moment';
import ViewAllTweets from "./ViewAllTweets";
import User from "./User";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class Users extends React.Component {
  constructor() {
    super();
    
    this.state = {
      loading: false,
      loggedIn: false,
      user: [],
      loadUser:false,
      search:"",
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
        await fetch(`http://localhost:8081/tweets/users/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
    } catch (e) {
      errored = true;
    }
    this.setState({
      loading: false,
      loggedIn: true,
      //userTweets: response,
    });
    return response

    
  };

  getUsers = async () => {
    const response = await this.performAPICall();
    
    if (response) {
      this.loadUser =  true;
      this.setState({
        user: response,
      });
    }
    //console.log("Tweets",this.tweets)
  };

  searchUser = async () => {
    let response = {};
    let errored = false;

    if(!this.validateSearchUser()){
      return false;
    }

    try {
      response = await (
        await fetch(`http://localhost:8081/tweets/user/search/${this.state.search}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
    } catch (e) {
      errored = true;
    }
    
    if (response) {
      this.loadUser =  true;
      this.setState({
        user: response,
      });
    }

    console.log(this.state.user);

  };

  validateSearchUser = () =>{
    if (!this.state.search) {
      message.error("Enter email id to search");
      return false;
    }
    return true;
  };

  componentDidMount() {
    this.getUsers();
    if (localStorage.getItem("email") && localStorage.getItem("loginId")) {
      this.setState({
        loggedIn: true
      },
        () => {
          console.log(this.state.loggedIn, 'loggedIn');
        });
    }
  }


  viewMyTweets = () => {
    this.props.history.push("/tweets");
  };

  viewAllTweets = () => {
    this.props.history.push("/viewAllTweets");
  };

  getUserElement = (user) => {
    return (
      
        <User
          user={user}
        />
     
    );
  };

  
  render() {

    //const { userTweets } = this.state

    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history}>
        <Input
            placeholder="Search User by Email"
            onChange={(e) => {
              this.setState({
                search: e.target.value,
              });
            }}
            style={{
              width: "30%",
            }}
            
          />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.searchUser}
            >
              Search
            </Button>

        </Header>

        <div class="sidenav">
          <ul>
            <li onClick={this.viewMyTweets} >ViewMyTweets</li>
            <li onClick={this.viewAllTweets} >ViewAllTweets</li>
            <li onClick={this.viewUsers} >View Users</li>
          </ul>
        </div>
          
            <div className="tweet-container">

            
            {this.state.user.length !== 0  && (
              <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Login Id</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                 
                {this.state.user.length ? (
                  this.state.user.map((usrDtls) =>
                    //this.getUserElement(usrDtls)
                   //<Tweet tweet={tweet}/>
                   <tr>
                    <td>{usrDtls.loginId}</td>
                    <td>{usrDtls.firstName}</td>
                    <td>{usrDtls.lastName} </td>
                    <td>{usrDtls.email} </td>
                  </tr> 
                  )
                ) : this.state.loading ? (
                  <div className="loading-text">Loading User...</div>
                ) : this.state.user.loginId != null ? (
                  <tr>
                  <td>{this.state.user.loginId}</td>
                  <td>{this.state.user.firstName}</td>
                  <td>{this.state.user.lastName} </td>
                  <td>{this.state.user.email} </td>
                </tr> 
                ) : (
                  <div className="loading-text">{this.state.user.loginId}</div>
                )}
             </tbody>
              </table>  
            )}
            </div>       
      </> 
    ) 
  }  
  }
export default withRouter(Users);
