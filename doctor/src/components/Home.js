import React, { Component } from "react"
import { Layout } from "antd"
import { Switch, Route } from "react-router-dom"
import ASider from "./Layout/Sider"
import AHeader from "./Layout/Header"
import AFooter from "./Layout/AFooter"
import "./Home.css"
import DashboardContent from "./Contents/DashboardContent"
import ListPatients from "./Contents/ListPatients";
import Schedules from "./Contents/Schedules";
import PatientDetail from "./Contents/PatientDetail";
import Statictis from "./Contents/Statictis";

class Home extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <ASider />
        <Layout>
          <AHeader />
          <Switch>
            <Route exact path="/dashboard" component={DashboardContent} />
            <Route exact path="/list-patients" component={ListPatients} />
            <Route exact path="/schedule" component={Schedules} />
            <Route exact path="/patient/:id" component={PatientDetail} />
            <Route exact path="/statistic" component={Statictis} />
          </Switch>
          <AFooter />
        </Layout>
      </Layout>
    )
  }
}

export default Home
