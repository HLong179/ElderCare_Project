import React, { Component } from "react"
import { Layout } from "antd"
import { connect } from "react-redux"

import "../../Home.css"
import PatientInfo from "./PatientInfo"
import Relatives from "./Relatives"
import ListDrugs from "./ListDrugs"
import HeartRate from "./HeartRate"


const { Content } = Layout

class PatientDetail extends Component {
  state = {
    patient: {}
  }
  componentWillMount() {
    let icid = this.props.match.params.icid
    let result = this.props.listPatients.find(e => e.ICID === icid)
    this.setState({
      patient: Object.assign({}, result)
    })
  }

  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <PatientInfo patient={this.state.patient} />
          <Relatives elderId={this.state.patient.ICID} />
          <ListDrugs elderId={this.state.patient.ICID} />
          <HeartRate />
        </div>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    listPatients: state.patient.listPatients
  }
}

const mapDispatchToProps = dispatch => {
  return {
  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetail)
