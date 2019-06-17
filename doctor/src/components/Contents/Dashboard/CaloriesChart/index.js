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
      clicked: "month"
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
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth()
      let firstDayOfMonth = new Date(y, m, 1)
      firstDayOfMonth = firstDayOfMonth.getTime(firstDayOfMonth)
      for (let patient in patients) {
        if (parseInt(patient, 10) >= firstDayOfMonth) {
          let timeLabel = moment(parseInt(patient, 10)).format("DD/MM/YYYY")
          labels.push(patient)
          calories.push(patients[patient])
          data.labels.push(timeLabel)
          data.calories.push(patients[patient])
        }
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
          this.setState({
            maxCount
          })
        }
      )
    })
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
          calories: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          if (parseInt(this.state.labels[i], 10) >= startOfWeek) {
            let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
              "DD/MM/YYYY"
            )
            data.labels.push(timeLabel)
            data.calories.push(this.state.calories[i])
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
          calories: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "DD/MM/YYYY"
          )
          data.labels.push(timeLabel)
        }
        data.calories = [...this.state.calories]
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
          label: "Calories",
          data: this.state.dataChart.calories,
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
