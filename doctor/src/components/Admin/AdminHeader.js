import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Layout, Icon, Menu, Dropdown, Avatar } from "antd"
import doctorAvatar from "../../assets/avatar-doctor.png"
import { connect } from "react-redux"
import { logout } from "../../actions/authActions"

const { Header } = Layout

class AdminHeader extends Component {
  logoutUser = () => {
    this.props.logout(this.props.history)
  }
  render() {
    const userMenu = (
      <Menu style={{ marginTop: "24px" }}>
        <Menu.Item key="0">
          <div onClick={this.logoutUser}>
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
                {this.props.auth.user ? this.props.auth.user.name : null}
              </span>
            </span>
          </Dropdown>
        </div>
      </Header>
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
    logout: history => dispatch(logout(history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminHeader))
