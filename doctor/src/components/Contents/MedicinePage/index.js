import React, { Component } from "react"
import { connect } from "react-redux"
import { Typography, Layout } from "antd"
import ListMedicines from "./ListMedicines"

const { Title } = Typography
const { Content } = Layout

const MedicinePage = props => {
  return (
    <Content style={{ margin: "16px 16px" }}>
      <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
        <Title level={3} style={{ marginBottom: 20 }}>
          Quản lý thuốc
        </Title>
        {props.elder && <ListMedicines elder={props.elder} />}
      </div>
    </Content>
  )
}

const mapStateToProps = state => {
  return {
    elder: state.patient.elder
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicinePage)
