import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Layout, Icon, Menu, Dropdown, Avatar } from "antd"
import doctorAvatar from "../../assets/avatar-doctor.png"

const { Header } = Layout

const userMenu = (
  <Menu style={{ marginTop: "24px" }}>
    <Menu.Item key="0">
      <Link to="/login">
        <Icon type="logout" />
        <span style={{ marginLeft: "10px" }}>Đăng xuất</span>
      </Link>
    </Menu.Item>
  </Menu>
)

class AdminHeader extends Component {
  render() {
    return (
      <Header style={{ background: "#fff", padding: 0, position: "relative" }}>
        <div
          className="header-left"
          style={{
            float: "left",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            marginLeft: "20px"
          }}
        />
        <div
          className="header-right"
          style={{ float: "right", marginRight: "20px" }}
        >
          <Dropdown overlay={userMenu} className="user-avatar">
            <span>
              <Avatar size="large" src={doctorAvatar} />
              <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                Admin
              </span>
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default AdminHeader
