import React from 'react';
import AutoComplete from "./AutoComplete";

const SearchBar = (props) => {
  
  return (
    <div>
        <input
          value={props.value}
          onChange={(event) => props.handleChange(event.target.value)}
          type="text"
          id="header-search"
          placeholder="Recherche un alumni proche de toi !"
          name="searchBar"
        />
        
    </div>
  )
}

export default SearchBar
