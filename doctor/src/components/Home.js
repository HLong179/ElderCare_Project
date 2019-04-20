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

class Home extends Component {
  componentWillMount() {
    if (this.props.location.pathname === "/") {
      this.props.history.push("/dashboard")
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

export default Home
