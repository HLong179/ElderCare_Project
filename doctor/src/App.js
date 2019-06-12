import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Auth/Login"

import { setCurrentUser, logout } from "./actions/authActions"
import store from "./store"
import AdminPage from "./components/Admin/AdminPage"

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
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App
