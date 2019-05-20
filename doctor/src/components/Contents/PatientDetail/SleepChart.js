import React, { Component } from "react"
import { Line } from "react-chartjs-2"
import * as firebase from "firebase/app"
import "firebase/database"
import { Typography } from "antd"
import moment from "moment"

const { Title } = Typography

export default class SleepChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      sleepInfo: [],
      timeArr: []
    }
  }

  componentWillMount = async () => {
    const patientsRef = firebase.database().ref("Patients")
    await patientsRef.on("value", async snapshot => {
      let patients = snapshot.val()["184305179"]["Sleep"]
      for (let patient in patients) {
        let startSleep = moment(patients[patient]["startSleep"]).format(
          "DD/MM/YYYY"
        )
        let timeArr = {
          start: moment(patients[patient]["startSleep"]).format("HH:mm"),
          finish: moment(patients[patient]["finishSleep"]).format("HH:mm")
        }
        let totalTimeSleep =
          Number(patients[patient]["finishSleep"]) -
          Number(patients[patient]["startSleep"])
        await this.setState({
          labels: [...this.state.labels, startSleep],
          sleepInfo: [...this.state.sleepInfo, totalTimeSleep / (3600 * 1000)],
          timeArr: [...this.state.timeArr, timeArr]
        })
      }
    })
  }

  render() {
    const chartData = {
      labels:
        this.state.labels.length >= 15
          ? this.state.labels.slice(
              this.state.labels.length - 15,
              this.state.labels.length
            )
          : this.state.labels,
      datasets: [
        {
          label: "Số giờ ngủ",
          data:
            this.state.sleepInfo.length > 15
              ? this.state.sleepInfo.slice(
                  this.state.sleepInfo.length - 15,
                  this.state.sleepInfo.length
                )
              : this.state.sleepInfo,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(0,0,255, 0.6)"
        }
      ]

      //   backgroundColor: "#007bff"
    }
    const { timeArr } = this.state
    const chartOption = {
      tooltips: {
        enabled: true,
        callbacks: {
          title: function(tooltipItems) {
            let index = tooltipItems[0].index
            return "Giờ ngủ: " + timeArr[index].start
          },
          afterTitle: function(tooltipItems) {
            let index = tooltipItems[0].index
            return "Giờ thức dậy: " + timeArr[index].finish
          },
          label: function(tooltipItems, data) {
            return "Số giờ ngủ: " + tooltipItems.yLabel
          }
        }
      },
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
              max: 14
            }
          }
        ]
      }
    }
    return (
      <div>
        <Title level={3} style={{ marginTop: 50 }}>
          Thông tin giấc ngủ
        </Title>
        <Line data={chartData} options={chartOption} />
      </div>
    )
  }
}
