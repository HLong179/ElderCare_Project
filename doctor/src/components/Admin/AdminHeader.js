import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Layout, Icon, Menu, Dropdown, Avatar } from "antd"
import doctorAvatar from "../../assets/avatar-doctor.png"
import { connect } from "react-redux"
import { adminLogout } from "../../actions/adminActions"

const { Header } = Layout

class AdminHeader extends Component {
  render() {
    const userMenu = (
      <Menu style={{ marginTop: "24px" }}>
        <Menu.Item key="0">
          <div onClick={adminLogout(this.props.history)}>
            <Icon type="logout" />
            <span style={{ marginLeft: "10px" }}>Đăng xuất</span>
          </div>
        </Menu.Item>
      </Menu>
    )
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    adminLogout: history => dispatch(adminLogout(history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminHeader))
