import { PlusCircleOutlined,LikeTwoTone } from "@ant-design/icons";
import { Input,Button,message,Rate } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import "./User.css";
import { Navbar, Table,Card, Row, Col, Form, Collapse } from 'react-bootstrap';
import Moment from 'react-moment';

//export default function Tweet(props) {
  class User extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
      updatePasswordCheck : false,
      }
    };

    
  render(){
  return (

    <tr>
      <td>{this.props.user.loginId}</td>
      <td>{this.props.user.firstName}</td>
      <td>{this.props.user.lastName} </td>
      <td>{this.props.user.email} </td>
      
        
                  
                  </tr>
                  
                );
}
}
export default withRouter(User);