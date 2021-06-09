import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'
import { withUser } from '../Auth/withUser'
import AutoComplete from "../AutoComplete";
import qpv from "../../qpvDB.json";
import { withRouter, Redirect, Link } from "react-router-dom";
import UploadWidget from "../UploadWidget";
import ImageEdit from "../../images/signedit.svg"

export class FormProfile extends Component {
    state = {
        user: null,
        tmpUrl: "",
        httpResponse: null,
        isLoading: true,

      };

    imageRef = React.createRef();

    componentDidMount() {
    apiHandler
        .getUserInfos()
        .then((data) => {
            console.log(data)
        this.setState({ user: data, isLoading: false });
        })
        .catch((error) => {
        this.setState({
            isLoading: false,
            httpResponse: {
            status: "failure",
            message: "Something bad happened, please try again later",
            },
        });
        });
    }


    handlePlace = (place) => {
        console.log(place)

        if (place.place_type[0] === "place") {
          this.setState({ ["city"]: place.text });
    
        }
        place.context.map((param, i) => {
          if (param.id.includes("place")) {
            this.setState({ ["city"]: place.context[i].text });
          }
        });
    
        const location = place.geometry;
        this.setState({ user: { ...this.state.user, 
        ["locationUser"]: location,
        ["formattedAddress"]: place.place_name,
    } });

        
      };

    handleChange = (event) => {
        const key = event.target.name; // This function requires that you have the "name" attribute on your form fields.
        const value = event.target.value;
        console.log("key", key)
        console.log("value", value)
        this.setState({ user: { ...this.state.user, [key]: value } });
    };


    handleChangeOnPlace = (event) => {
        const value = event.target.value;
        const key = event.target.name;


    
        if (key === "neighborhood") {
          qpv.map((qpv) => {
            if (
              qpv.properties.l_nqpv === value &&
              this.state.user.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
                qpv.properties.nom_com
            ) {
                
                this.setState({ user: { ...this.state.user, 
                    ["locationUser"]: { coordinates: qpv.properties.geo_point_2d},
                    ["formattedAddress"]: this.state.user.formattedAddress,
                } });

    
            }
          });
        }
    }


    isValidInput = (key) => {
        if (this.state.user[key] === "") {
          return false;
        } else return true;
      };
    
      checkError = () => {
        for (const key in this.state.user) {
          if (this.state[key] === "") {
            return true;
          }
        }
        return false;
      };

      handleSubmit = (event) => {
        event.preventDefault();
    
        const fd = new FormData();
    
        for (const key in this.state.user) {
          if (key === "image") continue;
          fd.append(key, this.state.user[key]);
          
        }
    
        if (this.imageRef.current.files[0]) {
          fd.append("image", this.imageRef.current.files[0]);
        }




        fd.append("formattedAddress", this.state.user.formattedAddress)
        fd.append("coordinates", this.state.user.locationUser.coordinates);
    
        apiHandler
          .updateUser(fd)
          .then((data) => {

            
            this.props.context.setUser(data);

            this.props.history.push('/')

          
          })
          .catch((error) => {
            this.setState({
              httpResponse: {
                status: "failure",
                message:
                  "Something bad happened while updating your profile, try again later",
              },
            });
    
            this.timeoutId = setTimeout(() => {
              this.setState({ httpResponse: null });
            }, 2000);
          });
      };

      handleFileSelect = (temporaryURL) => {
        // Get the temporaryURL from the UploadWidget component and
        // set the state so we can have a visual feedback on what the image will look like :)
        this.setState({ tmpUrl: temporaryURL });
      };
    
      
    
    render() {
       
        const { httpResponse } = this.state;

        if (this.state.isLoading) return <div>Loading...</div>;

        console.log(this.state.user &&  this.state.user.formattedAddress)
        
        return (
            <div>
              <header className="header mt-5 mb-5 d-flex justify-content-center">
                  <h1 className='text-center' >Edit profile<span role="img" aria-label="heart">
                      ❤️
                  </span></h1>
              </header>
              <div className="round-image user-image">
                  <img
                  src={this.state.tmpUrl || this.state.user.image}
                  alt={this.state.user.firstName}
                  />
              </div>
            <div className="container d-flex align-items-center justify-content-between mb-5">
              <div className="form-container-signup mb-5">
                    <form className="form" onChange={this.handleChange} onSubmit={this.handleSubmit}>

              
                        <UploadWidget
                        ref={this.imageRef}
                        onFileSelect={this.handleFileSelect}
                        name="image"
                        >
                        Change profile image
                        </UploadWidget>
                        <div>
                        <label className="label" htmlFor="status">
                        I am
                        </label>
                        <select
                        className="w-100 mt-2 p-2"
                        type="select"
                        onChange={this.handleChange}
                        value = {this.state.user.status} 
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
                        className= " w-100 mt-2" 
                        placeholder="First name"
                        id="firstName"
                        type="text"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.user.firstName}
                        />
                        {!this.isValidInput("firstName") && (
                        <p className="input-error">Invalid input</p>
                        )}
                        <input
                        placeholder="Last name"
                        className= " w-100 mt-2" 
                        id="lastName"
                        type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.user.lastName}
                        />
                        {!this.isValidInput("lastName") && (
                        <p className="input-error">Invalid input</p>
                        )}

                        <input
                        placeholder="Email"
                        className= " w-100 mt-2" 
                        id="email"
                        type="email"
                        name="email"
                        value={this.state.user.email}
                        disabled
                        />

                        <AutoComplete
                            onSelect={this.handlePlace}
                            onChange={this.handleChangeOnPlace}
                            value={this.state.user.formattedAddress}
                            placeholder= "Address"
                            type="text"
                            className= "w-100 mt-2" 
                            id="address"
                            name="address"
                            placeholder="to get your (old) neighborhood"
                            />

        {this.state.user.city && (
                    <div className="form-group">
                    <label className="label" htmlFor="neighborhood">
                        Neighborhood
                    </label>
                    <select
                        // defaultValue="Select your neighborhood"
                        onChange={this.handleChangeOnPlace}
                        value={this.state.user.neighborhood}
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
                        let normCity = this.state.user.city
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");


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


                {this.state.user.status === "alumni" && (
                    <div className="alumniPart">
                    
                        <input
                        onChange={this.handleChange}
                        value={this.state.user.industry}
                        type="text"
                        placeholder= "Field of work/study"
                        className= " w-100 mt-2" 
                        id="industry"
                        name="industry"
                        />
                    

                    

                        <input
                        onChange={this.handleChange}
                        value={this.state.user.intro}
                        type="text"
                        className= " w-100 mt-2" 
                        placeholder="Introduction"
                        id="intro"
                        name="intro"
                        />
                    
                    
                        <input
                        onChange={this.handleChange}
                        value={this.state.user.linkedin}
                        placeholder="(ex : https://fr.linkedin.com/in/emmanuelmacron)"
                        type="text"
                        className= " w-100 mt-2" 
                        id="linkedin"
                        name="linkedin"
                        />
                
                    </div>
                )}

                <button className="primary-button w-100 p-2 mt-3 mb-5" >Submit</button>
                </form>



            </div>  
              <div><img src={ImageEdit} style={{height: "440px"}}/></div>          
            </div>
            </div>

        )
    }
}


export default withRouter(withUser(FormProfile));
