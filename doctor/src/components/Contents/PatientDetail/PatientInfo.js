import React from "react"
import { Row, Col, Typography } from "antd"

const { Title } = Typography

const PatientInfo = patient => {
  return (
    <Row style={{ fontSize: 16, color: "000" }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Thông tin chi tiết của bệnh nhân
      </Title>
      <Col span={8}>
        <p>
          <span className="patientDetails-title">Họ và tên:</span>{" "}
          <span>{patient.patient.name}</span>
        </p>
        <p>
          <span className="patientDetails-title">Giới tính:</span>{" "}
          <span>{patient.patient.gender}</span>
        </p>
        <p>
          <span className="patientDetails-title">Tuổi:</span>{" "}
          <span>{patient.patient.age}</span>
        </p>
      </Col>
      <Col span={8}>
        {" "}
        <p>
          <span className="patientDetails-title">Số CMND:</span>{" "}
          <span>{patient.patient.ICID}</span>
        </p>
        <p>
          <span className="patientDetails-title">Cân nặng:</span>{" "}
          <span>{patient.patient.weight}</span>
        </p>
        <p>
          <span className="patientDetails-title">Chiều cao:</span>{" "}
          <span>{patient.patient.height}</span>
        </p>
      </Col>
      <Col span={8} style={{ display: "flex" }}>
        {/* <img
        src={patientAvatar}
        alt="patient_picture"
        style={{
          maxWidth: 200,
          maxHeight: 200,
          margin: "0 auto",
          border: "none",
          borderRadius: 10
        }}
      /> */}
      </Col>
    </Row>
  )
}

export default PatientInfo
