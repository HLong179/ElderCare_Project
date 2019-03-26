import React, { Component } from "react"
import { Layout } from "antd"

const { Footer } = Layout

class AFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        ElderlyCare ©2019 Created by HCMUS
      </Footer>
    )
  }
}

export default AFooter
