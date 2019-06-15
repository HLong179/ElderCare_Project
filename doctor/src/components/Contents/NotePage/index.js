import React, { Component } from "react"
import { Typography, Table, Layout, Divider, Popconfirm } from "antd"
import { connect } from "react-redux"
import ListNote from "./ListNote";

const { Title } = Typography
const { Content } = Layout

class NotePage extends Component {
  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <div className="top-content">
            <Title level={3}>Quản lý ghi chú</Title>
            {/* {this.props.listRelatives.length <= 5 ? (
              <AddRelative ICID={this.props.auth.user.elderId} />
            ) : null} */}
          </div>
          <ListNote />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchRelatives: elderId => dispatch(fetchRelatives(elderId)),
    // removeSubUser: relativeId => dispatch(removeSubUser(relativeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotePage)
