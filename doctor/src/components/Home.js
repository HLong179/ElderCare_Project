import React, { Component } from "react"
import { Layout, message } from "antd"
import { Switch, Route } from "react-router-dom"
import ASider from "./Layout/Sider"
import AHeader from "./Layout/Header"
import AFooter from "./Layout/AFooter"
import "./Home.css"
import DashboardContent from "./Contents/Dashboard"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import * as firebase from "firebase/app"
import { fetchPatient } from "../actions/patientActions"
import { logout } from "../actions/authActions"
import "firebase/auth"
import "firebase/firestore"
import MedicinePage from "./Contents/MedicinePage"
import ListRelative from "./Contents/ListRelative"
import NotePage from "./Contents/NotePage"
import ErrorPage from "./ErrorPage"

class Home extends Component {
  componentWillMount() {
    if (this.props.location.pathname === "/") {
      this.props.history.push("/dashboard")
    }
    if (localStorage.getItem("userData")) {
      let data = localStorage.getItem("userData")
      data = JSON.parse(data)
      let timeNow = new Date().getTime()
      if (timeNow - data.lastLogin >= 60 * 60 * 1000) {
        this.props.logout(this.props.history)
        message.warn("Phiên đăng nhập đã hết hạn. Mời bạn đăng nhập lại", 3)
      }
      if (!firebase.apps.length) {
        console.log("we connect firebase")
        var firebaseConfig = {
          apiKey: "AIzaSyBhkXtTybamYMmxnZU2aYdoHf2Hy2uH1DQ",
          authDomain: "eldercare-5e4c8.firebaseapp.com",
          databaseURL: "https://eldercare-5e4c8.firebaseio.com",
          projectId: "eldercare-5e4c8",
          storageBucket: "eldercare-5e4c8.appspot.com",
          messagingSenderId: "49718683704",
          appId: "1:49718683704:web:1f894eef1258ff88"
        }
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig)
      }
    } else {
      this.props.history.push("/login")
    }
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login")
    } else {
      let elderId = this.props.auth.user.elderId
      this.props.fetchPatient(elderId)
    }
  }

  render() {
    const routeLink = this.props.history.location.pathname
    let displayErrorPage = false
    if (
      routeLink !== "/login" &&
      routeLink !== "/dashboard" &&
      routeLink !== "/medicines" &&
      routeLink !== "/notes" &&
      routeLink !== "/relatives" &&
      routeLink !== "/"
    ) {
      displayErrorPage = true
    }
    return (
      <React.Fragment>
        {displayErrorPage ? (
          <ErrorPage />
        ) : (
          <Layout style={{ minHeight: "100vh" }}>
            <ASider elder={this.props.auth.user} />
            <Layout>
              <AHeader />
              <Switch>
                <Route path="/dashboard" component={DashboardContent} />
                <Route path="/medicines" component={MedicinePage} />
                <Route path="/notes" component={NotePage} />
                {this.props.auth.user ? (
                  this.props.auth.user.permission === "Main" ? (
                    <Route path="/relatives" component={ListRelative} />
                  ) : null
                ) : null}
              </Switch>
              <AFooter />
            </Layout>
          </Layout>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: history => dispatch(logout(history)),
    fetchPatient: elderId => dispatch(fetchPatient(elderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
