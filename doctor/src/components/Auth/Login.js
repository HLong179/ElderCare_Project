import React, { Component } from "react"
import { Form, Icon, Input, Button, Typography, Alert } from "antd"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { login } from "../../actions/authActions"

import "./login.css"

const { Title } = Typography

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values, this.props.history)
      }
    })
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/")
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login-box">
          <div className="login-box-left" />
          <div className="login-box-right">
            <Title
              level={2}
              type="flex"
              align="middle"
              style={{ paddingTop: "50px", marginBottom: "30px" }}
            >
              Đăng nhập
            </Title>
            <div className="alert-box">
              {this.props.auth.errors ? (
                <Alert message={this.props.auth.errors.message} type="error" />
              ) : null}
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {})(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {})(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {/* <button type="submit" className="login-form-button">
                  Đăng nhập
                </button> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const Login = Form.create({ name: "normal_login" })(NormalLoginForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (userData, history) => dispatch(login(userData, history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
