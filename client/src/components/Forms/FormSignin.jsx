import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import "../../styles/Form.css";
import ImageSignIn from "../../images/sign-innnn.svg"
class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container d-flex align-items-center justify-content-center">
      <div className="form-container">
        <header className="header mt-5 mb-5">
          <h1 className='text-center purple' >
            Welcome back{" "}
            <span role="img" aria-label="heart">
              💙
            </span>
          </h1>
        </header>
        <form className="d-flex flex-column align-items-center" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <input className= " w-100 mt-2" placeholder="Email" type="email" id="email" name="email" />
          <input className= " w-100 mt-2" placeholder="password" type="password" id="password" name="password" />
          <button className="primary-button w-100 p-2 mt-3">Submit</button>
        </form>
        <div className="form-div-bottom">
          <p>Don't have an account? </p>
          <Link className="link" to="/signup">
            Register
          </Link>
        </div>
      </div>
      <div><img style={{}} src={ImageSignIn}/></div>
      </div>
    );
  }
}

export default withRouter(withUser(FormSignin));
