import React, { Component } from "react"
import { Layout } from "antd"
import { connect } from "react-redux"
import { fetchPatient } from "../../../actions/patientActions"
import PatientInfo from "./PatientInfo";

const { Content } = Layout

class DashboardContent extends Component {
  componentDidMount() {
    let elderId = this.props.auth.user.elderId
    this.props.fetchPatient(elderId)
  }

  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <PatientInfo />
          {/* <Relatives elderId={this.state.patient.ICID} />
          <ListDrugs elderId={this.state.patient.ICID} />
          <HeartRate />
          <SleepChart /> */}
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
    fetchPatient: elderId => dispatch(fetchPatient(elderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContent)
