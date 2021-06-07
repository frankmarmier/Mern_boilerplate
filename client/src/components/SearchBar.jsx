import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from "react-router-dom";

export default class SearchBar extends Component {
    state = {
        qpvs: [],
      };
    
      componentDidMount() {
        axios
          .get("http://localhost:5000/api/qpv")
          .then((qpvResponse) => {
            console.log(qpvResponse);
            this.setState({qpvs: qpvResponse.data});
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
    
    render() {
        return (
            <div>
                <input type="text" placeholder="Search..."/>
                    {this.state.qpvs.map((qpvsResults) => {
                        console.log(qpvsResults);
                        return <div>
                            <div>{qpvsResults.properties.nomCom}</div>
                            <div>{qpvsResults.properties.lNqpv}</div>
                            </div>
                    })}
            </div>
        )
    }
}
