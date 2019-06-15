import React, { Component } from "react"
import { Line } from "react-chartjs-2"
import * as firebase from "firebase/app"
import "firebase/database"
import { Typography } from "antd"
import moment from "moment"
import Loader from "react-loader-spinner"

const { Title } = Typography

class HeartRate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      heartRates: [],
      loading: true
    }
  }

  componentDidMount = async () => {
    let { labels, heartRates } = this.state
    const patientsRef = firebase.database().ref("Patients")
    patientsRef.on("value", async snapshot => {
      let patients = snapshot.val()[this.props.elder.ICID]["HeartRate"]
      for (let patient in patients) {
        let timeLabel = moment(patients[patient]["time"]).format(
          "DD/MM/YYYY HH:mm:ss"
        )
        if (!labels.includes(timeLabel)) {
          labels.push(timeLabel)
          heartRates.push(patients[patient]["value"])
        }
      }
      this.setState({
        labels,
        heartRates,
        loading: false
      })
    })
  }

  render() {
    const chartData = {
      labels:
        this.state.labels.length >= 20
          ? this.state.labels.slice(
              this.state.labels.length - 20,
              this.state.labels.length
            )
          : this.state.labels,
      datasets: [
        {
          label: "Nhịp tim",
          data:
            this.state.heartRates.length > 20
              ? this.state.heartRates.slice(
                  this.state.heartRates.length - 20,
                  this.state.heartRates.length
                )
              : this.state.heartRates,
          backgroundColor: "rgba(255, 99, 132, 0.3)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 5
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
        xAxes: [
          {
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 160
            }
          }
        ]
      }
    }
    return (
      <div>
        <Title level={3} style={{ marginTop: 40 }}>
          Theo dõi nhịp tim
        </Title>
        {this.state.loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200
            }}
          >
            <Loader type="ThreeDots" color="#00BFFF" height="50" width="50" />
          </div>
        ) : (
          <Line data={chartData} options={chartOption} />
        )}
      </div>
    )
  }
}

export default HeartRate
