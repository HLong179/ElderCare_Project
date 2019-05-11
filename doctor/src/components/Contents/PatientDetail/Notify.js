import React, { Component } from "react"
import { Button, Modal, Form, message, Checkbox, Row, Col } from "antd"
// import { addRelative } from "../../../actions/patientActions"
// import { connect } from "react-redux"

class NotifyWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmDirty: false,
      checked: []
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

  onChange = checkedValues => {
    this.setState({
      checked: [...checkedValues]
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    let body = {
      morning: false,
      noon: false,
      night: false
    }
    this.state.checked.map(check => {
      return body[check] = true
    })
    console.log(body) // result
    message.success("Hẹn giờ uống thuốc thành công")
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  displayModal() {
    return (
      <div>
        <Button
          type="primary"
          icon="clock-circle"
          onClick={this.showModal}
          style={{ marginLeft: 30 }}
        >
          Hẹn giờ
        </Button>
        <Modal
          title="Hẹn giờ uống thuốc cho bệnh nhân"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form
            onSubmit={this.handleSubmit}
            style={{
              maxWidth: "500px",
              margin: "0 auto"
            }}
          >
            <Checkbox.Group style={{ width: "100%" }} onChange={this.onChange}>
              <Row>
                <Col span={8}>
                  <Checkbox value="morning">Sáng</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="noon">Trưa</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="night">Tối</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form>
        </Modal>
      </div>
    )
  }
  render() {
    return <div>{this.displayModal()}</div>
  }
}

const Notify = Form.create({ name: "notify" })(NotifyWithForm)

export default Notify
