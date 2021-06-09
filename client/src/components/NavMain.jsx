import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";



export class NavMain extends Component {
  state={
    buttonColor: 'green'
  }
  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({
           buttonColor: this.generateRGBColor(),
      })
 }, 1000);
  }

  generateRGBColor(){
    const array = ["#3cad95", "red"]
    let randomElement = array[Math.floor(Math.random() * array.length)];


    return randomElement;
  }

  handleClick = () => {
    this.props.setNotifToFalse()
  }

  
  
  render() {
    const { context } = this.props;
    const { user } = context


   const handleLogout = () => {
     apiHandler
       .logout()
       .then(() => {
         context.removeUser();
       })
       .catch((error) => {
         console.log(error);
       });
   }




    return (
      <nav className="NavMain">
      <div className="d-flex align-items-center">
        <NavLink exact to="/">
          <h3 className="logo mr-3 purple">Take Your Chance</h3>

        </NavLink>
        {!this.props.notif && context.isLoggedIn && <NavLink to="/chat" className="alert-message green"><i className=" fas fa-sms"></i> Go to chatroom</NavLink>}
      { this.props.notif && <NavLink to="/chat"  style={{color: this.state.buttonColor}} onClick={this.handleClick} className="alert-message green"><i className=" fas fa-sms"></i> Message from {this.props.senderName}</NavLink>}
      </div>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/profile/settings">
                {context.user && context.user.email}
  

              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}><i className="green fas fa-sign-out-alt"></i></p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin"><i className="fas fa-sign-in-alt green"></i></NavLink>
            </li>
            <li>
              <NavLink to="/signup"><i className="green fas fa-user-plus"></i></NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
    )
  }
}

export default withUser(NavMain);
