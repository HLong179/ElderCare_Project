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

  componentDidMount = () => {
    let { labels, heartRates } = this.state
    let data = {
      labels: [],
      heartRates: []
    }
    const patientsRef = firebase.database().ref("Patients")
    patientsRef.on("value", snapshot => {
      let patients = snapshot.val()[this.props.elder.ICID]["HeartRate"]
      for (let patient in patients) {
        let timeLabel = moment(patients[patient]["time"]).format(
          "DD/MM/YYYY HH:mm:ss"
        )

        if (!labels.includes(patients[patient]["time"])) {
          labels.push(patients[patient]["time"])
          heartRates.push(patients[patient]["value"])
          data.labels.push(timeLabel)
          data.heartRates.push(patients[patient]["value"])
        }
      }
      this.setState(
        {
          labels,
          heartRates,
          loading: false,
          dataChart: data
        },
        () => this.chartFilterDay()
      )
    })
  }

  chartFilterDay = () => {
    this.setState(
      {
        clicked: "day"
      },
      () => {
        const rate = {}
        const data = {
          labels: [],
          heartRates: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "DD/MM/YYYY"
          )
          if (rate[timeLabel]) {
            rate[timeLabel].push(this.state.heartRates[i])
          } else {
            rate[timeLabel] = [this.state.heartRates[i]]
          }
        }

        for (let y in rate) {
          data.labels.push(y)
          data.heartRates.push(this.averageOfArray(rate[y]))
        }

        this.setState({
          dataChart: data
        })
      }
    )
  }

  averageOfArray = arr => {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += arr[i]
    }
    return (result / arr.length).toFixed(1)
  }

  chartFilterWeek = () => {
    this.setState(
      {
        clicked: "week"
      },
      () => {
        const data = {
          labels: [],
          heartRates: []
        }
        let rate = {}
        let today = moment()
        let startOfWeek = moment(today).startOf("isoWeek")
        let endOfWeek = moment(today).endOf("isoWeek")
        let minTime = Math.min(...this.state.labels)
        today = moment(today).valueOf()
        while (today >= parseInt(minTime, 10) - 24 * 60 * 60 * 1000 * 7) {
          rate[moment(startOfWeek).format("DD/MM/YYYY")] = {
            start: moment(startOfWeek).format("DD/MM/YYYY"),
            end: moment(endOfWeek).format("DD/MM/YYYY"),
            data: []
          }
          today = moment(today).valueOf() - 24 * 60 * 60 * 1000 * 7
          startOfWeek = moment(today).startOf("isoWeek")
          endOfWeek = moment(today).endOf("isoWeek")
        }

        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = this.state.labels[i]
          let timeStart = moment(timeLabel)
            .startOf("isoWeek")
            .format("DD/MM/YYYY")
          if (rate[timeStart]) {
            rate[timeStart].data.push(this.state.heartRates[i])
          }
        }

        for (let y in rate) {
          data.labels.push(y)
          data.heartRates.push(this.averageOfArray(rate[y].data))
        }

        data.labels = data.labels.reverse()
        data.heartRates = data.heartRates.reverse()

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
        let rate = {}
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "MM/YYYY"
          )
          if (rate[timeLabel]) {
            rate[timeLabel].push(this.state.heartRates[i])
          } else {
            rate[timeLabel] = [this.state.heartRates[i]]
          }
        }
        for (let y in rate) {
          data.labels.push(y)
          data.heartRates.push(this.averageOfArray(rate[y]))
        }
        this.setState({
          dataChart: data
        })
      }
    )
  }

  render() {
    const chartData = {
      labels:
        this.state.dataChart.labels.length >= 12
          ? this.state.dataChart.labels.slice(
              this.state.dataChart.labels.length - 12,
              this.state.dataChart.labels.length
            )
          : this.state.dataChart.labels,
      datasets: [
        {
          label: "Nhịp tim",
          data:
            this.state.dataChart.heartRates.length >= 12
              ? this.state.dataChart.heartRates.slice(
                  this.state.dataChart.heartRates.length - 12,
                  this.state.dataChart.heartRates.length
                )
              : this.state.dataChart.heartRates,
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
        // xAxes: [
        //   {
        //     ticks: {
        //       display: false
        //     }
        //   }
        // ],
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
