import React, { Component } from "react";
import { withUser } from "../components/Auth/withUser";
import { Link } from "react-router-dom";
import axios from "axios";
// import "../styles/Form";

export class Profile extends Component {
  state = {
    email: "",
    password: "",
    status: "",
    locationUser: { coordinates: [] },
    address: "",
    neighborhood: "",
    city: "",
    dept: "",
    codeDept: "",

    image:
      "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
  };
  
  render() {
    const { authContext } = this.props;
    const { user } = authContext;
    return (
      <div>
        
      </div>
    )
  }
}

export default Profile

