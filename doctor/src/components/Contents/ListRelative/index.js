import React, { Component } from "react"
import { Typography, Table, Layout, Divider, Popconfirm } from "antd"
import { connect } from "react-redux"
import { fetchRelatives, removeSubUser } from "../../../actions/patientActions"
import AddRelative from "./AddRelative"
import "./style.css"

const { Title } = Typography
const { Content } = Layout

class Relatives extends Component {
  componentDidMount() {
    this.props.fetchRelatives({ elderId: this.props.auth.user.elderId })
  }

  deleteSubUser = data => {
    this.props.removeSubUser(data.relativeId)
  }

  render() {
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
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Username",
        dataIndex: "rlUsername",
        key: "rlUsername"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <span style={{ color: "#108ee9", cursor: "pointer", padding: 10 }}>
              Sửa
            </span>
            <Divider type="vertical" />
            <Popconfirm
              title="Xóa người thân này ?"
              onConfirm={() => this.deleteSubUser(record)}
              okText="Yes"
              cancelText="No"
            >
              {" "}
              <span style={{ color: "red", cursor: "pointer", padding: 10 }}>
                Xóa
              </span>
            </Popconfirm>
          </span>
        )
      }
    ]
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <div className="top-content">
            <Title level={3}>Danh sách người thân</Title>
            {this.props.listRelatives.length <= 5 ? (
              <AddRelative ICID={this.props.auth.user.elderId} />
            ) : null}
          </div>

          <Table
            columns={columns}
            dataSource={this.props.listRelatives}
            pagination={false}
            style={{ marginTop: 50 }}
          />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    listRelatives: state.patient.listRelatives
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRelatives: elderId => dispatch(fetchRelatives(elderId)),
    removeSubUser: relativeId => dispatch(removeSubUser(relativeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Relatives)
