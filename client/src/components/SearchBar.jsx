import React from 'react';
import AutocompletePlace from './AutoComplete';
import AutoComplete from "./AutoComplete";

class SearchBar extends React.Component {
    handleSearch = (place) => {
        this.props.handleSearch(place)
    }

    handleLocalize = (e) => {
      this.props.handleLocalizeSelf(e)
    }


  render() {  
    const filteredAlumnis = this.props.alumnis.filter((alumni) => {

        return this.props.searchValue && alumni.city === this.props.searchValue;
      });
    return (
    <div >
      <div className="d-flex justify-content-center align-items-center mb-5">
          <AutoComplete
            value={this.props.searchValue}
            onSelect={this.handleSearch}
            type="text"
            id="header-search"
            placeholder="Recherche un alumni proche de toi !"
            name="searchValue"
            
          
          />

          <button onClick={this.handleLocalize} className="primary-button mt-5 ml-2" style={{width: "250px",
    height: "50px"}}>🔎 Where am I</button>
        </div>

        {/* <ul>



        {this.props.searchValue &&
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
                </li>
            </div>
            );
        })}

        {!this.props.searchValue &&
        this.props.alumnis.map((alumni) => {
            return (
            <div>
                <li key={alumni.id}>
                {alumni.firstName} {alumni.lastName}
                <br />
                <p>{alumni.industry}</p>
                <p>{alumni.work}</p>
                <p>{alumni.studies}</p>
                {alumni.formattedAddress}
                </li>
            </div>
            );
        })}

        </ul> */}
        
    </div>
  )
}
}
export default SearchBar;
