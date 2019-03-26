import React, { Component } from "react"

import { Layout } from "antd"

const { Content } = Layout

export default class Schedules extends Component {
  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460 }}>Schedules Component</div>
      </Content>
    )
  }
}
