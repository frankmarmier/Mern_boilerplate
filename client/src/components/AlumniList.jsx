import React, { Component, Link } from "react";

class AlumniList extends Component {
  handleClick = (alumni_id) => {
    console.log(alumni_id);
    this.props.handleCard(alumni_id);
  };
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
                <div key={alumni._id} className="profilCard">
                  <div className="imgDiv">
                    <img
                      src={alumni.image}
                      alt={alumni.firstName + alumni.lastName + " picture"}
                    />
                  </div>
                  <li className="listedAlumni">
                    <p>
                      {" "}
                      {alumni.firstName} {alumni.lastName} ||{" "}
                      <i class="fa fa-building-o" aria-hidden="true"></i>
                      {alumni.industry} |{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.handleClick(alumni._id);
                        }}
                      >
                        👁
                      </span>
                    </p>
                    <p>
                      {alumni.work} {alumni.studies}
                    </p>
                    <p>{alumni.hood}</p>
                  </li>
                </div>
              );
            })}

          {(!this.props.searchValue || this.props.searchValue.value === "") &&
            this.props.alumnis.map((alumni) => {
              return (
                <div key={alumni._id} className="profilCard" style={{ cursor: "pointer" }} onClick={() => {
                          this.handleClick(alumni._id);
                        }}>
                  <div className="imgDiv">
                    <img
                      src={alumni.image}
                      alt={alumni.firstName + alumni.lastName + " picture"}
                    />
                  </div>
                  <li className="listedAlumni" >
                    <p>
                      {" "}
                      <span className="firstLastName purple">
                        {alumni.firstName} {alumni.lastName}
                      </span>{" "}
                      <i class="fa fa-building-o green" aria-hidden="true"></i>{" "}
                      <span className="alumniHood">({alumni.neighborhood}) </span>
                      {/* |{" "} <span > 👁 </span> */}
                    </p>
                    <p>
                      <i className="fas fa-briefcase green"></i>
                      <span className="alumniWork">{alumni.work}</span>{" "}
                      <i class="fa fa-university green" aria-hidden="true"></i>
                      <span className="alumniStudies">{alumni.studies}</span>
                    </p>
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
