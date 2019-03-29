import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
import { NavLink } from "react-router-dom"
const { Sider } = Layout

class ASider extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
      >
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ paddingTop: "60px" }}
        >
          <Menu.Item key="1">
            <NavLink to={"/dashboard"}>
              <Icon type="home" />
              <span>Tổng quan</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to={"/list-patients"}>
              <Icon type="user" />
              <span>Danh sách bệnh nhân</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to={"/schedule"}>
              <Icon type="schedule" />
              <span>Lịch khám bệnh</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default ASider
