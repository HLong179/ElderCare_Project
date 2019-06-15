import React, { Component } from "react"
import { Typography, Table, Layout, Divider, Popconfirm, message } from "antd"
import { connect } from "react-redux"
import { fetchRelatives, removeSubUser } from "../../../actions/patientActions"
import AddRelative from "./AddRelative"
import "./style.css"
import UpdateRelative from "./UpdateRelative"

const { Title } = Typography
const { Content } = Layout

class Relatives extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      dataUpdate: null
    }
  }
  componentDidMount() {
    this.props.fetchRelatives({ elderId: this.props.auth.user.elderId })
  }

  deleteSubUser = data => {
    this.props.removeSubUser(data.relativeId)
    message.success("Xóa người thân thành công", 3)
  }

  handleVisible = visible => {
    this.setState({
      visible: visible
    })
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
        key: "address",
        width: 220
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
            <span
              style={{ color: "#108ee9", cursor: "pointer", padding: 10 }}
              onClick={() =>
                this.setState({
                  visible: true,
                  dataUpdate: record
                })
              }
            >
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
        <div style={{ padding: 24, minHeight: 500, backgroundColor: "#fff" }}>
          {this.props.auth.user.permission !== "Main" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 500,
                color: "gray",
                fontSize: 24
              }}
            >
              Không có quyền sử dụng chức năng này
            </div>
          ) : (
            <React.Fragment>
              <div className="top-content">
                <Title level={3}>Danh sách người thân</Title>
                {this.props.listRelatives.length <= 5 ? (
                  <AddRelative ICID={this.props.auth.user.elderId} />
                ) : null}
              </div>
              {this.state.visible && (
                <UpdateRelative
                  relativeData={this.state.dataUpdate}
                  modalVisible={true}
                  handleVisible={this.handleVisible}
                />
              )}
              <Table
                columns={columns}
                dataSource={this.props.listRelatives}
                pagination={false}
                style={{ marginTop: 50, width: "100%" }}
              />
            </React.Fragment>
          )}
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
