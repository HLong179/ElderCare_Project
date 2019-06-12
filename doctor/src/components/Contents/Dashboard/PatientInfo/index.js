import React from "react"
import { Row, Col, Typography } from "antd"
import { connect } from "react-redux"

const { Title } = Typography

const PatientInfo = props => {
  const patient = props.elder
  return (
    <Row style={{ fontSize: 16, color: "000" }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Thông tin chi tiết
      </Title>
      {patient && (
        <div style={{marginTop: 30}}>
          <Col span={8}>
            <p>
              <span className="patientDetails-title">Họ và tên:</span>{" "}
              <span>{patient.name}</span>
            </p>
            <p>
              <span className="patientDetails-title">Giới tính:</span>{" "}
              <span>{patient.gender}</span>
            </p>
            <p>
              <span className="patientDetails-title">Tuổi:</span>{" "}
              <span>{patient.age}</span>
            </p>
          </Col>
          <Col span={8}>
            {" "}
            <p>
              <span className="patientDetails-title">Số CMND:</span>{" "}
              <span>{patient.ICID}</span>
            </p>
            <p>
              <span className="patientDetails-title">Cân nặng:</span>{" "}
              <span>{patient.weight} kg</span>
            </p>
          </Col>
          <Col span={8} style={{ display: "flex" }} />
        </div>
      )}
    </Row>
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
)(PatientInfo)
