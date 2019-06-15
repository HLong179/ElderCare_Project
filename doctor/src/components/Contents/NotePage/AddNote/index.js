import React, { Component } from "react"
import { Button, Modal, Form, Input, message } from "antd"
import { connect } from "react-redux"
import { addNote } from "../../../../actions/patientActions"
import moment from "moment"

const { TextArea } = Input

class AddNoteWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      title: null,
      script: null
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
      visible: false,
      loading: false,
      title: null,
      script: null,
      done: false
    })
    this.props.form.resetFields()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const elderId = this.props.auth.user.elderId
        let note = {
          elderId: elderId,
          title: values.title,
          script: values.script,
          time: moment().format("DD/MM/YYYY HH:mm:ss")
        }
        this.props.addNote(note)
        this.props.form.resetFields()
        this.setState({
          visible: false
        })
        message.success("Thêm ghi chú thành công", 3)
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
          <Button
            type="primary"
            icon="user-add"
            onClick={this.showModal}
            style={{ marginBottom: 20 }}
          >
            Thêm ghi chú
          </Button>
          <Modal
            title="Thêm ghi chú"
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
                  ]
                })(<Input type="text" onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item label="Nội dung">
                {getFieldDecorator("script", {
                  rules: [
                    {
                      required: true,
                      message: "Nội dung không được để trống"
                    }
                  ]
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

const AddNote = Form.create({ name: "add_note" })(AddNoteWithForm)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: data => dispatch(addNote(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNote)
