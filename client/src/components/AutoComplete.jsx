import React, { Component } from "react";
import axios from "axios";
import "../styles/LocationAutoComplete.css";

/*
 *  Thanks to @mc100s for this component
 *  https://github.com/mc100s
 *
 */

class AutocompletePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      isLoading: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
      isLoading: true,
    });

    // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId);

    // Launch a new request in 1000ms (1s) => Avoids excessive requests to the end point.
    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 1000);
  }

  performSearch() {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    }
    // https://docs.mapbox.com/api/search/geocoding
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
      .then((response) => {
        this.setState({
          results: response.data.features,
          isLoading: false,
        });
      });
  }

  handleItemClicked(place) {
    this.setState({
      search: place.place_name,
      results: [],
    });

    this.props.onSelect(place);
  }

  render() {
    const { results, isLoading } = this.state;
    return (
      <div className="AutocompletePlace">
        <input
          className="input"
          type="text"
          value={this.props.defaultValue || this.state.search}
          onChange={this.handleSearchChange}
          placeholder="Type an address"
        />
        <ul className="AutocompletePlace-results">
          {results.map((place) => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => this.handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {isLoading && <li className="AutocompletePlace-items">Loading...</li>}
        </ul>
      </div>
    );
  }
}

export default AutocompletePlace;
