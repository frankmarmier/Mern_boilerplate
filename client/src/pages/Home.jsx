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
import QpvsData from "../qpv.json";
import AlumniDisplay from "../components/AlumniDisplay";

// console.log(process.env.REACT_APP_MAPBOX_TOKEN)
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    alumnis: [],
    lng: "", // Default lng and lat set to the center of paris.
    lat: "",
    clickedAlumni:null,
  };


  handleClose = () => {
    this.setState({ clickedAlumni: null });
  };

  handleClick = (event) => {
    const imgId = event.target.id
    console.log(imgId)
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/alumni/" + imgId)
      .then((foundAlumni) => {
        console.log(foundAlumni.data);
        this.setState({ clickedAlumni: foundAlumni.data });
        console.log(this.state.clickedAlumni);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/alumni")
      .then((usersResponse) => {
        console.log(usersResponse.data);
        this.setState({ alumnis: usersResponse.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.clickedAlumni);
    console.log(this.state.alumnis);
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
                    {alumni.firstName} {alumni.lastName}
                    <br />
                    <p>{alumni.industry}</p>
                    <p>{alumni.work}</p>
                    <p>{alumni.studies}</p>
                  </li>
                </div>
              );
            })}
          </ul>
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
                onClick={(event) => this.handleClick(event)}
                coordinates={[
                  2.2,
                  48.93
                ]}
                anchor="bottom"
              >
                <img
                  src={alumni.image}
                  id={alumni._id}
                  // onClick={(event) => this.handleClick(event)}
                  alt="alumni"
                  style={{
                    width: 70,
                    height: 70,
                    // markerOffset:2em;
                  }}
                />
              </Marker> : <Marker
                key={alumni._id}
                onClick={(event) => this.handleClick(event)}
                coordinates={[alumni.locationUser.coordinates[0],
                  alumni.locationUser.coordinates[1]
                ]}
                anchor="bottom"
              >
                <img
                  src={alumni.image}
                  id={alumni._id}
                  // onClick={(event) => this.handleClick(event)}
                  alt="alumni"
                  style={{
                    width: 70,
                    height: 70,
                    // markerOffset:2em;
                  }}
                />
              </Marker>
          })}


{this.state.clickedAlumni && 
          <AlumniDisplay
            item={this.state.clickedAlumni}
            handleClose={this.handleClose}
          />}
        </Map>
      </div>
    );
  }
}

export default Home;
