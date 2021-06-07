import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatMessage from "./pages/Chat/ChatMessage"
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <div className="App">
      <script src='https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.js'></script>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css' rel='stylesheet' />
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chat" component={ChatMessage} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
