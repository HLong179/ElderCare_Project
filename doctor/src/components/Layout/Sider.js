import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router-dom";

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
        <div className="logo" style={{fontSize: this.state.collapsed ? '16px' : '22px'}}>LOGO</div>
        <Menu theme="light" selectedKeys={[path]} mode="inline">
          <Menu.Item key="dashboard">
            <NavLink to={"/dashboard"}>
              <Icon type="home" />
              <span>Tổng quan</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="list-patients">
            <NavLink to={"/list-patients"}>
              <Icon type="user" />
              <span>Danh sách bệnh nhân</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="schedules">
            <NavLink to={"/schedules"}>
              <Icon type="schedule" />
              <span>Lịch khám bệnh</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(ASider)
