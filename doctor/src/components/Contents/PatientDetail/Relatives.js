import React, { Component } from "react"
import { Typography, Table } from "antd"
import { connect } from "react-redux"
import { fetchRelatives } from "../../../actions/patientActions"
import AddRelative from "./AddRelative"
import "./style.css"

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
    key: "phone",
    dataIndex: "phone"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Username",
    dataIndex: "rlUsername",
    key: "rlUsername"
  }
]
class Relatives extends Component {
  componentWillMount() {
    this.props.fetchRelatives({ elderId: this.props.elderId })
  }

  render() {
    return (
      <div>
        <div className="top-content" style={{marginTop: 50}}>
          <Title level={3}>Danh sách người thân</Title>
          {!this.props.listRelatives[0] ? (
            <AddRelative ICID={this.props.elderId} />
          ) : null}
        </div>

        <Table
          columns={columns}
          dataSource={this.props.listRelatives}
          pagination={false}
          style={{ marginTop: 20 }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listRelatives: state.patient.listRelatives
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRelatives: elderId => dispatch(fetchRelatives(elderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Relatives)
