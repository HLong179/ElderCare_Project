import React, { Component } from "react"
import { Layout } from "antd"
import { Switch, Route } from "react-router-dom"
import AFooter from "../Layout/AFooter"
import RegisterDoctor from "./RegisterDoctor"
import ListDoctor from "./ListDoctor"
import AdminSider from "./AdminSider"
import AdminHeader from "./AdminHeader"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

class AdminPage extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login")
    }
    if (this.props.auth.isAuthenticated && !this.props.auth.isAdmin) {
      this.props.history.push("/")
    }
  }
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSider />
        <Layout>
          <AdminHeader />
          <Switch>
            <Route path="/admin/register" component={RegisterDoctor} />
            <Route path="/admin/doctors" component={ListDoctor} />
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
)(withRouter(AdminPage))
