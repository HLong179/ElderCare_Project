import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router-dom"

const { Sider } = Layout
class AdminSider extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    let path = this.props.history.location.pathname.slice(1)
    path = path.split("/")
    path = path[path.length - 1]
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
          LOGO
        </div>
        <Menu theme="light" selectedKeys={[path]} mode="inline">
          <Menu.Item key="register">
            <NavLink to={"/admin/register"}>
              <Icon type="plus" />
              <span>Đăng ký bác sĩ</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="doctors">
            <NavLink to={"/admin/doctors"}>
              <Icon type="user" />
              <span>Danh sách bác sĩ</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(AdminSider)
