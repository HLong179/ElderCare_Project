import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Layout,
  Input,
  Icon,
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Typography
} from "antd"
import doctorAvatar from "../../assets/avatar-doctor.png"

const { Header } = Layout
const { Title } = Typography
const Search = Input.Search

const notify = (
  <Menu style={{ marginTop: "24px" }}>
    <Menu.Item
      key="0"
      style={{
        borderBottom: "1px solid #e8e8e8",
        maxWidth: "400px",
        marginTop: "10px"
      }}
    >
      <div className="clearfix">
        <Avatar
          size={40}
          icon="heart"
          style={{
            color: "#fff",
            backgroundColor: "tomato",
            float: "left",
            marginRight: "10px",
            clear: "left"
          }}
        />
        <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
          Nhịp tim của bệnh nhân
          <span style={{ color: "#1890ff", fontWeight: 500 }}>
            {" "}
            Trần Văn A
          </span>{" "}
          đang tăng cao <span style={{ color: "tomato" }}>122 bpm</span>
        </p>
        <p
          style={{
            color: "#bfbfbf",
            fontStyle: "italic",
            fontSize: "12px",
            marginLeft: "50px",
            marginTop: "5px",
            marginBottom: 0
          }}
        >
          15 phút trước
        </p>
      </div>
    </Menu.Item>
    <Menu.Item
      key="1"
      style={{
        borderBottom: "1px solid #e8e8e8",
        maxWidth: "400px",
        marginTop: "10px"
      }}
    >
      <div className="clearfix">
        <Avatar
          size={40}
          icon="heart"
          style={{
            color: "#fff",
            backgroundColor: "tomato",
            float: "left",
            marginRight: "10px",
            clear: "left"
          }}
        />
        <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
          Nhịp tim của bệnh nhân
          <span style={{ color: "#1890ff", fontWeight: 500 }}>
            {" "}
            Trần Văn A
          </span>{" "}
          đang tăng cao <span style={{ color: "tomato" }}>122 bpm</span>
        </p>
        <p
          style={{
            color: "#bfbfbf",
            fontStyle: "italic",
            fontSize: "12px",
            marginLeft: "50px",
            marginTop: "5px",
            marginBottom: 0
          }}
        >
          15 phút trước
        </p>
      </div>
    </Menu.Item>
    <Menu.Item
      key="2"
      style={{
        borderBottom: "1px solid #e8e8e8",
        maxWidth: "400px",
        marginTop: "10px"
      }}
    >
      <div className="clearfix">
        <Avatar
          size={40}
          icon="heart"
          style={{
            color: "#fff",
            backgroundColor: "tomato",
            float: "left",
            marginRight: "10px",
            clear: "left"
          }}
        />
        <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
          Nhịp tim của bệnh nhân
          <span style={{ color: "#1890ff", fontWeight: 500 }}>
            {" "}
            Trần Văn A
          </span>{" "}
          đang tăng cao <span style={{ color: "tomato" }}>122 bpm</span>
        </p>
        <p
          style={{
            color: "#bfbfbf",
            fontStyle: "italic",
            fontSize: "12px",
            marginLeft: "50px",
            marginTop: "5px",
            marginBottom: 0
          }}
        >
          15 phút trước
        </p>
      </div>
    </Menu.Item>
  </Menu>
)
const userMenu = (
  <Menu style={{ marginTop: "24px" }}>
    <Menu.Item key="0">
      <Link to="/login">
        <Icon type="user" />
        <span style={{ marginLeft: "10px" }}>Thông tin cá nhân</span>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/login">
        <Icon type="logout" />
        <span style={{ marginLeft: "10px" }}>Đăng xuất</span>
      </Link>
    </Menu.Item>
  </Menu>
)

class AHeader extends Component {
  render() {
    return (
      <Header style={{ background: "#fff", padding: 0, position: "relative" }}>
        <div
          className="header-left"
          style={{
            float: "left",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            marginLeft: "20px"
          }}
        />
        <div
          className="header-right"
          style={{ float: "right", marginRight: "20px" }}
        >
          <Search
            placeholder="Tìm kiếm..."
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <Dropdown overlay={notify}>
            <Badge dot>
              <Icon
                type="notification"
                style={{ marginLeft: "50px", cursor: "pointer" }}
              />
            </Badge>
          </Dropdown>
          <Dropdown overlay={userMenu} className="user-avatar">
            <span>
              <Avatar size="large" src={doctorAvatar} />
              <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                N.V. Hùng
              </span>
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default AHeader
