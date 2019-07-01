import React, { Component } from "react"
import { Bar } from "react-chartjs-2"
import * as firebase from "firebase/app"
import "firebase/database"
import { Typography } from "antd"
import moment from "moment"
import Loader from "react-loader-spinner"
import "./style.css"

const { Title } = Typography

class CaloriesChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      calories: [],
      loading: true,
      maxCount: 5000,
      dataChart: {
        labels: [],
        calories: []
      },
      clicked: "day"
    }
  }

  componentDidMount = async () => {
    let { labels, calories } = this.state
    let data = {
      labels: [],
      calories: []
    }
    const patientsRef = firebase.database().ref("Patients")
    patientsRef.on("value", async snapshot => {
      let patients = snapshot.val()[this.props.elder.ICID]["Calories"]
      for (let patient in patients) {
        let timeLabel = moment(parseInt(patient, 10)).format("DD/MM/YYYY")
        labels.push(patient)
        calories.push(patients[patient])
        data.labels.push(timeLabel)
        data.calories.push(patients[patient])
      }
      this.setState(
        {
          labels,
          calories,
          loading: false,
          dataChart: data
        },
        () => {
          let maxCount = Math.max(...calories)
          this.setState(
            {
              maxCount
            },
            () => this.chartFilterDay()
          )
        }
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
          calories: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "DD/MM/YYYY"
          )
          if (rate[timeLabel]) {
            rate[timeLabel].push(this.state.calories[i])
          } else {
            rate[timeLabel] = [this.state.calories[i]]
          }
        }

        for (let y in rate) {
          data.labels.push(y)
          data.calories.push(this.averageOfArray(rate[y]))
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
        const data = {
          labels: [],
          calories: []
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
          let timeStart = moment(parseInt(timeLabel, 10))
            .startOf("isoWeek")
            .format("DD/MM/YYYY")
          if (rate[timeStart]) {
            rate[timeStart].data.push(this.state.calories[i])
          }
        }

        for (let y in rate) {
          if (!rate[y].data[0]) {
            rate[y].data.push(0)
          }
          data.labels.push(y)
          data.calories.push(this.averageOfArray(rate[y].data))
        }

        data.labels = data.labels.reverse()
        data.calories = data.calories.reverse()

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
          calories: []
        }
        let rate = {}
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "MM/YYYY"
          )
          if (rate[timeLabel]) {
            rate[timeLabel].push(this.state.calories[i])
          } else {
            rate[timeLabel] = [this.state.calories[i]]
          }
        }
        for (let y in rate) {
          data.labels.push(y)
          data.calories.push(this.averageOfArray(rate[y]))
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
          label: "Calories",
          data:
            this.state.dataChart.calories.length >= 12
              ? this.state.dataChart.calories.slice(
                  this.state.dataChart.calories.length - 12,
                  this.state.dataChart.calories.length
                )
              : this.state.dataChart.calories,
          backgroundColor: "rgba(255,206,86, 0.7)",
          borderColor: "rgba(255,206,86, 0.1)",
          hoverBorderColor: "orange",
          borderWidth: 2
        }
      ]
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
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: this.state.maxCount
            }
          }
        ]
      }
    }
    return (
      <div>
        <Title level={3} style={{ marginTop: 40 }}>
          Theo dõi Calories
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
            <Bar data={chartData} options={chartOption} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default CaloriesChart
