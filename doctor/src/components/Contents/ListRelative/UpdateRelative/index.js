import React, { Component } from "react"
import { Input, Modal, Form, message } from "antd"
import { updateRelative } from "../../../../actions/patientActions"
import { connect } from "react-redux"

class RelativesWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.modalVisible,
      name: this.props.relativeData.name,
      relativeId: this.props.relativeData.relativeId,
      email: this.props.relativeData.email,
      phone: this.props.relativeData.phone,
      address: this.props.relativeData.address,
      rlUsername: this.props.relativeData.rlUsername,
      rlPassword: this.props.relativeData.rlPassword,
      confirmDirty: false
    }
  }

  setModalVisible(visible) {
    this.props.handleVisible(visible)
    this.setState({ visible: visible })
  }

  showModal = () => {
    this.props.form.resetFields()
    this.setState({
      visible: true
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      name: null,
      relativeId: null,
      email: null,
      phone: null,
      address: null,
      rlUsername: null,
      rlPassword: null,
      confirmDirty: false
    })
    this.setModalVisible(false)
    this.props.form.resetFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          relativeId: this.state.relativeId,
          elderId: this.props.auth.user.elderId
        }
        this.props.updateRelative(data)
        this.handleCancel()
        message.success("Chỉnh sửa người thân phụ thành công")
      } else {
        console.log(err)
      }
    })
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  displayModal() {
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
    return (
      <div>
        <Modal
          title="Tạo tài khoản cho người thân phụ"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            style={{
              maxWidth: "500px",
              margin: "0 auto"
            }}
          >
            <Form.Item label="Họ và tên">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Họ và tên không được để trống"
                  }
                ],
                initialValue: this.state.name
              })(<Input type="text" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Tên đăng nhập">
              {getFieldDecorator("rlUsername", {
                rules: [
                  {
                    required: true,
                    message: "Tên đăng nhập không được để trống"
                  }
                ],
                initialValue: this.state.rlUsername
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Không đúng định dạng E-mail!"
                  },
                  {
                    required: true,
                    message: "Emai không được để trống"
                  }
                ],
                initialValue: this.state.email
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("rlPassword", {
                rules: [
                  {
                    required: true,
                    message: "Mật khẩu không được để trống"
                  }
                ],
                initialValue: this.state.rlPassword
              })(<Input type="password" disabled />)}
            </Form.Item>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator("address", {
                rules: [
                  {
                    required: true,
                    message: "Địa chỉ không được để trống"
                  }
                ],
                initialValue: this.state.address
              })(<Input type="text" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Số điện thoại không được để trống"
                  }
                ],
                initialValue: this.state.phone
              })(<Input addonBefore={"+84"} style={{ width: "100%" }} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  render() {
    return <div>{this.displayModal()}</div>
  }
}

const UpdateRelative = Form.create({ name: "relatives" })(RelativesWithForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRelative: userData => dispatch(updateRelative(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRelative)
