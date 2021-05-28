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
import ViewMyTweets from "./ViewMyTweets";
import axios from 'axios';

class ViewAllTweets extends React.Component {

    constructor(props) {
        super(props);
        this.tweets = [];
        this.state = {
          loading: false,
          userTweets : [],
          tweetMessage: "",
          tweetTime: "",
          loginId: "",
          likeCount: "",
          loggedIn: false,
          newPost: "",
        };
      }

      performAPICall = async () => {
        let response = {};
        let errored = false;
        this.setState({
          loading: true,
        });
        
        // try {
        //   const res = await axios.get(`http://localhost:8081/tweets/all`);
        //   const posts = res.data;
        //   console.log("post ",posts);
        //   this.tweets = posts;
        //   console.log("tweets ",this.tweets);
        //   this will re render the view with new data
        //   this.setState({
        //     userTweets: posts
        //   });
        // } catch (err) {
        //   errored = true;
        // }
        try {
          response = await (
            await fetch(`http://localhost:8081/tweets/all`, {
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
        });
        return response
      };

      getMyTweets = async () => {
        const response = await this.performAPICall();
        
        if (response) {
          this.tweets =  response;
          this.setState({
            userTweets: response,
          });
        }
        //console.log("Tweets",this.tweets)
      };
    
      componentDidMount() {
        this.getMyTweets();
        if (localStorage.getItem("email") && localStorage.getItem("loginId")) {
          this.setState({
            loggedIn: true
          },
            () => {
              console.log(this.state.loggedIn, 'loggedIn');
            });
        }
      }
    
      getTweetElement = (tweet) => {
        return (
          //<Col lg={6} md={6} sm={6}>
            <Tweet
              tweet={tweet}
            />
         // </Col>
        );
      };
    
      viewMyTweets = () => {
        this.props.history.push("/tweets");
      };
    
      viewAllTweets = () => {
        this.props.history.push("/viewAllTweets");
      };
    
      validateTweet = () =>{
        if (!this.state.newPost) {
          message.error("Type Something in your mind");
          return false;
        }
        else{
          this.postTweet()
        }
      };

      postTweet = async () => {
        let response = {};
        let errored = false;
        try {
          response = await (
            await fetch(`http://localhost:8081/tweets/addTweet`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tweetMessage : this.state.newPost,
                loginId: localStorage.getItem("loginId"),
              }),
            })
          ).json();
        } catch (e) {
          errored = true;
        }
    
        console.log(response);
        if(!response){
          this.setState({
            newPost: "",
          });
          message.error("Tweet Failed");
          //window.location.reload(false);
        }
        else{
          this.setState({
            newPost: "",
          });
          message.info("Successfully Posted");
         window.location.reload(false);
        }
    
      };

      render() {

      //  const { userTweets } = this.state

        return (
          <>
        {/* Display Header */}
        <Header history={this.props.history}>

          <Input
            placeholder="Post Tweet"
            onChange={(e) => {
              this.setState({
                newPost: e.target.value,
              });
            }}
            style={{
              width: "30%",
            }}
            
          />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.validateTweet}
            >
              Post
            </Button>

            {/* <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.viewMyTweets}
            >
              ViewMyTweets
            </Button>

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.viewAllTweets}
            >
              ViewAllTweets
            </Button>

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.viewAllTweets}
            >
              ViewUsers
            </Button> */}

        </Header>

        <div class="sidenav">
          <ul>
            <li onClick={this.viewMyTweets} >ViewMyTweets</li>
            <li onClick={this.viewAllTweets} >ViewAllTweets</li>
            <li onClick={this.viewUsers} >View Users</li>
          </ul>
        </div>
            <div className="tweet-container">

            <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Login Id</th>
                        <th scope="col">Posted Date</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Post</th>
                        <th scope="col">View Replies</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                     
              {/* <br></br><br></br><br></br><br></br> */}
              {/* <Row lg={6} md={6} sm={6}> */}
                {this.state.userTweets.length !== 0 ? (
                  this.state.userTweets.map((tweet) =>
                    this.getTweetElement(tweet)
                   //<Tweet tweet={tweet}/>
                  )
                ) : this.state.loading ? (
                  <div className="loading-text">Loading Tweets...</div>
                ) : (
                  <div className="loading-text">No tweets to list</div>
                )}
              {/* </Row> */}

                </tbody>
              </table>

            </div>
      </> 
        ) 
      }  
}

export default withRouter(ViewAllTweets);