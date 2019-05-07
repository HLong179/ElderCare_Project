import React, { Component, Fragment } from "react"
import { Input, Button, Modal, Form, Select, message } from "antd"
import { connect } from "react-redux"
import { addPatient } from "../../../actions/patientActions"

const { Option } = Select

class AddPatientWithForm extends Component {
  state = {
    visible: false
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newData = {
          name: values.name,
          gender: values.gender,
          age: values.age,
          icid: values.icid,
          doctorId: this.props.auth.user.doctorId,
          height: values.height,
          weight: values.weight
        }
        this.props.addPatient(newData)
      }
    })
    this.props.form.resetFields()
    this.setState({
      visible: false
    })
    message.success("Thêm bệnh nhân thành công")
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  displayModalAddPatient() {
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
      <Fragment>
        <Button
          type="primary"
          icon="user-add"
          onClick={this.showModal}
          style={{ marginBottom: 30 }}
        >
          Tạo mới bệnh nhân
        </Button>
        <Modal
          title="Tạo mới bệnh nhân"
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
            <Form.Item label="Tuổi">
              {getFieldDecorator("age", {
                initialValue: 10
              })(
                <Input
                  type="number"
                  onBlur={this.handleConfirmBlur}
                  min="10"
                  max="150"
                />
              )}
            </Form.Item>
            <Form.Item label="Giới tính">
              {getFieldDecorator("gender", { initialValue: "Nam" })(
                <Select>
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Số CMND">
              {getFieldDecorator("icid", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Chiều cao">
              {getFieldDecorator("height", {
                initialValue: 80
              })(
                <Input
                  type="number"
                  onBlur={this.handleConfirmBlur}
                  min="80"
                  max="250"
                />
              )}
            </Form.Item>
            <Form.Item label="Cân nặng">
              {getFieldDecorator("weight", {
                initialValue: 30
              })(
                <Input
                  type="number"
                  onBlur={this.handleConfirmBlur}
                  min="30"
                  max="150"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }
  render() {
    return <Fragment>{this.displayModalAddPatient()}</Fragment>
  }
}

const AddPatient = Form.create({ name: "add_patient" })(AddPatientWithForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPatient: userData => dispatch(addPatient(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPatient)
