import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Layout, Table, Typography, Input, Button, Icon } from "antd"

import AddPatient from "./AddPatient"
import { connect } from "react-redux"
import { fetchPatients } from "../../../actions/patientActions"
import "./style.css"

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
  componentDidMount = () => {
    this.props.fetchPatients({ doctorId: this.props.auth.user.doctorId })
  }

  render() {
    const columns = [
      {
        title: "Họ và tên",
        dataIndex: "name",
        render: (text, record) => (
          <Link to={"patient/" + record.ICID}>{text}</Link>
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
        dataIndex: "ICID"
      },
      {
        title: "Chiều cao",
        dataIndex: "height"
      },

      {
        title: "Cân nặng",
        dataIndex: "weight"
      }
    ]
    let listPatients = this.props.listPatients

    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <div className="top-content">
            <Title level={3}>Danh sách bệnh nhân</Title>
            <AddPatient />
          </div>

          <Table columns={columns} dataSource={listPatients} bordered />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    listPatients: state.patient.listPatients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPatients: doctorId => dispatch(fetchPatients(doctorId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPatients)
