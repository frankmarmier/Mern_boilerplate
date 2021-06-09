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
import AlumniDisplay from "../components/AlumniDisplay";
import AutoComplete from "../components/AutoComplete";

// console.log(process.env.REACT_APP_MAPBOX_TOKEN)
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

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
  };

  handleSearchValue = (place) => {
    console.log(place);
    console.log(place.context.length);
    console.log(place.center);
    console.log(place.center[1]);


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
    console.log(this.state.isAdress);

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
    console.log(imgId);
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
        });
      });
  }

  // handleSearchValue = (value) => {
  //   console.log(value);

  //   this.setState({
  //     searchValue: value.toLowerCase(),
  //   });
  // };

  render() {
    console.log(this.state.clickedAlumni);
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    // console.log(cityCenter + "render");
    if (!this.state.alumnis) {
      return <div>Nous n'avons pas trouvé de profil </div>;
    }

    console.log(this.state.alumnis);

    const filteredAlumnis = this.state.alumnis.filter((alumni) => {
      console.log(alumni.city);
      return this.state.searchValue && alumni.city === this.state.searchValue;
    });
    console.log(this.state.searchValue);

    console.log(this.state.cityCenter);


    return (
      <div>
        <h1>Take Your Chance ∆</h1>

        

        <Map
          center={ this.state.cityCenter ? this.state.cityCenter :[2.333333, 48.866667]}
          zoom={[10]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >

<div>
          {/* <SearchBar 
            handleChange={this.handleSearchValue}
            value={this.state.searchValue}         
          /> */}
          <AutoComplete
            value={this.state.searchValue}
            onSelect={this.handleSearchValue}
            type="text"
            id="header-search"
            placeholder="Recherche un alumni proche de toi !"
            name="searchValue"
          />
          <div>
            <div >
              <ul className="Item-container">
                {this.state.searchValue &&
                  filteredAlumnis.map((alumni) => {
                    return (
                      <div>
                        <li key={alumni.id} className="CardItem">
                          {alumni.firstName} {alumni.lastName}
                          <br />
                          <p>{alumni.industry}</p>
                          <p>{alumni.work}</p>
                          <p>{alumni.studies}</p>
                        </li>
                      </div>
                    );
                  })}

                {!this.state.searchValue &&
                  this.state.alumnis.map((alumni) => {
                    return (
                      <div>
                        <li key={alumni.id} className="CardItem">
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
          </div>
        </div>
          {/* {console.log(cityCenter)} */}
          {this.state.alumnis.map((alumni) => {
            console.log(alumni.locationUser.coordinates[0]);
            console.log(alumni.locationUser.coordinates[1]);

            return !alumni.locationUser.coordinates[0] ||
              !alumni.locationUser.coordinates[1] ? (
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
            );
          })}

          {this.state.clickedAlumni && (
            <AlumniDisplay
              item={this.state.clickedAlumni}
              handleClose={this.handleClose}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default Home;
