import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Divider } from "antd"

export default class Home extends Component {
  render() {
    return (
      <div>
        Home Page
        <Divider />
        <Link to="/login">Login</Link>
        <Divider />
        <Link to="/register">Register</Link>
      </div>
    )
  }
}
