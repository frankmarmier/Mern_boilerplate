import React from "react";
import "../styles/AlumniDisplay.css";


const AlumniDisplay = ({ item, handleClose }) => {

    // console.log({item.firstName});
  return (
    <div className="Item-container">
      <p onClick={handleClose} className="close-link">
        Close
      </p>

      <div className="round-image">
        <img className="user-img" src={item.image} alt="item" />
      </div>
      <h2 className="title">{item.firstName} {item.lastName}</h2>
      <p className="description">{item.intro}</p>
      <p className="location">{item.neighborhood}</p>
      <div className="user-info">
        <div className="round-image-user">
          <img src={item.image}alt="user" />
        </div>
      </div>
      
    </div>
  );
};

export default AlumniDisplay;