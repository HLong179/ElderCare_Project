import React, { Component } from "react"
import AddDrugs from "./AddDrugs"
import { Typography } from "antd"

const { Title } = Typography

class ListDrugs extends Component {
  render() {
    return (
      <div>
        <Title level={3} style={{ marginBottom: 20, marginTop: 30 }}>
          Đơn thuốc
        </Title>
        <AddDrugs elderId={this.props.elderId}/>
      </div>
    )
  }
}

export default ListDrugs
