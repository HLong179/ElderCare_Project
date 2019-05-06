import React, { Component } from "react"
import { Layout } from "antd"
import Register from "./Register"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

const { Content } = Layout

class RegisterDoctor extends Component {
  render() {
    return (
      <Content style={{ margin: "16px 16px", backgroundColor: "#fff" }}>
        <div style={{ padding: 24, minHeight: 460 }}>
          <Register />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    admin: state.admin
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterDoctor))
