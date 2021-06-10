import React, { Component, Link } from "react";

class AlumniList extends Component {
  render() {
    const filteredAlumnis = this.props.alumnis.filter((alumni) => {
      return this.props.searchValue && alumni.city === this.props.searchValue;
    });
    return (
      <div>
        <ul className="AluListUL Item-container">
          {this.props.searchValue &&
            filteredAlumnis.map((alumni) => {
              return (
                <div key={alumni._id}>
                
                <li className="listedAlumni">
                <p> {alumni.firstName} {alumni.lastName} | {alumni.industry}</p>
                <p>{alumni.work} {alumni.studies}</p>
                <p>{alumni.hood}</p>
                </li>
            </div>
              );
            })}

          {(!this.props.searchValue || this.props.searchValue.value === "") &&
            this.props.alumnis.map((alumni) => {
              return (
                <div key={alumni._id}>
                <li className="listedAlumni">
                <p> {alumni.firstName} {alumni.lastName} | {alumni.industry}</p>
                <p>{alumni.work} {alumni.studies}</p>
                <p>{alumni.hood}</p>
                </li>
            </div>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default AlumniList;
