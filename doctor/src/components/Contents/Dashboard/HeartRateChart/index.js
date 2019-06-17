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
      loading: true,
      clicked: "month",
      dataChart: {
        labels: [],
        heartRates: []
      }
    }
  }

  componentDidMount = async () => {
    let { labels, heartRates } = this.state
    let data = {
      labels: [],
      heartRates: []
    }

    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth()
    let firstDayOfMonth = new Date(y, m, 1)
    firstDayOfMonth = firstDayOfMonth.getTime(firstDayOfMonth)
    const patientsRef = firebase.database().ref("Patients")
    patientsRef.on("value", async snapshot => {
      let patients = snapshot.val()[this.props.elder.ICID]["HeartRate"]
      for (let patient in patients) {
        let timeLabel = moment(patients[patient]["time"]).format(
          "DD/MM/YYYY HH:mm:ss"
        )
        if (parseInt(patients[patient]["time"], 10) >= firstDayOfMonth) {
          if (!labels.includes(patients[patient]["time"])) {
            labels.push(patients[patient]["time"])
            heartRates.push(patients[patient]["value"])
            data.labels.push(timeLabel)
            data.heartRates.push(patients[patient]["value"])
          }
        }
      }
      this.setState({
        labels,
        heartRates,
        loading: false,
        dataChart: data
      })
    })
  }

  chartFilterDay = () => {
    this.setState(
      {
        clicked: "day"
      },
      () => {
        let startOfDay = moment()

        const data = {
          labels: [],
          heartRates: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          if (parseInt(this.state.labels[i], 10) >= startOfDay) {
            let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
              "DD/MM/YYYY"
            )
            data.labels.push(timeLabel)
            data.heartRates.push(this.state.heartRates[i])
          }
        }
        this.setState({
          dataChart: data
        })
      }
    )
  }

  chartFilterWeek = () => {
    this.setState(
      {
        clicked: "week"
      },
      () => {
        let startOfWeek = moment()
          .startOf("isoweek")
          .toDate()
          .valueOf()
        const data = {
          labels: [],
          heartRates: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          if (parseInt(this.state.labels[i], 10) >= startOfWeek) {
            let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
              "DD/MM/YYYY"
            )
            data.labels.push(timeLabel)
            data.heartRates.push(this.state.heartRates[i])
          }
        }
        this.setState({
          dataChart: data
        })
      }
    )
  }

  chartFilterMonth = () => {
    this.setState(
      {
        clicked: "month"
      },
      () => {
        const data = {
          labels: [],
          heartRates: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "DD/MM/YYYY"
          )
          data.labels.push(timeLabel)
        }
        data.heartRates = [...this.state.heartRates]
        this.setState({
          dataChart: data
        })
      }
    )
  }

  render() {
    const chartData = {
      labels: this.state.dataChart.labels,
      datasets: [
        {
          label: "Nhịp tim",
          data: this.state.dataChart.heartRates,
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
          <React.Fragment>
            <div className="chartButton">
              <span
                className={
                  this.state.clicked === "day"
                    ? "chartButton active"
                    : "chartButton"
                }
                onClick={this.chartFilterDay}
              >
                Ngày
              </span>
              <span
                className={
                  this.state.clicked === "week"
                    ? "chartButton active"
                    : "chartButton"
                }
                onClick={this.chartFilterWeek}
              >
                Tuần
              </span>
              <span
                className={
                  this.state.clicked === "month"
                    ? "chartButton active"
                    : "chartButton"
                }
                onClick={this.chartFilterMonth}
              >
                Tháng
              </span>
            </div>
            <Line data={chartData} options={chartOption} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default HeartRate
