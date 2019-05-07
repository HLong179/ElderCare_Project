import React, { Component } from "react"
import { Input, Button, Modal, Form, message } from "antd"
import { addRelative } from "../../../actions/patientActions"
import { connect } from "react-redux"

class RelativesWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmDirty: false
    }
  }

  showModal = () => {
    this.props.form.resetFields()
    this.setState({
      visible: true
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          elder_id: this.props.ICID,
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          username: values.rlUsername,
          password: values.rlPassword
        }
        this.props.addRelative(data)
        this.props.form.resetFields()
        this.setState({
          visible: false
        })
        message.success("Thêm người thân thành công")
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
        <Button
          type="primary"
          icon="user-add"
          onClick={this.showModal}
          style={{ marginBottom: 20 }}
        >
          Tạo tài khoản
        </Button>
        <Modal
          title="Tạo tài khoản cho người thân"
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
              {getFieldDecorator("name", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Tên đăng nhập">
              {getFieldDecorator("rlUsername", {})(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {})(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("rlPassword", {})(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator("address", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator("phone", {})(
                <Input addonBefore={"+84"} style={{ width: "100%" }} />
              )}
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

const AddRelatives = Form.create({ name: "relatives" })(RelativesWithForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRelative: userData => dispatch(addRelative(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRelatives)
