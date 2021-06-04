import React from "react";
import axios from 'axios'

class Home extends React.Component {

  componentDidMount() {
    axios.get(`https://ipinfo.io/json?token=3d2f876d8b1c25`)
    .then(response => {
      console.log("HOME", response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  
  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
      </div>
    );
  }
}

export default Home;
