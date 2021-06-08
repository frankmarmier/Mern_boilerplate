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
import qpv from "../qpvDB.json";
import QpvsData from "../qpv.json";

import { withRouter } from "react-router-dom";

import AlumniDisplay from "../components/AlumniDisplay";


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
    clickedAlumni:null,
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

      .get(`${process.env.REACT_APP_BACKEND_URL}/api/alumni`, {withCredentials: true})

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


  handleConversation = (alumni_id) => {

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/conversation`, {alumni_id}, {withCredentials: true})
    .then((response) => {
      console.log(response.data)
      this.props.handleNotification(alumni_id, response.data.alumni_name)
      this.props.history.push('/chat')
    })
  }


  handleSearchValue = (value) => {
    console.log(value);

    this.setState({
      searchValue: value.toLowerCase(),
    });
  };


  render() {
    console.log(this.state.clickedAlumni);
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.alumnis) {
      return <div>Nous n'avons pas trouvé de profil </div>;
    }



    const filteredAlumnis = this.state.alumnis.filter((alumni) => {
      
      console.log(alumni.neighborhood);
      return (
        alumni.neighborhood && alumni.neighborhood.toLowerCase()
        .includes(this.state.SearchValue));
    })


    return (
      <div>
        <h1>Take Your Chance ∆</h1>

        <div>



          <SearchBar 
            handleChange={this.handleSearchValue}
            value={this.state.searchValue}         
          />
          <div>
            <div>
              <ul>
                {this.state.alumnis.map((alumni) => {
                  return (
                    <div key={alumni._id}>
                      <li >
                        {alumni.firstName} {alumni.lastName}<br/>
                        <p>{alumni.industry}</p>
                        <p>{alumni.work}</p>
                        <p>{alumni.studies}</p>  
                        <button onClick={() => this.handleConversation(alumni._id)}>Chat</button>                     
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

export default withRouter(Home);
