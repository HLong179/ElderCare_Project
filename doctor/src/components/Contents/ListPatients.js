import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Layout, Table, Typography, Input, Button, Icon } from "antd"

import data from "../../data"

const { Content } = Layout
const { Title } = Typography

class ListPatients extends Component {
  state = {
    searchText: ""
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
        title: "Địa chỉ",
        dataIndex: "address"
      },
      {
        title: "Số ĐT",
        dataIndex: "phone_number"
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
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </Content>
    )
  }
}

export default ListPatients
