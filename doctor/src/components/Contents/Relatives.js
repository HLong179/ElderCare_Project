import React, { Component } from "react"
import {
  Layout,
  Typography,
  Input,
  Button,
  Icon,
  List,
  Avatar,
  Modal,
  Form
} from "antd"
import { Link } from "react-router-dom"
import userAvatar from "../../assets/user.png"
import data from "../../data"

const { Content } = Layout
const { Title } = Typography

// const listData = []
// for (let i = 0; i < 10; i++) {
//   listData.push({
//     href: "http://ant.design",
//     title: `ant design part ${i}`,
//     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
//     description:
//       "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//     content:
//       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
//   })
// }

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// )

const findPatient = value => {
  const res = data.filter(patient => patient.key.toString() === value)[0]
  return res
}

const patientLink = item => (
  <span>
    Người nhà của bệnh nhân{" "}
    <Link to={"patient/" + findPatient(item.patientID).key}>
      {findPatient(item.patientID).name}
    </Link>
  </span>
)

const ListRelatives = ({ listData }) => {
  return (
    <List
      style={{ marginTop: 20 }}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      }}
      dataSource={listData}
      renderItem={item => (
        <List.Item
          key={item.title}
          //   actions={[
          //     <IconText type="star-o" text="156" />,
          //     <IconText type="like-o" text="156" />,
          //     <IconText type="message" text="2" />
          //   ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={userAvatar} />}
            title={item.name}
            description={patientLink(item)}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

class RelativesWithForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      modaVvisible: false,
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
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await this.setState({
          listData: [...this.state.listData, values],
          visible: false
        })
      } else {
        console.log(err)
      }
    })
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!")
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true })
    }
    callback()
  }
  validatePatientID = (rule, value, callback) => {
    const isMatch = data.filter(patient => patient.key.toString() === value)
    if (value && !isMatch[0]) {
      callback("PatientID is not exist!")
    }
    callback()
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
        <Button type="primary" icon="user-add" onClick={this.showModal}>
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
            <Form.Item label="Người nhà bệnh nhân">
              {getFieldDecorator("patientID", {
                rules: [
                  {
                    required: true,
                    message: "Please input your field"
                  },
                  {
                    validator: this.validatePatientID
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tên đăng nhập">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Username!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="Confirm Password">
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Họ và tên">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!"
                  }
                ]
              })(<Input type="text" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator("address", {
                rules: [
                  {
                    required: true,
                    message: "Please input your address!"
                  }
                ]
              })(<Input type="text" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator("phone", {
                rules: [
                  { required: true, message: "Please input your phone number!" }
                ]
              })(<Input addonBefore={"+84"} style={{ width: "100%" }} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
  render() {
    const { listData } = this.state
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <Title level={3} style={{ marginBottom: 20 }}>
            Quản lý người thân
          </Title>
          {this.displayModal()}
          <ListRelatives listData={listData} />
        </div>
      </Content>
    )
  }
}

const Relatives = Form.create({ name: "relatives" })(RelativesWithForm)

export default Relatives
