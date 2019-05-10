import React, { Component } from "react"
import { Layout, Table, Divider, Button, Typography } from "antd"

import { connect } from "react-redux"
import { fetchDoctors } from "../../actions/adminActions"

const { Content } = Layout
const { Title } = Typography

const columns = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Số ĐT",
    dataIndex: "phone",
    key: "phone"
  },
  {
    title: "Chuyên khoa",
    dataIndex: "specializeIn",
    key: "specializeIn"
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "Thao tác",
    key: "action",
    render: () => (
      <span>
        <Button type="primary" icon="edit">
          Sửa
        </Button>
        <Divider type="vertical" />
        <Button type="danger" icon="delete">
          Xóa
        </Button>
      </span>
    )
  }
]

class ListDoctor extends Component {
  componentDidMount() {
    this.props.fetchDoctors()
  }
  render() {
    let listDoctors = this.props.listDoctors.map((doctor, index) => {
      return {
        ...doctor,
        key: index
      }
    })
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <Title level={3} style={{ marginBottom: 20 }}>
            Danh sách bác sĩ
          </Title>
          <Table columns={columns} dataSource={listDoctors} bordered />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    listDoctors: state.admin.listDoctors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctors: () => dispatch(fetchDoctors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDoctor)
