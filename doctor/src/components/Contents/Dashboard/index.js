import React, { Component } from "react"
import { Layout } from "antd"
import { connect } from "react-redux"
import { fetchPatient } from "../../../actions/patientActions"
import PatientInfo from "./PatientInfo"
import HeartRate from "./HeartRate"
import StepCount from "./StepCount"

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
          {this.props.elder && <HeartRate elder={this.props.elder} />}
          {this.props.elder && <StepCount elder={this.props.elder} />}
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    elder: state.patient.elder
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
