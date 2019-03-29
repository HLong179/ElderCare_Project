import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App
