import React from "React"
import { View, StyleSheet, TouchableHighlight } from "react-native"
import CommonButton from "../../components/CommonButton"
import firebase from "react-native-firebase"
import { Icon, Button, Text, Spinner } from "native-base"
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
  VictoryTheme
} from "victory-native"
import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../settings"
import call from "react-native-phone-call"

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  btn: {
    borderRadius: 5,
    padding: 10
  },
  btnActive: {
    backgroundColor: "#f0ad4e"
  },
  text: {
    marginTop: 20
  },
  textStyle: {
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "gray"
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  }
})
class HeartRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drPhoneNo: "",
      heartData: [],
      displayHeartData: null,
      loading: false,
      selected: null
    }
  }
  componentDidMount = async () => {
    let dataCur = await AsyncStorage.getItem("curUser")
    let jsonData = JSON.parse(dataCur)
    this.setState({
      loading: true
    })
    fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/getDoctorPhoneNum`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: jsonData.elderId
      })
    }).then(async response => {
      response = await response.json()
      this.setState({ drPhoneNo: response.doctorPhoneNum })
    })

    const patientsRef = firebase
      .database()
      .ref("Patients")
      .on("value", async snapshot => {
        let dataset = []
        let patients = await snapshot.val()[jsonData.elderId].HeartRate
        for (let patient in patients) {
          let heartRateValue = patients[patient]["value"]
          let timeLabel = new Date(+patients[patient]["time"])
          dataset.push({ x: timeLabel, y: heartRateValue })
        }
        this.setState({
          displayHeartData: dataset,
          heartData: dataset,
          loading: false
        })
      })
  }
  pressDayBtn = () => {
    this.setState(
      {
        selected: "day"
      },
      () => {
        let newHeartData = []
        let today = new Date()
        var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        for (let row in this.state.heartData) {
          if (this.state.heartData[row].x >= yesterday)
            newHeartData.push(this.state.heartData[row])
        }
        if (newHeartData.length === 0) {
          alert("Không tìm thấy dữ liệu phù hợp")
        } else this.setState({ displayHeartData: newHeartData })
      }
    )
  }
  pressWeekBtn = () => {
    this.setState(
      {
        selected: "week"
      },
      () => {
        let newHeartData = []
        let today = new Date()
        var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        for (let row in this.state.heartData) {
          if (this.state.heartData[row].x >= lastWeek)
            newHeartData.push(this.state.heartData[row])
        }
        if (newHeartData.length === 0) {
          alert("Không tìm thấy dữ liệu phù hợp")
        } else this.setState({ displayHeartData: newHeartData })
      }
    )
  }
  pressMonthBtn = () => {
    this.setState(
      {
        selected: "month"
      },
      () => {
        let newHeartData = []
        let today = new Date()
        var lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        for (let row in this.state.heartData) {
          if (this.state.heartData[row].x >= lastMonth)
            newHeartData.push(this.state.heartData[row])
        }
        if (newHeartData.length === 0) {
          alert("Không tìm thấy dữ liệu phù hợp")
        } else this.setState({ displayHeartData: newHeartData })
      }
    )
  }
  callDoctor = () => {
    const args = {
      number: this.state.drPhoneNo, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(args).catch(console.error)
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.textStyle}>
          <Spinner color="blue" />
        </View>
      )
    }
    return (
      <View>
        <View style={styles.container}>
          <TouchableHighlight style={styles.btn} underlayColor="#fefefe">
            <CommonButton
              style={this.state.selected === "day" ? styles.btnActive : null}
              onPress={this.pressDayBtn}
              title="Ngày"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn} underlayColor="#fefefe">
            <CommonButton
              style={this.state.selected === "week" ? styles.btnActive : null}
              onPress={this.pressWeekBtn}
              title="Tuần"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn} underlayColor="#fefefe">
            <CommonButton
              style={this.state.selected === "month" ? styles.btnActive : null}
              onPress={this.pressMonthBtn}
              title="Tháng"
            />
          </TouchableHighlight>
        </View>
        <VictoryChart
          theme={VictoryTheme.material}
          width={380}
          height={300}
          scale={{ x: "time" }}
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={this.state.displayHeartData}
          />
          <VictoryAxis
            label="Thời gian"
            style={{
              axisLabel: { padding: 35 },
              tickLabels: { padding: 10, angle: -45 }
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Nhịp tim (BPM)"
            style={{ axisLabel: { angle: -90, padding: -20 } }}
          />
          <VictoryScatter
            data={this.state.displayHeartData}
            size={2}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
        <Text>{"\n"}</Text>
        <TouchableHighlight style={styles.btn} underlayColor="#fefefe">
          <Button iconLeft block warning onPress={this.callDoctor}>
            <Icon name="call" />
            <Text>Gọi bác sĩ</Text>
          </Button>
        </TouchableHighlight>
      </View>
    )
  }
}

export default HeartRate
