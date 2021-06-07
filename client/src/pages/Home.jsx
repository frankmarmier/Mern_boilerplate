import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ListAlumni from "../components/ListAlumni";
import QpvsData from "../qpv.json";

console.log(process.env.REACT_APP_MAPBOX_TOKEN)
const Map = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_MAPBOX_TOKEN
});


class Home extends React.Component {



  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
        <SearchBar />
        <ListAlumni />
        <h1>Qpvs</h1>
        {QpvsData.map((qpv) => {
          //console.log(qpv.properties.l_nqpv);
          <li>{qpv.properties.l_nqpv}</li>;
        }
        )}
        <Map
          center={[2.333333, 48.866667]}
          zoom={[14]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          {QpvsData.map((qpv) => {
              console.log(qpv.properties.geo_point_2d[0]);
              <Marker key={qpv.properties.c_nqpv} lattitude={qpv.properties.geo_point_2d[0]} longitude={qpv.properties.geo_point_2d[1]}>
                <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFVWM-O6hnNcA/profile-displayphoto-shrink_800_800/0/1593705445712?e=1628121600&v=beta&t=43_dRJlOjAMujOqxZxCncEICUQoAvWlcrduROYpDaq8" alt="alumni"/>
              </Marker>
          })}

        </Map>
        

      </div>
    );
  }
}

export default Home;
