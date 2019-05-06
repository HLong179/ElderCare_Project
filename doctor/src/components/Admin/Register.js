import React, { Component, Fragment } from "react"
import { Form, Input, Button, Typography, message } from "antd"
import "./register.css"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { registerDoctor } from "../../actions/adminActions"

const { Title } = Typography

class RegistrationForm extends Component {
  state = {
    confirmDirty: false
  }
  showMessage = () => {
    message.success(
      "Đăng ký tài khoản bác sĩ thành công",
      2
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.registerDoctor(values)
        this.props.form.resetFields()
      }
    })
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
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
        <Title level={2} type="flex" align="middle">
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
          <Form.Item label="Số điện thoại">
            {getFieldDecorator("phone", {})(
              <Input addonBefore={"+84"} style={{ width: "100%" }} />
            )}
          </Form.Item>
          <Form.Item label="Chuyên khoa">
            {getFieldDecorator("specializeIn", {})(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 20 }}
              onClick={this.showMessage}
            >
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
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    registerDoctor: userData => dispatch(registerDoctor(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register))
