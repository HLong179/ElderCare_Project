import React, { Component } from "react"
import { Line } from "react-chartjs-2"
import * as firebase from "firebase/app"
import "firebase/database"
import { Typography } from "antd"
import moment from "moment"

const { Title } = Typography

export default class HeartRate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      heartRates: []
    }
  }

  componentWillMount = async () => {
    const patientsRef = firebase.database().ref("Patients")
    await patientsRef.on("value", async snapshot => {
      let patients = snapshot.val()["184305179"]["HeartRate"]
      for (let patient in patients) {
        let timeLabel = moment(patients[patient]["time"]).format(
          "DD/MM/YYYY HH:mm:ss"
        )
        await this.setState({
          labels: [...this.state.labels, timeLabel],
          heartRates: [...this.state.heartRates, patients[patient]["value"]]
        })
      }
    })
  }

  render() {
    const chartData = {
      labels:
        this.state.labels.length >=15
          ? this.state.labels.slice(
              this.state.labels.length - 15,
              this.state.labels.length
            )
          : this.state.labels,
      datasets: [
        {
          label: "Nhịp tim",
          data:
            this.state.heartRates.length > 15
              ? this.state.heartRates.slice(
                  this.state.heartRates.length - 15,
                  this.state.heartRates.length
                )
              : this.state.heartRates,
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
        textAlign: "left",
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
      <div>
        <Title level={3} style={{ marginTop: 50 }}>
          Nhịp tim của bệnh nhân
        </Title>
        <Line data={chartData} options={chartOption} />
      </div>
    )
  }
}
