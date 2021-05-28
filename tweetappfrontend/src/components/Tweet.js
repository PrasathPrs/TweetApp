import { PlusCircleOutlined,LikeTwoTone } from "@ant-design/icons";
import { Input,Button,message, Rate } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import "./Tweet.css";
import { Navbar, Card, Row, Col, Form, Collapse } from 'react-bootstrap';
import Moment from 'react-moment';

//export default function Tweet(props) {
  class Tweet extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        deleteId:"",
        replyTweet:"",
        replys:[],
        loadReplys:false,
        //hideReplys:false,
        editCheck : false,
        updateMessage : "",
      };
    }

    deletePost = async(e,id) => {
      let response = {};
    let errored = false;
    e.preventDefault();
    try {
      response = await (
        await fetch(`http://localhost:8081/tweets/delete/${id}`, {
          method: "DELETE",
        })
      ).json();
    } catch (e) {
      errored = true;
    }
      
      message.info("Deleted Successfully");
      window.location.reload(false);
  
    };

    validateReplyTweet = () =>{
      if (!this.state.replyTweet) {
        message.error("Type Something in your mind ro reply");
        return false;
      }
      return true;
    };

    replyPost = async(e,tweetId,userId) => {
      let response = {};
    let errored = false
    e.preventDefault();
    if(!this.validateReplyTweet()){
      return false;
    }
    
    try {
      response = await (
        await fetch(`http://localhost:8081/tweets/reply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tweetMessageId : tweetId,
            loginId: userId,
            replyMessage:this.state.replyTweet,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      replyTweet:"",
    });
    message.info("Replied Successfully");
    window.location.reload(false);

  };

  getReplyTweets = async (e,tweetId) => {
    let response = {};
        let errored = false;
        this.setState({
          loading: true,
          hideReplys:true,
        });
        e.preventDefault();
        try {
          response = await (
            await fetch(`http://localhost:8081/tweets/replyTweet/${tweetId}`, {
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
          replys : response,
          loadReplys:true,
        });
    };


    updateLike = async (e,tweetId,userId) => {
      let response = {};
      let errored = false;
      e.preventDefault();
      try {
        response = await (
          await fetch(`http://localhost:8081/tweets/like`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id : tweetId,
              loginId: userId,
            }),
          })
        ).json();
      } catch (e) {
        errored = true;
      }
  
      
        message.info("Successfully Liked");
       window.location.reload(false);
     
    };

    updatePost = async(e,tweetId,loginId) => {
      let response = {};
    let errored = false;
    e.preventDefault();

    if(!this.validateUpdateTweet()){
      return false;
    }
    try {
      response = await (
        await fetch(`http://localhost:8081/tweets/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id : tweetId,
            loginId:loginId,
            tweetMessage: this.state.updateMessage,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }
      
      message.info("Updated Successfully");
      window.location.reload(false);
  
    };

    validateReplyTweet = () =>{
      if (!this.state.replyTweet) {
        message.error("Type Something in your mind");
        return false;
      }
      return true;
    };

    validateUpdateTweet = () =>{
      if (!this.state.updateMessage) {
        message.error("Type Something in your mind");
        return false;
      }
      return true;
    };
  

  render(){
  return (

    <tr>
      <td>{this.props.tweet.loginId}</td>
      <td><Moment fromNow>{this.props.tweet.tweetTime}</Moment></td>
      <td>{this.props.tweet.likeCount} <LikeTwoTone onClick={(e) => this.updateLike(e,this.props.tweet.id,this.props.tweet.loginId)} /></td>
      <td>{this.props.tweet.tweetMessage}
      <Input
                                  className="input-field"
                                  placeholder="Add Your Comment"
                                  onChange={(e) => {
                                    this.setState({
                                      replyTweet: e.target.value,
                                    });
                                  }}
                                />
                                <Button
                                  type="primary"
                                  //onClick={this.deletePost(this.props.tweet.id)}
                                  onClick={(e) => this.replyPost(e,this.props.tweet.id,this.props.tweet.loginId)}
                                >
                                  Add Comment
                              </Button>
                  {
                      this.state.loadReplys &&(
                        this.state.replys.map((tweet) =>
                     <tr> 
                        <td>{tweet.loginId}</td>
                        <td>{tweet.replyMessage} 
               </td>
                      </tr>
                           )
                      )
                      
                    }
      </td>
      <td>
        {/* <Button
                type="primary"
                onClick={(e) => this.getReplyTweets(e, this.props.tweet.id)}
              >
                View Comments
            </Button> */}

            <button type="button" class="btn btn-primary" onClick={(e) => this.getReplyTweets(e, this.props.tweet.id)} data-toggle="modal" data-target="#exampleModalLong">
            View Comments
            </button>
            <br></br>
            <br></br>
            {this.state.loadReplys && (
        <button type="button" class="btn btn-primary" 
        onClick={(e) => {
          this.setState({
            loadReplys: "",
          });
        }}>
        Hide Comments
        </button>
      )}

      </td>
      <td>
        {this.props.tweet.loginId == localStorage.getItem("loginId") && this.state.editCheck ? (
                <div>
                             <Input
                                  className="input-field"
                                  placeholder="Edit Post"
                                  value = {this.props.tweetMessage}
                                  onChange={(e) => {
                                    this.setState({
                                      updateMessage: e.target.value,
                                    });
                                  }}
                                />
                                <Button
                                  type="primary"
                                  //onClick={this.deletePost(this.props.tweet.id)}
                                  onClick={(e) => this.updatePost(e,this.props.tweet.id,this.props.tweet.loginId)}
                                >
                                  Submit
                              </Button>
                  </div>
        ) : (
                <Button
                    type="primary"
                    onClick={(e) => {
                      this.setState({
                        editCheck: true,
                      });
                    }}>
                    Update Post
                </Button>
         )
        }
      
      </td>
      <td>
      <Button
              type="primary"
              //onClick={this.deletePost(this.props.tweet.id)}
              onClick={(e) => this.deletePost(e, this.props.tweet.id)}
            >
              Delete Post
          </Button>
      </td>
    </tr>
    
  );
}
}
export default withRouter(Tweet);