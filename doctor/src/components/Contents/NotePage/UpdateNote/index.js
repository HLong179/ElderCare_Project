import React, { Component } from "react"
import { Modal, Form, Input, message } from "antd"
import { connect } from "react-redux"
import moment from "moment"
import { updateNote } from "../../../../actions/patientActions"

const { TextArea } = Input

class UpdateNoteWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.modalVisible,
      dataUpdate: this.props.noteData
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
      data: null
    })
    this.setModalVisible(false)
    this.props.form.resetFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const elderId = this.props.auth.user.elderId
        let note = {
          elderId: elderId,
          noteId: this.state.dataUpdate.id,
          title: values.title,
          script: values.script,
          time: moment().format("DD/MM/YYY HH:mm:ss")
        }

        this.props.updateNote(note)
        this.props.form.resetFields()
        this.handleCancel()
        message.success("Chỉnh sửa ghi chú thành công")
      } else {
        console.log(err)
      }
    })
  }

  displayAddNote() {
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment>
        <div className="list-note">
          <Modal
            title="Chỉnh sửa ghi chú"
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
              <Form.Item label="Tiêu đề">
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "Tiêu đề không được để trống"
                    }
                  ],
                  initialValue: this.state.dataUpdate.title
                })(<Input type="text" onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item label="Nội dung">
                {getFieldDecorator("script", {
                  rules: [
                    {
                      required: true,
                      message: "Nội dung không được để trống"
                    }
                  ],
                  initialValue: this.state.dataUpdate.content
                })(<TextArea />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
  render() {
    return <div>{this.displayAddNote()}</div>
  }
}

const UpdateNote = Form.create({ name: "add_note" })(UpdateNoteWithForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNote: data => dispatch(updateNote(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateNote)
