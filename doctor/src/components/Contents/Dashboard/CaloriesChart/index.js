import React, { Component } from "react"
import { Bar } from "react-chartjs-2"
import * as firebase from "firebase/app"
import "firebase/database"
import { Typography } from "antd"
import moment from "moment"
import Loader from "react-loader-spinner"

const { Title } = Typography

class CaloriesChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      calories: [],
      loading: true,
      maxCount: 5000
    }
  }

  componentDidMount = async () => {
    let { labels, calories } = this.state
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
          labels.push(timeLabel)
          calories.push(patients[patient])
        }
      }
      this.setState(
        {
          labels,
          calories,
          loading: false
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

  render() {
    const chartData = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Calories",
          data: this.state.calories,
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
          <Bar data={chartData} options={chartOption} />
        )}
      </div>
    )
  }
}

export default CaloriesChart
