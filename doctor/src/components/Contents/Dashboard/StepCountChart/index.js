import React, { Component } from "react"
import { Bar } from "react-chartjs-2"
import * as firebase from "firebase/app"
import "firebase/database"
import { Typography } from "antd"
import moment from "moment"
import Loader from "react-loader-spinner"

const { Title } = Typography

class StepCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      stepCounts: [],
      loading: true,
      maxCount: 5000,
      dataChart: {
        labels: [],
        stepCounts: []
      },
      clicked: "month"
    }
  }

  componentDidMount = async () => {
    let { labels, stepCounts } = this.state
    let data = {
      labels: [],
      stepCounts: []
    }
    const patientsRef = firebase.database().ref("Patients")
    patientsRef.on("value", async snapshot => {
      let patients = snapshot.val()[this.props.elder.ICID]["StepCounts"]
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth()
      let firstDayOfMonth = new Date(y, m, 1)
      firstDayOfMonth = firstDayOfMonth.getTime(firstDayOfMonth)
      for (let patient in patients) {
        if (parseInt(patient, 10) >= firstDayOfMonth) {
          let timeLabel = moment(parseInt(patient, 10)).format("DD/MM/YYYY")
          labels.push(patient)
          stepCounts.push(patients[patient])
          data.labels.push(timeLabel)
          data.stepCounts.push(patients[patient])
        }
      }
      this.setState(
        {
          labels,
          stepCounts,
          loading: false,
          dataChart: data
        },
        () => {
          let maxCount = Math.max(...stepCounts)
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
          stepCounts: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          if (parseInt(this.state.labels[i], 10) >= startOfWeek) {
            let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
              "DD/MM/YYYY"
            )
            data.labels.push(timeLabel)
            data.calories.push(this.state.stepCounts[i])
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
          stepCounts: []
        }
        for (let i = 0; i < this.state.labels.length; i++) {
          let timeLabel = moment(parseInt(this.state.labels[i], 10)).format(
            "DD/MM/YYYY"
          )
          data.labels.push(timeLabel)
        }
        data.stepCounts = [...this.state.stepCounts]
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
          label: "Bước đi",
          data: this.state.dataChart.stepCounts,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(0,0,255, 0.2)",
          hoverBorderColor: "rgba(0,0,255, 1)",
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
          Theo dõi bước đi
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

export default StepCount
