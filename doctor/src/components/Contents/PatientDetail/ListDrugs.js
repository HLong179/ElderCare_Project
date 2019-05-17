import React, { Component } from "react"
import { connect } from "react-redux"
import AddDrugs from "./AddDrugs"
import { Typography } from "antd"
import {
  fetchPrescription
} from "../../../actions/patientActions"
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
            <AddDrugs elderId={this.props.elderId} />
            <Notify elderId={this.props.elderId} />
          </div>
        </div>

        {this.props.listPrescription.map((prescription, index) => {
          return (
            <div className="prescription" key={index}>
              <div className="drug-image-block">
                <img src={prescription.imageUrl} alt="presciption" />
              </div>
              <div className="drugNote">
                <p style={{ fontWeight: 600, fontSize: 20 }}>Ghi chú:</p>
                <p style={{ fontSize: 18 }}>{prescription.script}</p>
                <UpdatePresciption
                  presciption={prescription}
                  elderId={this.props.elderId}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    listPrescription: state.patient.listPrescription
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPrescription: elderId => dispatch(fetchPrescription(elderId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDrugs)
