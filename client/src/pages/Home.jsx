import React, { Component } from "react";
import ReactMapboxGl, {
  GeoJSONLayer,
  Marker,
  Layer,
  Feature,
  Cluster,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import qpv from "../qpvDB.json";
import QpvsData from "../qpv.json";

import { withRouter } from "react-router-dom";

import AlumniDisplay from "../components/AlumniDisplay";
import AutoComplete from "../components/AutoComplete";


// console.log(process.env.REACT_APP_MAPBOX_TOKEN)
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;



class Home extends React.Component {
  state = {
    alumnis: [],
    searchValue: "",
    loading: true,
    lng: "", // Default lng and lat set to the center of paris.
    lat: "",
    clickedAlumni: null,
    cityCenter: null,
    isAdress: false,
    cluster: false,
  };

  clusterMarker = (coordinates) => (
    <Marker coordinates={coordinates} >
      C
    </Marker>
    );

  handleSearchValue = (place) => {
    console.log(place);
    console.log(place.context.length);
    console.log(place.center);
    console.log(place.center[1]);
  


  };

  handleSearchValue = (place) => {

    if (place.place_type[0] === "place") {
      this.setState({
        searchValue: place.text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
          cityCenter: place.center
      });
      // console.log(place.text);
      // console.log(cityCenter + "isCity");
    }
    place.context.map((param, i) => {


      if (param.id.includes("place")) {
        this.setState({ isAdress: true,
          searchValue: place.context[i].text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
         
          cityCenter: place.center
        });
        // console.log(cityCenter + "isAdress");
      }
    });

   
  };


  handleClose = () => {
    this.setState({ clickedAlumni: null });
  };

  handleClick = (event) => {
    const imgId = event.target.id;

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/alumni/" + imgId)
      .then((foundAlumni) => {

        this.setState({ clickedAlumni: foundAlumni.data });

      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios

      .get(`${process.env.REACT_APP_BACKEND_URL}/api/alumni`, {withCredentials: true})

      .then((usersResponse) => {
        this.setState({
          alumnis: usersResponse.data,
          loading: false,
        });

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });

      //A mettre en fonction, se lancer sur un click, BUT : localiser grâce à l'adresse IP
      //axios
      //   .get(`https://ipinfo.io/json?token=3d2f876d8b1c25`)
      //   .then(response => {
      //     console.log("HOME", response.data);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });

  }
  

  handleConversation = (alumni_id) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/conversation`, {alumni_id}, {withCredentials: true})
    .then((response) => {

      this.props.handleNotification(alumni_id, response.data.alumni_name)
      this.props.history.push('/chat')
    })
  }







  render() {

    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    // console.log(cityCenter + "render");
    if (!this.state.alumnis) {
      return <div>Nous n'avons pas trouvé de profil </div>;
    }



    const filteredAlumnis = this.state.alumnis.filter((alumni) => {
      return this.state.searchValue && alumni.city === this.state.searchValue;
    });



    

    return (
      <div>
        <div>
          <SearchBar searchValue= {this.state.searchValue} handleSearch={this.handleSearchValue} alumnis={this.state.alumnis}/>

          {/* <AutoComplete
            value={this.state.searchValue}
            onSelect={this.handleSearchValue}
            type="text"
            id="header-search"
            placeholder="Recherche un alumni proche de toi !"
            name="searchValue"
          />
          <div>
            <div>
              <ul>

                {this.state.searchValue &&
                  filteredAlumnis.map((alumni) => {
                    return (
                      <div>
                        <li key={alumni.id}>
                          {alumni.firstName} {alumni.lastName}
                          <br />
                          <p>{alumni.industry}</p>
                          <p>{alumni.work}</p>
                          <p>{alumni.studies}</p>
                          <p>{alumni.formattedAddress}</p>
                          <button onClick={() => this.handleConversation(alumni._id)}>Chat</button>  
                        </li>
                      </div>
                    );
                  })}

                {!this.state.searchValue &&
                  this.state.alumnis.map((alumni) => {
                    return (
                      <div>
                        <li key={alumni.id}>
                          {alumni.firstName} {alumni.lastName}
                          <br />
                          <p>{alumni.industry}</p>
                          <p>{alumni.work}</p>
                          <p>{alumni.studies}</p>
                          <p>{alumni.formattedAddress}</p>
                          <button onClick={() => this.handleConversation(alumni._id)}>Chat</button>  
                        </li>
                      </div>
                    );
                  })}

              </ul>
            </div>
          </div> */}
        </div>

        <Map
          center={ this.state.cityCenter ? this.state.cityCenter :[2.333333, 48.866667]}
          zoom={[10]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        > 
          
          
          {/* {console.log(cityCenter)} */}
          {this.state.alumnis.map((alumni) => {
            console.log(alumni.locationUser.coordinates[1]);
            console.log(alumni.locationUser.coordinates[0]);

            return !alumni.locationUser.coordinates[1] ||
            !alumni.locationUser.coordinates[0] ? (

              <Marker
                key={alumni._id}
                onClick={(event) => this.handleClick(event)}
                coordinates={[2.2, 48.93]}
                zoom={[12]}
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
            ) : (
              
              //<Cluster ClusterMarkerFactory={this.clusterMarker}>
                //{
              <Marker
                key={alumni._id}
                onClick={(event) => this.handleClick(event)}
                zoom={[7]}
                coordinates={[
                  alumni.locationUser.coordinates[0],
                  alumni.locationUser.coordinates[1],
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
            //}
            //</Cluster>
            );
          })}
          {this.state.clickedAlumni && (
            <AlumniDisplay
              item={this.state.clickedAlumni}
              handleClose={this.handleClose}
            />
          )}

          {this.state.clickedAlumni && 
          <AlumniDisplay
            handleConversation={this.handleConversation}
            item={this.state.clickedAlumni}
            handleClose={this.handleClose}
          />}

        </Map>
      </div>
    );
  }
}

export default withRouter(Home);
