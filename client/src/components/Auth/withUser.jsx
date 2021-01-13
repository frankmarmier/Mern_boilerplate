import React from "react";
import { UserContext } from "./UserContext";

// This is what we call a HOC (Higher Order Component).
// It takes a component as a parameter and it returns a component.
// This technique can be used to abstract some logic in order to pass
// some data down as props to the component sent as parameter.

// The use case of this one is to make it easy to access the user context to
// any component in our app.

/* ******************************************************** */

//  How to use:  =>
// YourComponent.jsx
// import React from "react"
// function or class YourComponent()
//
// ... your implementation.
//
// export default withUser(YourComponent)
// ----------------^ your component now has access to the user context defined in UserProvider.jsx.

// This component is not exported as default, so you have to import it
// this way :
// import { withUser } from "../relative/path/to/this/file"

export const withUser = (ComponentToPassUserContextTo) => {
  return function (props) {
    return (
      <UserContext.Consumer>
        {(context) => (
          <ComponentToPassUserContextTo {...props} context={context} />
        )}
      </UserContext.Consumer>
    );
  };
};
