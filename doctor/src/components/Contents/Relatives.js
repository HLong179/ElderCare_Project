import React, { Component } from "react"
import {
  Layout,
  Typography,
  Input,
  Button,
  List,
  Avatar,
  Modal,
  Form
} from "antd"
import { Link } from "react-router-dom"
import axios from "axios"
import userAvatar from "../../assets/user.png"
import data from "../../data"

const { Content } = Layout
const { Title } = Typography

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
        <List.Item key={item.title}>
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
        const data = {
          elder_id: values.patientID,
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          username: values.username,
          password: values.password
        }
        try {
          let options = {
            method: "post",
            baseURL: "http://localhost:3001",
            url: "/account/addMainUser",
            data: data
          }
          console.log("> call API options: ", options)
          let res = await axios(options)
          if (res.status === 200 && res.statusText === "OK") {
            return res.data
          }
        } catch (e) {
          console.log("Call API error: ", e.message)
          return null
        }
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
              {getFieldDecorator("patientID", {})(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {})(<Input />)}
            </Form.Item>
            <Form.Item label="Tên đăng nhập">
              {getFieldDecorator("username", {})(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("password", {})(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="Confirm Password">
              {getFieldDecorator("confirm", {})(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Họ và tên">
              {getFieldDecorator("name", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
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
