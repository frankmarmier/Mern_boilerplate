import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import ChatMessage from "./pages/Chat/ChatMessage"
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withUser } from "./components/Auth/withUser";
import socketClient from "socket.io-client";
import FormProfile from './components/Forms/FormProfile'
const SERVER = process.env.REACT_APP_BACKEND_URL;

export class App extends Component {
  state={
    notif: false,
    alumni: null,
    users: null,
    currentUser: null,
    senderName: null,
    text: "",
    aboutDisplay: false
  }
  socket;

  componentDidMount() {
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = socketClient(SERVER);
    const { context } = this.props;
 
    socket.on('connection', () => {

      if (this.state.alumni) {
          this.handleNotification(this.state.alumni, this.state.users);
      }
    });
    socket.on('notification', notification => {
 
      
      const { context } = this.props;
      const { user } = context


      this.setState({
        notif: notification.alumni_id === user._id,
        senderName: notification.alumni_name,
        text: notification.notif
      })

     
    });
    this.socket = socket;
  }
  
  handleNotification = (alumni_id, alumni_name) => {
    this.socket.emit('send-notification', { alumni_id, notif: "New conversation", alumni_name})

  }

  handleMessageNotif = (alumni_id, alumni_name) => {
    this.socket.emit('send-notification', { alumni_id, notif: "New message", alumni_name})
  }

  setNotifToFalse = () => {
    this.setState({
      notif: false
    })
  }

  handleAboutDisplay = () => {
    this.setState({
      aboutDisplay: true
    })
  }

  closeAboutDisplay = () => {
    this.setState({
      aboutDisplay: false
    })
  }

  render() {


    return (
      <div className="App">
      
      <NavMain handleAbout={this.handleAboutDisplay} text={this.state.text} setNotifToFalse={this.setNotifToFalse} notif={this.state.notif} senderName={this.state.senderName}/>
      <Switch>
        <Route exact path="/" ><Home closeAbout ={this.closeAboutDisplay}  handleAbout={this.state.aboutDisplay} handleNotification={this.handleNotification}/></Route>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile/settings" component={FormProfile} />
        <Route exact path="/chat" component={ChatMessage} ><ChatMessage sendMessageNotif={this.handleMessageNotif}  alumni = {this.state.alumni} users={this.state.users}/></Route>
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
    )
  }
}

export default withUser(App)
