import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import AutoComplete from "../AutoComplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import qpv from "../../qpvDB.json";

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
      "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
  };

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

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        console.log(data)
        this.props.context.setUser(data);
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
      <section className="form-section">
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
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="image">Upload image</label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={this.handleChange}
              // value={this.state.image}
              /**
               * https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
               */
              ref={this.inputFileRef}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="status">
              I am
            </label>
            <select
              className="input"
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

          {/* <label class="container">One
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label>

<label class="container">Two
  <input type="checkbox">
  <span class="checkmark"></span>
</label> */}

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              type="text"
              className="input"
              id="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className="input"
              id="password"
              name="password"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="address">
              Address
            </label>
            <AutoComplete
              onSelect={this.handlePlace}
              onChange={this.handleChange}
              value={this.state.address}
              type="text"
              className="input"
              id="address"
              name="address"
              placeholder="to get your (old) neighborhood"
            />
          </div>

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
                className="input"
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

          {/* <div className="form-group">
            <label className="label" htmlFor="neighborhood">
              Found neighborhood
            </label>
            
            <input
              onChange={this.handleChange}
              value={this.state.neighborhood} // WILL COME FROM KEL QUARTIER
              type="text"
              className="input"
              id="neighborhood"
              name="neighborhood"
            />
          </div> */}
          {this.state.status === "alumni" && (
            <div className="alumniPart">
              <div className="form-group">
                <label className="label" htmlFor="industry">
                  Field of work/study
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.industry}
                  type="text"
                  className="input"
                  id="industry"
                  name="industry"
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="intro">
                  Introduction
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.intro}
                  type="text"
                  className="input"
                  id="intro"
                  name="intro"
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="linkedin">
                  Linkedin Profil
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.linkedin}
                  placeholder="(ex : https://fr.linkedin.com/in/emmanuelmacron)"
                  type="text"
                  className="input"
                  id="linkedin"
                  name="linkedin"
                />
              </div>
            </div>
          )}

          <button >Submit</button>
        </form>

        <div className="form-section-bottom">
          <p>Already have an account? </p>
          <Link className="link" to="/signin">
            Log in
          </Link>
        </div>
      </section>
    );
  }
}

export default withRouter(withUser(FormSignup));
