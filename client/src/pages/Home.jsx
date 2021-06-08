import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ListAlumni from "../components/ListAlumni";
import QpvsData from "../qpv.json";
import { useState } from 'react';
import { withRouter } from "react-router-dom";


const Map = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_MAPBOX_TOKEN
});


class Home extends React.Component {
  state = {
    alumnis: [],
  };

   // componentDidMount() {
  //   axios.get(`https://ipinfo.io/json?token=3d2f876d8b1c25`)
  //   .then(response => {
  //     console.log("HOME", response.data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/alumni`, {withCredentials: true})
      .then((usersResponse) => {

        this.setState({alumnis: usersResponse.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleConversation = (alumni_id) => {
    console.log("je passe par la home ")
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/conversation`, {alumni_id}, {withCredentials: true})
    .then((response) => {
      console.log(response.data)
      this.props.handleNotification(alumni_id, response.data.alumni_name)
      this.props.history.push('/chat')
    })
  }


  render() {
    return (
      <div>
        <h1>Take Your Chance ∆</h1>
        <div>
          {/* <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}         
          /> */}
          <ul>
            {this.state.alumnis.map((alumni) => {
              return (
                <div key= {alumni._id}>
                  <li>
                    {alumni.firstName} {alumni.lastName}<br/>
                    <p>{alumni.industry}</p>
                    <p>{alumni.email}</p>
                    <p>{alumni.work}</p>
                    <p>{alumni.studies}</p>
                    <button onClick={() => this.handleConversation(alumni._id)} className="btn btn-primary w-100">Begin a conversation</button>
                  </li>
                </div>
            );
            })}
          </ul>
        </div>
        <ListAlumni />
        <Map
          center={[2.333333, 48.866667]}
          zoom={[14]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          {this.state.alumnis.map((alumni) => {
              <Marker
               key={alumni._id} 
               coordinates={[alumni.locationUser.coordinates[1],
                alumni.locationUser.coordinates[0]]}>
                <img 
                src= {alumni.image} 
                alt="alumni"
                style={{
                  width: 70,
                  height: 70,
                }}
                />
              </Marker>
          })}

        </Map>
        

      </div>
    );
  }
}

export default withRouter(Home);
