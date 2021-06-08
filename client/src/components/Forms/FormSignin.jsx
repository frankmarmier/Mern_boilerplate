import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import "../../styles/Form.css";
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
      <div className="container d-flex align-items-center">
      <div className="form-container">
        <header className="header">
          <h1>
            Welcome back{" "}
            <span role="img" aria-label="heart">
              💙
            </span>
          </h1>
        </header>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button>Submit</button>
        </form>
        <div className="form-div-bottom">
          <p>Don't have an account? </p>
          <Link className="link" to="/signup">
            Register
          </Link>
        </div>
      </div>
      <div><img style={{}} src="https://image.freepik.com/vecteurs-libre/personnes-se-reunissant-ligne-via-illustration-plate-videoconference-groupe-dessin-anime-collegues-chat-collectif-virtuel-pendant-verrouillage_74855-14136.jpg"/></div>
      </div>
    );
  }
}

export default withRouter(withUser(FormSignin));
