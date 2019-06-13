import React, { Component } from "react"
import { Icon, Modal, Form, Input, Upload, message, Checkbox } from "antd"
import * as firebase from "firebase/app"
import "firebase/storage"
import { connect } from "react-redux"

const { TextArea } = Input

class UpdateMedicineWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.modalVisible,
      loading: false,
      imageUrl: this.props.medicineData.imageUrl,
      morning: this.props.medicineData.morning,
      afternoon: this.props.medicineData.afternoon,
      evening: this.props.medicineData.evening,
      text: this.props.medicineData.content,
      imgName: this.props.medicineData.title,
      done: true,
      photo: null
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
      loading: false,
      imageUrl: null,
      morning: false,
      afternoon: false,
      evening: false,
      text: "",
      imgName: "",
      done: false
    })
    this.props.handleVisible(false)
    this.props.form.resetFields()
  }
  handleSubmit = e => {
    e.preventDefault()
    const { imageUrl, morning, afternoon, evening, photo } = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.imgName.length < 2) {
          message.error("Chưa nhập tên thuốc", 3)
        } else if (!morning && !afternoon && !evening) {
          message.error("Chưa hẹn giờ uống thuốc", 3)
        } else {
          const elderId = this.props.auth.user.elderId
          if (firebase) {
            if (photo) {
              let storageRef = firebase
                .storage()
                .ref()
                .child(`${elderId}/${values.imgName}.jpg`)
              storageRef
                .putString(imageUrl, "data_url", {
                  contentType: "image/jpeg"
                })
                .then(snapshot => {
                  storageRef.getDownloadURL().then(url => {
                    firebase
                      .database()
                      .ref(
                        `Patients/${elderId}/Medicines/${
                          this.props.medicineData.idMedicineFB
                        }`
                      )
                      .update({
                        elderId: elderId,
                        imageUrl: url,
                        name: values.imgName,
                        script: values.text,
                        morning: ~~this.state.morning,
                        afternoon: ~~this.state.afternoon,
                        evening: ~~this.state.evening
                      })
                      .then(data => {
                        //success callback
                        this.setState({
                          visible: false,
                          loading: false,
                          imageUrl: null,
                          morning: false,
                          afternoon: false,
                          evening: false,
                          text: "",
                          imgName: "",
                          done: false
                        })
                        message.success("Sửa đơn thuốc thành công", 3)
                        this.props.form.resetFields()
                        this.setModalVisible(false)
                      })
                      .catch(error => {
                        //error callback
                        console.log("error ", error)
                      })
                  })
                })
            } else {
              let body = {
                imageUrl: this.state.imageUrl,
                name: values.imgName,
                script: values.text,
                morning: ~~this.state.morning,
                afternoon: ~~this.state.afternoon,
                evening: ~~this.state.evening
              }
              if (firebase) {
                firebase
                  .database()
                  .ref(
                    `Patients/${elderId}/Medicines/${
                      this.props.medicineData.idMedicineFB
                    }`
                  )
                  .update(body)
                  .then(async data => {
                    //success callback
                    this.setState({
                      visible: false,
                      loading: false,
                      imageUrl: null,
                      morning: false,
                      afternoon: false,
                      evening: false,
                      text: "",
                      imgName: "",
                      done: false
                    })
                    this.setModalVisible(false)
                  })
                  .catch(error => {
                    //error callback
                    console.log("error ", error)
                  })
              }
            }
          }
        }
      } else {
        console.log(err)
      }
    })
  }

  handleChangePicture = info => {
    this.setState({
      done: false
    })
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
          photo: imageUrl,
          done: true
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
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!")
    }
    return isJPG && isLt2M
  }

  displayDrugs() {
    const { getFieldDecorator } = this.props.form
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl

    return (
      <React.Fragment>
        <div className="list-drug">
          <Modal
            title="Chỉnh sửa thuốc"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
            okButtonProps={{ disabled: !this.state.done }}
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
                          src={imageUrl}
                          alt="avatar"
                          className="upload-preview"
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                )}
              </Form.Item>
            </Form>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Tên thuốc">
                {getFieldDecorator("imgName", {
                  initialValue: this.state.imgName
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Ghi chú">
                {getFieldDecorator("text", {
                  initialValue: this.state.text
                })(<TextArea />)}
              </Form.Item>
              <Form.Item label="Hẹn giờ uống thuốc">
                {getFieldDecorator("timeMedicine", {
                  initialValue: ""
                })(
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 30
                    }}
                  >
                    <Checkbox
                      checked={this.state.morning}
                      onChange={() =>
                        this.setState({
                          morning: !this.state.morning
                        })
                      }
                    >
                      Buổi sáng
                    </Checkbox>
                    <Checkbox
                      checked={this.state.afternoon}
                      onChange={() =>
                        this.setState({
                          afternoon: !this.state.afternoon
                        })
                      }
                    >
                      Buổi trưa
                    </Checkbox>
                    <Checkbox
                      checked={this.state.evening}
                      onChange={() =>
                        this.setState({ evening: !this.state.evening })
                      }
                    >
                      Buổi tối
                    </Checkbox>
                  </div>
                )}
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

const UpdateMedicine = Form.create({ name: "update_drugs" })(
  UpdateMedicineWithForm
)

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
)(UpdateMedicine)
