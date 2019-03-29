import React, { Component } from "react"

import { Layout, Typography } from "antd"

const { Content } = Layout
const { Title } = Typography

export default class Schedules extends Component {
  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <Title level={3}>Lịch khám bệnh</Title>
        </div>
      </Content>
    )
  }
}
