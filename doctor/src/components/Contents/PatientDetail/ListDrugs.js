import React, { Component } from "react"
import { connect } from "react-redux"
import AddDrugs from "./AddDrugs"
import { Typography } from "antd"
import { fetchPrescription } from "../../../actions/patientActions"
import "./style.css"
import UpdatePresciption from "./UpdatePresciption"
import Notify from "./Notify"

const { Title } = Typography

class ListDrugs extends Component {
  componentDidMount() {
    this.props.fetchPrescription({ elderId: this.props.elderId })
  }

  render() {
    return (
      <div>
        <div className="top-content" style={{ marginTop: 50 }}>
          <Title level={3}>Đơn thuốc</Title>
          <div className="prescription-button">
            {Object.keys(this.props.prescription).length === 0 ? (
              <AddDrugs elderId={this.props.elderId} />
            ) : (
              <UpdatePresciption
                presciption={this.props.prescription}
                elderId={this.props.elderId}
              />
            )}
            <Notify elderId={this.props.elderId} />
          </div>
        </div>

        {Object.keys(this.props.prescription).length !== 0 ? (
          <div className="prescription">
            <img src={this.props.prescription.imageUrl} alt="presciption" />
            <div className="drugNote">
              <p style={{ fontWeight: 600, fontSize: 20 }}>Ghi chú:</p>
              <p style={{ fontSize: 18 }}>{this.props.prescription.script}</p>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    prescription: state.patient.prescription
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPrescription: elderId => dispatch(fetchPrescription(elderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDrugs)
