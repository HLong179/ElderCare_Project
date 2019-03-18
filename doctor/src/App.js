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
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default App
