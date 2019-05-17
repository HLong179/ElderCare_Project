import React, { Component } from "react"
import { Button, Icon, Modal, Form, Input, Upload, message } from "antd"
import * as firebase from "firebase/app"
import "firebase/storage"
import "./style.css"
import { connect } from "react-redux"
import { updatePrescription } from "../../../actions/patientActions"
import store from "../../../store"

const { TextArea } = Input

class UpdateDrugsWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      imageUrlP: this.props.presciption.imageUrl,
      imageUrl: null,
      done: false
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
    this.props.form.resetFields()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let id = this.props.presciption.id
        let icid = this.props.elderId
        let doctorId = this.props.auth.user.doctorId

        // console.log('the result after we pick image: ', result)
        if (this.state.imageUrl) {
          let body = {
            id: id,
            imageUrl: this.state.imageUrl,
            script: values.drugNote
          }
          if (firebase) {
            let imageFileName = icid + "Prescription.png"
            let link = "doctor" + this.props.auth.user.name + doctorId

            let storageRef = firebase
              .storage()
              .ref()
              .child(`${link}/${imageFileName}`)

            // var message = result.imageUrl.split(',')[1];

            storageRef
              .putString(body.imageUrl, "data_url", {
                contentType: "image/.jpg"
              })
              .then(function(snapshot) {
                // console.log('Uploaded a base64url string!', snapshot);
                //we get url of this image after upload this to firebase storage

                storageRef.getDownloadURL().then(url => {
                  body.imageUrl = url
                  store.dispatch(updatePrescription(body, icid))
                })
              })
          }
        } else {
          let body = {
            id: id,
            imageUrl: this.state.imageUrlP,
            script: values.drugNote
          }
          store.dispatch(updatePrescription(body, icid))
        }

        this.setState({
          visible: false,
          imageUrl: null,
          imageUrlP: null
        })
        message.success("Cập nhật đơn thuốc thành công")
        this.props.form.resetFields()
      } else {
        console.log(err)
      }
    })
  }

  handleChangePicture = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
          done: true,
          imageUrlP: imageUrl
        })
      })
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJPG) {
      message.error("You can only upload JPG or PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJPG && isLt2M
  }

  displayDrugs() {
    const { getFieldDecorator } = this.props.form
    const scriptProps = this.props.presciption.script
    const { imageUrl, imageUrlP } = this.state
    return (
      <React.Fragment>
        <div className="list-drug">
          <Button type="primary" onClick={this.showModal}>
            <Icon type="sync" /> Cập nhật đơn thuốc
          </Button>
          <Modal
            title="Thêm thuốc"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Hình ảnh thuốc">
                {getFieldDecorator("drugPicture", {})(
                  <div className="clearfix" style={{ marginTop: 20 }}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      showUploadList={false}
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChangePicture}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrlP}
                          alt="avatar"
                          className="upload-preview"
                        />
                      ) : (
                        <img
                          src={imageUrlP}
                          alt="avatar"
                          className="upload-preview"
                        />
                      )}
                    </Upload>
                  </div>
                )}
              </Form.Item>
            </Form>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Ghi chú">
                {getFieldDecorator("drugNote", {
                  initialValue: scriptProps
                })(<TextArea />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return <div>{this.displayDrugs()}</div>
  }
}

const UpdatePresciption = Form.create({ name: "update_drugs" })(
  UpdateDrugsWithForm
)

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePrescription: (data,elderId) => dispatch(updatePrescription(data, elderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePresciption)
