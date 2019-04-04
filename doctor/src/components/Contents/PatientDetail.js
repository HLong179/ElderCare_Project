import React, { Component } from "react"
import data from "../../data"
import { Line } from "react-chartjs-2"
import { Layout, Typography, Row, Col } from "antd"
import "../Home.css"

import patientAvatar from "../../assets/avatar.jpg"

const { Content } = Layout
const { Title } = Typography

class PatientDetail extends Component {
  displayPatientDetails() {
    let newData = data.filter(
      patient => Number(patient.key) === Number(this.props.match.params.id)
    )[0]
    if (newData) {
      return (
        <React.Fragment>
          <Row style={{ fontSize: 16, color: "000" }}>
            <Col span={8}>
              <p>
                <span className="patientDetails-title">Họ và tên:</span>{" "}
                <span>{newData.name}</span>
              </p>
              <p>
                <span className="patientDetails-title">Giới tính:</span>{" "}
                <span>{newData.gender}</span>
              </p>
              <p>
                <span className="patientDetails-title">Tuổi:</span>{" "}
                <span>{newData.age}</span>
              </p>
            </Col>
            <Col span={8}>
              {" "}
              <p>
                <span className="patientDetails-title">Địa chỉ:</span>{" "}
                <span>{newData.address}</span>
              </p>
              <p>
                <span className="patientDetails-title">Số điện thoại:</span>{" "}
                <span>{newData.phone_number}</span>
              </p>
              <p>
                <span className="patientDetails-title">Bệnh lý:</span>{" "}
                <span>{newData.patient_status}</span>
              </p>
            </Col>
            <Col span={8} style={{ display: "flex" }}>
              <img
                src={patientAvatar}
                alt="patient_picture"
                style={{
                  maxWidth: 200,
                  maxHeight: 200,
                  margin: "0 auto",
                  border: "none",
                  borderRadius: 10
                }}
              />
            </Col>
          </Row>
          <div className="list-drug">
            <Title level={3}>Danh sách thuốc</Title>
            <ul>
              <li className="list-drug-item">
                YESOM 40 40mg (Esomeprazol 40mg)
              </li>
              <li className="list-drug-item">
                SUCRATE GEL (Sucralfate 1g (goi))
              </li>
              <li className="list-drug-item">ARTHUR (Trimebutine 200)</li>
              <li className="list-drug-item">PAPAZE</li>
              <li className="list-drug-item">BIOCID MH 3.5+2g</li>
              <li className="list-drug-item">DIGLUMISAN</li>
            </ul>
          </div>
        </React.Fragment>
      )
    }
  }
  render() {
    const chartData = {
      labels: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      datasets: [
        {
          label: "Nhịp tim",
          data: [
            60,
            70,
            64,
            72,
            80,
            100,
            127,
            132,
            88,
            72,
            71,
            78,
            89,
            92,
            95,
            95,
            120,
            118,
            83,
            79,
            75,
            88,
            69,
            74
          ],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(0,0,255, 0.6)"
        }
      ]

      //   backgroundColor: "#007bff"
    }
    const chartOption = {
      responsive: true,
      title: {
        display: true,
        text: "Nhịp tim của bệnh nhân trong ngày",
        fontSize: 20,
        fontColor: "rgba(0,0,0,1)"
      },
      legend: {
        display: false,
        position: "right"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 200
            }
          }
        ]
      }
    }
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <Title level={3} style={{ marginBottom: 20 }}>
            Thông tin chi tiết của bệnh nhân
          </Title>
          {this.displayPatientDetails()}
          <Line data={chartData} options={chartOption} />
        </div>
      </Content>
    )
  }
}

export default PatientDetail
