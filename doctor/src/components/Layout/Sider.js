import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
import { Link } from "react-router-dom"
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
            <Link to={"/dashboard"}>
              <Icon type="home" />
              <span>Tổng quan</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={"/list-patients"}>
              <Icon type="user" />
              <span>Danh sách bệnh nhân</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={"/schedule"}>
              <Icon type="schedule" />
              <span>Lịch khám bệnh</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default ASider
