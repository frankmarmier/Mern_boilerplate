
 




import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ListAlumni from "../components/ListAlumni";
import QpvsData from "../qpv.json";
import { useState } from 'react';

console.log(process.env.REACT_APP_MAPBOX_TOKEN)
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
      .get("http://localhost:5000/api/alumni")
      .then((usersResponse) => {
        console.log(usersResponse);
        this.setState({alumnis: usersResponse.data});
      })
      .catch((error) => {
        console.log(error);
      });
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
                <div>
                  <li key={alumni.id}>
                    {alumni.firstName} {alumni.lastName}<br/>
                    <p>{alumni.industry}</p>
                    <p>{alumni.work}</p>
                    <p>{alumni.studies}</p>
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
              console.log(alumni.locationUser.coordinates[0]);
              console.log(alumni.locationUser.coordinates[1]);
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

export default Home;
