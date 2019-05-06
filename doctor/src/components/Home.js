import React, { Component } from "react"
import { Layout } from "antd"
import { Switch, Route } from "react-router-dom"
import ASider from "./Layout/Sider"
import AHeader from "./Layout/Header"
import AFooter from "./Layout/AFooter"
import "./Home.css"
import DashboardContent from "./Contents/DashboardContent"
import ListPatients from "./Contents/ListPatients"
import Schedules from "./Contents/Schedules"
import PatientDetail from "./Contents/PatientDetail"
import Relatives from "./Contents/Relatives"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

class Home extends Component {
  componentWillMount() {
    if (this.props.location.pathname === "/") {
      this.props.history.push("/dashboard")
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated && this.props.auth.isAdmin) {
      this.props.history.push("/admin/register")
    }
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login")
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <ASider />
        <Layout>
          <AHeader />
          <Switch>
            <Route path="/dashboard" component={DashboardContent} />
            <Route path="/list-patients" component={ListPatients} />
            <Route path="/schedules" component={Schedules} />
            <Route path="/patient/:id" component={PatientDetail} />
            <Route path="/relatives" component={Relatives} />
          </Switch>
          <AFooter />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
