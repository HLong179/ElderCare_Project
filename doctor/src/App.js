import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

import { setCurrentUser } from "./actions/authActions"
import store from "./store"

if (localStorage.getItem("userData")) {
  let data = localStorage.getItem("userData")
  data = JSON.parse(data)
  store.dispatch(setCurrentUser(data))
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App
