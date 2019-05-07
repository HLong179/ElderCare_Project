import React, { Component } from "react"
import { Line } from "react-chartjs-2"
import { Layout, Typography, Row, Col, Form } from "antd"
import { connect } from "react-redux"

import "../../Home.css"
import PatientInfo from "./PatientInfo"
import Relatives from "./Relatives"

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
    console.log(this.state.patient.ICID)
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <PatientInfo patient={this.state.patient} />
          <Relatives elderId={this.state.patient.ICID} />
          {/* {this.displayPatientDetails()} */}
          <Line data={chartData} options={chartOption} />
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetail)
