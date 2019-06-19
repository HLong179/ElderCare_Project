import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router-dom"

const { Sider } = Layout

class ASider extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    let path = this.props.history.location.pathname.slice(1)
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
      >
        <div
          className="logo"
          style={{ fontSize: this.state.collapsed ? "16px" : "22px" }}
        >
          {/* LOGO */}
        </div>
        <Menu theme="light" selectedKeys={[path]} mode="inline">
          <Menu.Item key="dashboard">
            <NavLink to={"/dashboard"}>
              <Icon type="home" />
              <span>Tổng quan</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="medicines">
            <NavLink to={"/medicines"}>
              <Icon type="medicine-box" />
              <span>Quản lý thuốc</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="notes">
            <NavLink to={"/notes"}>
              <Icon type="file-done" />
              <span>Quản lý ghi chú</span>
            </NavLink>
          </Menu.Item>
          {this.props.elder ? (
            this.props.elder.permission === "Main" ? (
              <Menu.Item key="relatives">
                <NavLink to={"/relatives"}>
                  <Icon type="user" />
                  <span>Quản lý người thân</span>
                </NavLink>
              </Menu.Item>
            ) : null
          ) : null}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(ASider)
