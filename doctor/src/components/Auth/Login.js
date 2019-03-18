import React, { Component, Fragment } from "react"
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd"
import { Link } from "react-router-dom"
import "./login.css"

const { Title } = Typography

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.history.push("/")
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Title
          level={2}
          type="flex"
          align="middle"
          style={{ paddingTop: "50px", marginBottom: "30px" }}
        >
          Login
        </Title>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                { required: true, message: "Please input your email!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
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
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Link className="login-form-forgot" to="/">
              Forgot password
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const Login = Form.create({ name: "normal_login" })(NormalLoginForm)
export default Login
