import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from "react-router-dom";

export default class SearchBar extends Component {
    state = {
        alumnis: [],
      };
    
    render() {
        return (
            <div>
              
               <form action="/" method="get">
                 <label htmlFor="header-search">
                   <span className="visually-hidden">Recherche un alumni proche de toi !</span>
                 </label>
                 <input
                  type="text"
                  id="header-search"
                  placeholder="Recherche un alumni proche de toi !"
                  name="searchBar"
                 />
                <button type="submit">Rechercher</button>
               </form>
            </div>
        )
    }
}
