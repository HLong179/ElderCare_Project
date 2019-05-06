import React, { Component } from "react"
import { Layout } from "antd"
import { Switch, Route } from "react-router-dom"
import AFooter from "../Layout/AFooter"
import RegisterDoctor from "./RegisterDoctor"
import ListDoctor from "./ListDoctor"
import AdminSider from "./AdminSider"
import AdminHeader from "./AdminHeader";

export default class AdminPage extends Component {
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
