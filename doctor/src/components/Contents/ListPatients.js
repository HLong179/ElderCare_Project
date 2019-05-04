import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import {
  Layout,
  Table,
  Typography,
  Input,
  Button,
  Icon,
  Modal,
  Form,
  Select
} from "antd"

import data from "../../data"

const { Content } = Layout
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

class ListPatientsWithForm extends Component {
  state = {
    searchText: "",
    modaVvisible: false
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    }
  })
  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: "" })
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
        console.log("Received values of form: ", values)
      }
    })
    this.props.form.resetFields()
    this.setState({
      visible: false
    })
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
              {getFieldDecorator("age", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Giới tính">
              {getFieldDecorator("gender", { initialValue: "nam" })(
                <Select>
                  <Option value="nam">Nam</Option>
                  <Option value="nu">Nữ</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Số CMND">
              {getFieldDecorator("cmnd", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator("address", {})(
                <Input type="text" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item label="Tình trạng bệnh lý">
              {getFieldDecorator("patient_status", {})(
                <TextArea
                  placeholder="Tình trạng bệnh của bệnh nhân"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }
  render() {
    const columns = [
      {
        title: "Họ và tên",
        dataIndex: "name",
        render: (text, record) => (
          <Link to={"patient/" + record.key}>{text}</Link>
        ),
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Tuổi",
        dataIndex: "age"
      },
      {
        title: "Giới tính",
        dataIndex: "gender"
      },
      {
        title: "CMND",
        dataIndex: "key"
      },
      {
        title: "Số ĐT",
        dataIndex: "phone_number"
      },
      {
        title: "Địa chỉ",
        dataIndex: "address"
      },

      {
        title: "Tình trạng bệnh lý",
        dataIndex: "patient_status"
      }
    ]
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <Title level={3} style={{ marginBottom: 20 }}>
            Danh sách bệnh nhân
          </Title>
          {this.displayModalAddPatient()}
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </Content>
    )
  }
}

const ListPatients = Form.create({ name: "list_patients" })(
  ListPatientsWithForm
)

export default ListPatients
