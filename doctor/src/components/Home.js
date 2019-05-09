import React, { Component } from "react"
import { Layout } from "antd"
import { Switch, Route } from "react-router-dom"
import ASider from "./Layout/Sider"
import AHeader from "./Layout/Header"
import AFooter from "./Layout/AFooter"
import "./Home.css"
import DashboardContent from "./Contents/DashboardContent"
import ListPatients from "./Contents/ListPatients/ListPatients"
import Schedules from "./Contents/Schedules"
import PatientDetail from "./Contents/PatientDetail/PatientDetail"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

class Home extends Component {
  componentWillMount() {
    if (this.props.location.pathname === "/") {
      this.props.history.push("/dashboard")
    }
      if (!firebase.apps.length) {
        console.log('we connect firebase')
          var firebaseConfig = {
          apiKey: "AIzaSyBhkXtTybamYMmxnZU2aYdoHf2Hy2uH1DQ",
          authDomain: "eldercare-5e4c8.firebaseapp.com",
          databaseURL: "https://eldercare-5e4c8.firebaseio.com",
          projectId: "eldercare-5e4c8",
          storageBucket: "eldercare-5e4c8.appspot.com",
          messagingSenderId: "49718683704",
          appId: "1:49718683704:web:1f894eef1258ff88"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
      }
     
    
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login")
    }
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.user.permission === "admin"
    ) {
      this.props.history.push("/admin/register")
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
            <Route path="/patient/:icid" component={PatientDetail} />
            {/* <Route path="/relatives" component={Relatives} /> */}
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
