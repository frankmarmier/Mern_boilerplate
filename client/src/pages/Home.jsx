import React, { Component } from "react";
import ReactMapboxGl, {
  GeoJSONLayer,
  Marker,
  Layer,
  Feature,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ListAlumni from "../components/ListAlumni";
import qpv from "../qpvDB.json";
import QpvsData from "../qpv.json";
import { useState } from "react";

// console.log(process.env.REACT_APP_MAPBOX_TOKEN)
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    alumnis: [],
    searchValue: '',
    loading: true,
    lng: "", // Default lng and lat set to the center of paris.
    lat: "",
  };


  handleClick = (selectedItem) => {
    // WHO THE PARENT 
    this.props.handleSelectItem(selectedItem);
  };

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/alumni")
      .then((usersResponse) => {
        console.log(usersResponse);
        this.setState({
          alumnis: usersResponse.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        })
      });
  };

  handleSearchValue = (value) => {
    console.log(value);

    this.setState({
      searchValue: value.toLowerCase(),
    });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.alumnis) {
      return <div>Nous n'avons pas trouvé de profil {":'("}</div>;
    }

    console.log(this.state.alumnis);

    const filteredAlumnis = this.state.alumnis.filter((alumni) => {
      
      console.log(alumni.neighborhood);
      return (
        alumni.neighborhood
        .toLowerCase()
        .includes(this.state.SearchValue));  
    })

    return (
      <div>
        <h1>Take Your Chance ∆</h1>

        <div>
          {/* <SearchBar 
            handleChange={this.handleSearchValue}
            value={this.state.searchValue}         
          /> */}
          <div>
            <div>
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
          </div>
        </div>
        <Map
          center={[2.333333, 48.866667]}
          zoom={[14]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          {this.state.alumnis.map((alumni) => {
            console.log(alumni.locationUser.coordinates[0]);
            console.log(alumni.locationUser.coordinates[1]);

            return !alumni.locationUser.coordinates[0] ||
            !alumni.locationUser.coordinates[1] ?
              <Marker
                key={alumni._id}
                coordinates={[
                  2.2,
                  48.93
                ]}
                anchor="bottom"
              >
                <img
                  src={alumni.image}
                  alt="alumni"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </Marker> : <Marker
                key={alumni._id}
                coordinates={[alumni.locationUser.coordinates[0],
                  alumni.locationUser.coordinates[1]
                ]}
                anchor="bottom"
              >
                <img
                  src={alumni.image}
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
