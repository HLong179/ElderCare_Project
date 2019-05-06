import React, { Component, Fragment } from "react"
import { Form, Input, Button, Typography } from "antd"
import "./register.css"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

const { Title } = Typography

class RegistrationForm extends Component {
  state = {
    confirmDirty: false
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.history.push("/login")
      }
    })
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.isAdmin) {
      this.props.history.push("/")
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <Fragment>
        <Title
          level={2}
          type="flex"
          align="middle"
          style={{ paddingTop: "50px", marginBottom: "50px" }}
        >
          Đăng ký tài khoản cho bác sĩ
        </Title>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          className="register-form"
        >
          <Form.Item label="Họ tên">
            {getFieldDecorator("name", {})(<Input />)}
          </Form.Item>
          <Form.Item label="Username">
            {getFieldDecorator("username", {})(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {})(<Input />)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator("password", {})(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="Confirm Password">
            {getFieldDecorator("confirm", {})(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            {getFieldDecorator("phone", {})(
              <Input addonBefore={"+84"} style={{ width: "100%" }} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
              Đăng ký tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const Register = Form.create({ name: "register" })(RegistrationForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register))