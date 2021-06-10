import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import AutoComplete from "../AutoComplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import qpv from "../../qpvDB.json";
import "../../styles/Form.css";
import UploadWidget from "../UploadWidget";
import ImageSignUp from "../../images/sign-in.jpg"
import ImageStandard from "../../../src/images/user-circle-solid.png"

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    status: "",
    locationUser: { coordinates: [] },
    address: "",
    neighborhood: "",
    city: "",
    dept: "",
    codeDept: "",

    image:
      ImageStandard,
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;



    if (key === "neighborhood") {
      qpv.map((qpv) => {
        if (
          qpv.properties.l_nqpv === value &&
          this.state.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
            qpv.properties.nom_com
        ) {

          this.setState({
            coordinates: qpv.properties.geo_point_2d,
            dept: qpv.properties.nom_dept,
            codeDept: qpv.properties.c_dep,
          });

        }
      });
    }

    this.setState({ [key]: value });
    // console.log(this.state) ;
  };

  handlePlace = (place) => {


    if (place.place_type[0] === "place") {
      this.setState({ city: place.text });

    }
    place.context.map((param, i) => {
      if (param.id.includes("place")) {
        this.setState({ city: place.context[i].text });
      }
    });

    const location = place.geometry;
    this.setState({
      locationUser: location,
      formattedAddress: place.place_name,
    });
  };

  handleFileSelect = (temporaryURL) => {
    // Get the temporaryURL from the UploadWidget component and
    // set the state so we can have a visual feedback on what the image will look like :)
    this.setState({ tmpUrl: temporaryURL });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    for (const key in this.state) {
      if (key === "image") continue;
      fd.append(key, this.state[key]);
      
    }

    if (this.imageRef.current.files[0]) {
      fd.append("image", this.imageRef.current.files[0]);
    }

    const { context } = this.props;
    apiHandler
      .signup(this.state)
      .then((data) => {
        context.setUser(data);

        this.props.history.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };



  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <header className="header mt-5 mb-5 d-flex justify-content-center">
          <h1 className='text-center purple' >
            Create an account{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>
          </h1>
        </header>
        <div className="container d-flex align-items-center justify-content-around mb-5">
          <div className="form-container-signup mb-5">
          <img
            src={this.state.image}
            alt="Avatar"
            style={{
              verticalAlign: "middle",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />

          <form
            className="d-flex flex-column align-items-center"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          >
        
        <UploadWidget
            ref={this.imageRef}
            onFileSelect={this.handleFileSelect}
            name="image"
            >
            Change profile image
          </UploadWidget>
          

            <div className="form-group w-100">
              <label className="label" htmlFor="status">
                I am
              </label>
              <select
                className="w-100 mt-2 p-2"
                type="select"
                onChange={this.handleChange}
                value={this.state.status}
                id="status"
                name="status"
                data-target="row"
              >
                <option value="student">in middle/high school</option>
                <option value="alumni">a student or professional </option>
                {/* <option value="stretch" selected>click and select</option> */}
              </select>
            </div>



          
              <input
                placeholder="First name"
                className= " w-100 mt-2" 
                id="firstName"
                type="text"
                name="firstName"
              />
        

        
              <input
                className= " w-100 mt-2" 
                placeholder= "Last name"
                id="lastName"
                type="text"
                name="lastName"
              />
        

      

              <input
                placeholder="Email"
                className= " w-100 mt-2" 
                onChange={this.handleChange}
                value={this.state.email}
                type="text"
                id="email"
                name="email"
              />
          

          
              <input
                className= " w-100 mt-2" 
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"

                id="password"
                name="password"
              />
          

            
              <AutoComplete
                onSelect={this.handlePlace}
                onChange={this.handleChange}
                value={this.state.address}
                placeholder= "Address"
                type="text"
                className= "w-100 mt-2" 
                id="address"
                name="address"
                placeholder="to get your (old) neighborhood"
              />
        

            {this.state.city && (
              <div className="form-group">
                <label className="label" htmlFor="neighborhood">
                  Neighborhood
                </label>
                <select
                  // defaultValue="Select your neighborhood"
                  onChange={this.handleChange}
                  value={this.state.neighborhood}
                  type="select"
                  className= " w-100 mt-2" 
                  id="neighborhood"
                  name="neighborhood"
                >
                  <option disable selected hidden value="none">
                    Select your neighborhood
                  </option>
                  ;
                  {qpv.map((hood) => {
                    let normCity = this.state.city
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "");


                    // console.log(hood.properties);
                    // let normCom= hood.properties.nom_com.normalize("NFD")
                    // .replace(/[\u0300-\u036f]/g, "");
                    // console.log(hood.properties.nom_com)
                    // console.log(normCity)
                    if (
                      hood.properties.nom_com &&
                      hood.properties.nom_com.includes(normCity)
                    ) {

                      return (
                        <option value={hood.properties.l_nqpv}>
                          {hood.properties.l_nqpv}
                        </option>
                      );
                    }
                  })}

                </select>
              </div>
            )}


            {this.state.status === "alumni" && (
              <div className="alumniPart">
              
                  <input
                    onChange={this.handleChange}
                    value={this.state.industry}
                    type="text"
                    placeholder= "Field of work/study"
                    className= " w-100 mt-2" 
                    id="industry"
                    name="industry"
                  />
              

              

                  <input
                    onChange={this.handleChange}
                    value={this.state.intro}
                    type="text"
                    className= " w-100 mt-2" 
                    placeholder="Introduction"
                    id="intro"
                    name="intro"
                  />
              
                
                  <input
                    onChange={this.handleChange}
                    value={this.state.linkedin}
                    placeholder="(ex : https://fr.linkedin.com/in/emmanuelmacron)"
                    type="text"
                    className= " w-100 mt-2" 
                    id="linkedin"
                    name="linkedin"
                  />
            
              </div>
            )}

            <button className="primary-button w-100 p-2 mt-3" >Submit</button>
          </form>

          <div className="form-div-bottom mb-5">
            <p>Already have an account? </p>
            <Link className="link  mb-5" to="/signin">
              Log in
            </Link>
          </div>
          </div>
          <div>
          <img src={ImageSignUp} alt="start" style={{width: '40vw'}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(FormSignup));
